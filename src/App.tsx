import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { NotesView } from './components/notes/NotesView';
import { LearnHub } from './components/studio/LearnHub';
import { ReelStudio } from './components/studio/ReelStudio';
import { MemeStudio } from './components/studio/MemeStudio';
import { QuizStudio } from './components/studio/QuizStudio';
import { ProgressHub } from './components/progress/ProgressHub';
import { UploadModal } from './components/upload/UploadModal';
import { AiTutorModal } from './components/tutor/AiTutorModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { WelcomeGateway } from './components/welcome/WelcomeGateway';

import { 
  DocumentNote, 
  GeneratedContent, 
  UserLearningProgress, 
  AgentTraceStep, 
  QuizAttempt,
  AppSettings,
  NavTab,
  UserProfile,
  MemeCard
} from './types';
import { SAMPLE_DOCUMENTS } from './services/pdfService';
import { storageService } from './services/storageService';
import { runMultiAgentPipeline } from './services/agentPipeline';

export function App() {
  // User Profile & Onboarding
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => storageService.getUserProfile());
  const [isWelcomeGatewayOpen, setIsWelcomeGatewayOpen] = useState<boolean>(() => !storageService.getUserProfile());

  // Persistence state
  const [documents, setDocuments] = useState<DocumentNote[]>([]);
  const [currentDoc, setCurrentDoc] = useState<DocumentNote | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [progress, setProgress] = useState<UserLearningProgress>(storageService.getProgress());
  const [settings, setSettings] = useState<AppSettings>(storageService.getSettings());

  // Casual Vibe & Theme Mode: 'neon' | 'bubblegum' | 'cyber' | 'daylight'
  const [currentVibe, setCurrentVibe] = useState<'neon' | 'bubblegum' | 'cyber' | 'daylight'>(() => {
    return (localStorage.getItem('studybuddy_vibe') as any) || 'neon';
  });

  useEffect(() => {
    document.body.className = currentVibe === 'daylight' ? 'vibe-daylight' : '';
    localStorage.setItem('studybuddy_vibe', currentVibe);
  }, [currentVibe]);

  // UI Navigation & Modals
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [learnSubMode, setLearnSubMode] = useState<'reel' | 'meme' | 'simple'>('reel');
  const [quizTopicTarget, setQuizTopicTarget] = useState<string>('all');
  const [selectedTopicTarget, setSelectedTopicTarget] = useState<string>('all');
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Pipeline runtime state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressLabel, setProgressLabel] = useState('');
  const [activeTraceSteps, setActiveTraceSteps] = useState<AgentTraceStep[]>([]);

  // Initialize Documents on mount
  useEffect(() => {
    const savedDocs = storageService.getDocuments();
    let initialDocs = savedDocs;
    if (savedDocs.length === 0) {
      initialDocs = SAMPLE_DOCUMENTS;
      storageService.saveDocuments(SAMPLE_DOCUMENTS);
    }
    setDocuments(initialDocs);

    const firstDoc = initialDocs[0];
    if (firstDoc) {
      handleSelectDocument(firstDoc);
    }
  }, []);

  // Select active document & load or run pipeline
  const handleSelectDocument = async (doc: DocumentNote) => {
    setCurrentDoc(doc);
    const cachedContent = storageService.getGeneratedContent(doc.id);

    if (cachedContent) {
      setContent(cachedContent);
      setProgressPercent(100);
      setProgressLabel('All 4 agents verified & ready.');
    } else {
      await triggerAgentPipeline(doc);
    }
  };

  // Run the 4-agent multi-agent pipeline
  const triggerAgentPipeline = async (doc: DocumentNote) => {
    setIsProcessing(true);
    setProgressPercent(10);
    setProgressLabel('Agent 1: Extracting real topics & page citations...');
    setActiveTraceSteps([]);

    try {
      const generated = await runMultiAgentPipeline(
        doc,
        settings.geminiApiKey,
        {
          onStepChange: (step) => {
            setActiveTraceSteps((prev) => {
              const existingIdx = prev.findIndex((s) => s.id === step.id);
              if (existingIdx >= 0) {
                const updated = [...prev];
                updated[existingIdx] = step;
                return updated;
              }
              return [...prev, step];
            });
          },
          onProgress: (percent, label) => {
            setProgressPercent(percent);
            setProgressLabel(label);
          },
        }
      );

      setContent(generated);
      storageService.saveGeneratedContent(generated);
    } catch (err: any) {
      console.error('Multi-Agent pipeline execution error:', err);
      setProgressLabel(`Pipeline note: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle new document uploaded
  const handleDocumentReady = async (newDoc: DocumentNote) => {
    storageService.saveDocument(newDoc);
    setDocuments((prev) => [newDoc, ...prev.filter((d) => d.id !== newDoc.id)]);
    setCurrentDoc(newDoc);
    setActiveTab('notes');
    await triggerAgentPipeline(newDoc);
  };

  // Handle quick load sample
  const handleLoadSample = (sampleId: string) => {
    const sample = SAMPLE_DOCUMENTS.find((d) => d.id === sampleId);
    if (sample) {
      handleSelectDocument(sample);
      setActiveTab('notes');
    }
  };

  // Navigation router helper
  const handleNavigateTab = (tab: NavTab, subMode?: 'reel' | 'meme' | 'simple') => {
    setActiveTab(tab);
    if (subMode) {
      setLearnSubMode(subMode);
    }
  };

  const handleNavigateTopic = (topicId: string, tab: NavTab) => {
    setSelectedTopicTarget(topicId);
    if (tab === 'quiz') {
      setQuizTopicTarget(topicId);
    }
    setActiveTab(tab);
  };

  // Quick launch quiz on a specific topic
  const handleStartTopicQuiz = (topicId: string, topicName: string) => {
    setQuizTopicTarget(topicId);
    setActiveTab('quiz');
  };

  // Learning Progress Handlers
  const handleCompleteLesson = (lessonId: string) => {
    const updated = storageService.markLessonComplete(lessonId, 3);
    setProgress({ ...updated });
  };

  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    const updated = storageService.recordQuizAttempt(attempt);
    setProgress({ ...updated });
  };

  const handleMarkMastered = (topicId: string) => {
    const updated = storageService.markTopicMastered(topicId);
    setProgress({ ...updated });
  };

  const handleBookmarkReel = (reelId: string) => {
    storageService.toggleBookmarkReel(reelId);
    setProgress(storageService.getProgress());
  };

  const handleSaveMeme = (memeId: string) => {
    storageService.toggleSaveMeme(memeId);
    setProgress(storageService.getProgress());
  };

  const handleUpdateMemes = (updatedMemes: MemeCard[]) => {
    if (content) {
      const nextContent = { ...content, memes: updatedMemes };
      setContent(nextContent);
      if (currentDoc) {
        storageService.saveGeneratedContent(nextContent);
      }
    }
  };

  const handleSaveSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    storageService.saveSettings(newSettings);
  };

  const handleResetProgress = () => {
    storageService.resetLearningMemory();
    setProgress(storageService.getProgress());
  };

  const handleWelcomeComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    storageService.saveUserProfile(profile);
    setIsWelcomeGatewayOpen(false);
  };

  return (
    <div className={`min-h-screen ${currentVibe === 'daylight' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0A0E1A] text-slate-100'} flex flex-col font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300`}>
      
      {/* 1. Full-screen Welcome Gateway (First Impression) */}
      {isWelcomeGatewayOpen && (
        <WelcomeGateway onComplete={handleWelcomeComplete} />
      )}

      {/* Top Header with Casual Vibe Switcher */}
      <Header
        currentDoc={currentDoc}
        documents={documents}
        progress={progress}
        userProfile={userProfile}
        currentVibe={currentVibe}
        onSelectVibe={setCurrentVibe}
        onSelectDoc={handleSelectDocument}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onEditProfile={() => setIsWelcomeGatewayOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
        
        {/* Simple, Clean Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentDoc={currentDoc}
          documentsCount={documents.length}
          weakTopicsCount={progress.weakTopicIds.length}
        />

        {/* Content Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto">
          {activeTab === 'home' && (
            <DashboardView
              currentDoc={currentDoc}
              documents={documents}
              content={content}
              progress={progress}
              userProfile={userProfile}
              onOpenUpload={() => setIsUploadOpen(true)}
              onSelectDoc={handleSelectDocument}
              onNavigateTab={handleNavigateTab}
              onLoadSample={handleLoadSample}
            />
          )}

          {activeTab === 'notes' && (
            <NotesView
              currentDoc={currentDoc}
              documents={documents}
              content={content}
              onSelectDoc={handleSelectDocument}
              onOpenUpload={() => setIsUploadOpen(true)}
              onStartTopicQuiz={handleStartTopicQuiz}
              onNavigateTab={handleNavigateTab}
              onNavigateTopic={handleNavigateTopic}
            />
          )}

          {/* First-class Reel Mode Navigation */}
          {activeTab === 'reel' && (
            <ReelStudio
              reels={content?.reels || []}
              topics={content?.topics || []}
              progress={progress}
              initialTopicId={selectedTopicTarget}
              onBookmark={handleBookmarkReel}
              onMarkMastered={handleMarkMastered}
              onCompleteLesson={handleCompleteLesson}
            />
          )}

          {/* First-class Meme Mode Navigation */}
          {activeTab === 'meme' && (
            <MemeStudio
              memes={content?.memes || []}
              topics={content?.topics || []}
              progress={progress}
              documentId={currentDoc?.id}
              initialTopicId={selectedTopicTarget}
              onSaveMeme={handleSaveMeme}
              onCompleteLesson={handleCompleteLesson}
              onUpdateMemes={handleUpdateMemes}
            />
          )}

          {/* Learn Hub (Multi-mode switcher) */}
          {activeTab === 'learn' && (
            <LearnHub
              currentDoc={currentDoc}
              content={content}
              progress={progress}
              activeSubMode={learnSubMode}
              onSubModeChange={setLearnSubMode}
              onNavigateQuiz={() => setActiveTab('quiz')}
              onBookmarkReel={handleBookmarkReel}
              onSaveMeme={handleSaveMeme}
              onMarkMastered={handleMarkMastered}
              onCompleteLesson={handleCompleteLesson}
              onUpdateMemes={handleUpdateMemes}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizStudio
              document={currentDoc}
              topics={content?.topics || []}
              progress={progress}
              apiKey={settings.geminiApiKey}
              initialTopicId={quizTopicTarget}
              onRecordQuizAttempt={handleRecordQuizAttempt}
              onNavigateRevision={() => setActiveTab('progress')}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
          )}

          {activeTab === 'progress' && (
            <ProgressHub
              currentDoc={currentDoc}
              content={content}
              progress={progress}
              onStartTopicQuiz={handleStartTopicQuiz}
              onMarkTopicMastered={handleMarkMastered}
            />
          )}
        </main>

      </div>

      {/* Upload Notes Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentReady={handleDocumentReady}
      />

      {/* AI Tutor ("Ask Your Notes") Modal */}
      <AiTutorModal
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        currentDoc={currentDoc}
        apiKey={settings.geminiApiKey}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={handleSaveSettings}
        onResetProgress={handleResetProgress}
      />

    </div>
  );
}

export default App;
