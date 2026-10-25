// =========================================================================
// StudyBuddy AI — Personalized Learning Memory & Storage Service
// =========================================================================

import { 
  DocumentNote, 
  GeneratedContent, 
  UserLearningProgress, 
  QuizAttempt, 
  AppSettings,
  TopicConcept,
  UserProfile,
  MemeCard
} from '../types';
import { resolveTopicMedia } from './mediaService';
import { memeArtService } from './memeArtService';

const STORAGE_KEYS = {
  DOCUMENTS: 'studybuddy_documents_v1',
  CONTENT_CACHE: 'studybuddy_content_cache_v1',
  PROGRESS: 'studybuddy_user_progress_v1',
  SETTINGS: 'studybuddy_settings_v1',
  PROFILE: 'studybuddy_user_profile_v1',
  MEME_CACHE: 'studybuddy_meme_images_v1',
};

const DEFAULT_SETTINGS: AppSettings = {
  geminiApiKey: '',
  youtubeApiKey: '',
  openaiApiKey: '',
  model: 'gemini-1.5-flash',
  useLocalFallback: true,
  speechVoiceRate: 1.0,
};

const INITIAL_PROGRESS: UserLearningProgress = {
  completedLessonIds: [],
  quizAttempts: [],
  masteredTopicIds: [],
  weakTopicIds: [],
  studyStreakDays: 3,
  totalStudyMinutes: 42,
  lastStudiedAt: new Date().toISOString(),
  savedMemes: [],
  bookmarkedReels: [],
};

export const storageService = {
  // --- Documents Management ---
  getDocuments(): DocumentNote[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read documents from storage:', e);
      return [];
    }
  },

  saveDocuments(docs: DocumentNote[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
    } catch (e) {
      console.error('Failed to save documents to storage:', e);
    }
  },

  saveDocument(doc: DocumentNote) {
    const docs = this.getDocuments();
    const existingIndex = docs.findIndex(d => d.id === doc.id);
    if (existingIndex >= 0) {
      docs[existingIndex] = doc;
    } else {
      docs.unshift(doc);
    }
    this.saveDocuments(docs);
  },

  deleteDocument(docId: string) {
    const docs = this.getDocuments().filter(d => d.id !== docId);
    this.saveDocuments(docs);
    this.deleteGeneratedContent(docId);
  },

  // --- Generated Content Cache ---
  getGeneratedContent(docId: string): GeneratedContent | null {
    try {
      const raw = localStorage.getItem(`${STORAGE_KEYS.CONTENT_CACHE}_${docId}`);
      if (!raw) return null;
      const parsed: GeneratedContent = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.reels)) {
        let hasHealedReels = false;
        parsed.reels = parsed.reels.map(reel => {
          const lowerName = (reel.topicName || '').toLowerCase();
          const isOsiTopic = lowerName.includes('osi') || lowerName.includes('7 layer');
          const isMisassignedOsiVideo = reel.media?.type === 'video' && reel.media.youtubeId === 'vv4y_uOneC0' && !isOsiTopic;

          if (!reel.media || !reel.cardType || isMisassignedOsiVideo) {
            hasHealedReels = true;
            const matchingTopic = parsed.topics?.find(t => t.id === reel.topicId) || {
              id: reel.topicId,
              name: reel.topicName,
              pageReference: reel.pageReference,
              importance: 'medium' as const,
              definition: reel.coreIdea,
              keyPoints: reel.bulletPoints,
              examples: []
            };
            const resolved = resolveTopicMedia(matchingTopic);

            if (reel.cardType === 'educational-video' || isMisassignedOsiVideo) {
              if (resolved.educationalVideo) {
                return {
                  ...reel,
                  cardType: 'educational-video' as const,
                  media: resolved.educationalVideo,
                };
              } else {
                return {
                  ...reel,
                  cardType: 'concept-image' as const,
                  media: resolved.visualImage,
                };
              }
            }

            return {
              ...reel,
              cardType: reel.cardType || 'concept-image',
              media: reel.media || resolved.visualImage
            };
          }
          return reel;
        });

        if (hasHealedReels) {
          this.saveGeneratedContent(parsed);
        }
      }

      // Sanitize memes: automatically purge any stale rate-limited pollinations URLs
      if (parsed && Array.isArray(parsed.memes)) {
        let hasPollinations = false;
        parsed.memes = parsed.memes.map(meme => {
          if (!meme.imageUrl || meme.imageUrl.includes('pollinations.ai')) {
            hasPollinations = true;
            return {
              ...meme,
              imageUrl: memeArtService.generateMemeSvgDataUri(meme)
            };
          }
          return meme;
        });
        if (hasPollinations) {
          this.saveGeneratedContent(parsed);
        }
      }

      return parsed;
    } catch (e) {
      return null;
    }
  },

  saveGeneratedContent(content: GeneratedContent) {
    try {
      localStorage.setItem(`${STORAGE_KEYS.CONTENT_CACHE}_${content.documentId}`, JSON.stringify(content));
    } catch (e) {
      console.error('Failed to cache generated content:', e);
    }
  },

  deleteGeneratedContent(docId: string) {
    localStorage.removeItem(`${STORAGE_KEYS.CONTENT_CACHE}_${docId}`);
  },

  // --- Meme Persistent Image Cache & Dynamic Meme Store ---
  getMemeImageCache(): Record<string, string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.MEME_CACHE);
      if (!raw) return {};
      const cache: Record<string, string> = JSON.parse(raw);
      // Clean out any rate-limited pollinations URLs
      const cleaned: Record<string, string> = {};
      let changed = false;
      for (const [k, v] of Object.entries(cache)) {
        if (typeof v === 'string' && !v.includes('pollinations.ai')) {
          cleaned[k] = v;
        } else {
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem(STORAGE_KEYS.MEME_CACHE, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch (e) {
      return {};
    }
  },

  saveMemeImage(memeId: string, imageUrl: string) {
    if (imageUrl.includes('pollinations.ai')) return; // Never cache rate-limited pollinations URLs
    try {
      const cache = this.getMemeImageCache();
      cache[memeId] = imageUrl;
      localStorage.setItem(STORAGE_KEYS.MEME_CACHE, JSON.stringify(cache));
    } catch (e) {
      console.error('Failed to save meme image cache:', e);
    }
  },

  purgePollinationsCache(docId?: string) {
    try {
      this.getMemeImageCache(); // Triggers auto-cleaning of MEME_CACHE
      if (docId) {
        this.getGeneratedContent(docId); // Triggers auto-cleaning of doc memes
      }
    } catch (e) {
      console.warn('Cache purge note:', e);
    }
  },

  saveMemeImageCache(cache: Record<string, string>) {
    try {
      localStorage.setItem(STORAGE_KEYS.MEME_CACHE, JSON.stringify(cache));
    } catch (e) {
      console.error('Failed to save meme image cache:', e);
    }
  },

  appendMemeToDocument(docId: string, meme: MemeCard) {
    const content = this.getGeneratedContent(docId);
    if (!content) return;
    if (!content.memes) content.memes = [];
    const exists = content.memes.some(m => m.id === meme.id);
    if (!exists) {
      content.memes.unshift(meme);
      this.saveGeneratedContent(content);
    }
  },

  updateDocumentMemes(docId: string, memes: MemeCard[]) {
    const content = this.getGeneratedContent(docId);
    if (!content) return;
    content.memes = memes;
    this.saveGeneratedContent(content);
  },

  // --- Student Learning Progress & Memory ---
  getProgress(): UserLearningProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return data ? { ...INITIAL_PROGRESS, ...JSON.parse(data) } : INITIAL_PROGRESS;
    } catch (e) {
      return INITIAL_PROGRESS;
    }
  },

  saveProgress(progress: UserLearningProgress) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save user progress:', e);
    }
  },

  markLessonComplete(lessonId: string, minutesSpent: number = 3) {
    const progress = this.getProgress();
    if (!progress.completedLessonIds.includes(lessonId)) {
      progress.completedLessonIds.push(lessonId);
    }
    progress.totalStudyMinutes += minutesSpent;
    progress.lastStudiedAt = new Date().toISOString();
    this.saveProgress(progress);
    return progress;
  },

  recordQuizAttempt(attempt: QuizAttempt) {
    const progress = this.getProgress();
    progress.quizAttempts.unshift(attempt);
    progress.lastStudiedAt = new Date().toISOString();
    progress.totalStudyMinutes += Math.max(2, Math.round(attempt.totalQuestions * 1.2));

    // Update weak and mastered topics based on actual quiz outcome
    attempt.mistakes.forEach(mistake => {
      if (!progress.weakTopicIds.includes(mistake.topicId)) {
        progress.weakTopicIds.push(mistake.topicId);
      }
      // If was previously mastered, remove from mastered until re-tested
      progress.masteredTopicIds = progress.masteredTopicIds.filter(id => id !== mistake.topicId);
    });

    if (attempt.scorePercent >= 80 && attempt.mistakes.length === 0) {
      // Find topics tested that passed cleanly
      // Handled in caller or by topic tagging
    }

    this.saveProgress(progress);
    return progress;
  },

  markTopicMastered(topicId: string) {
    const progress = this.getProgress();
    if (!progress.masteredTopicIds.includes(topicId)) {
      progress.masteredTopicIds.push(topicId);
    }
    progress.weakTopicIds = progress.weakTopicIds.filter(id => id !== topicId);
    this.saveProgress(progress);
    return progress;
  },

  markTopicWeak(topicId: string) {
    const progress = this.getProgress();
    if (!progress.weakTopicIds.includes(topicId)) {
      progress.weakTopicIds.push(topicId);
    }
    progress.masteredTopicIds = progress.masteredTopicIds.filter(id => id !== topicId);
    this.saveProgress(progress);
    return progress;
  },

  toggleSaveMeme(memeId: string): boolean {
    const progress = this.getProgress();
    const idx = progress.savedMemes.indexOf(memeId);
    let isSaved = false;
    if (idx >= 0) {
      progress.savedMemes.splice(idx, 1);
    } else {
      progress.savedMemes.push(memeId);
      isSaved = true;
    }
    this.saveProgress(progress);
    return isSaved;
  },

  toggleBookmarkReel(reelId: string): boolean {
    const progress = this.getProgress();
    const idx = progress.bookmarkedReels.indexOf(reelId);
    let isBookmarked = false;
    if (idx >= 0) {
      progress.bookmarkedReels.splice(idx, 1);
    } else {
      progress.bookmarkedReels.push(reelId);
      isBookmarked = true;
    }
    this.saveProgress(progress);
    return isBookmarked;
  },

  // --- App Settings ---
  getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  // Reset entire learning memory
  resetLearningMemory() {
    this.saveProgress(INITIAL_PROGRESS);
  },

  // --- User Profile & Personalization ---
  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to read user profile:', e);
      return null;
    }
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile:', e);
    }
  },

  clearUserProfile(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } catch (e) {
      console.error('Failed to clear user profile:', e);
    }
  }
};
