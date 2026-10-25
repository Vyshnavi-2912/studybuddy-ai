import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  Play, 
  Image as ImageIcon, 
  Video, 
  Layers, 
  ExternalLink, 
  Filter, 
  RefreshCw, 
  Clock, 
  Tv, 
  ListVideo,
  Download,
  Maximize2,
  X,
  Workflow,
  BookOpen
} from 'lucide-react';
import { ReelCard, TopicConcept, UserLearningProgress, EducationalVideo, TopicBlockDiagram } from '../../types';
import { apiService } from '../../services/apiService';
import { diagramService } from '../../services/diagramService';

interface ReelStudioProps {
  reels: ReelCard[];
  topics?: TopicConcept[];
  progress: UserLearningProgress;
  initialTopicId?: string;
  onBookmark: (reelId: string) => void;
  onMarkMastered: (topicId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
}

export const ReelStudio: React.FC<ReelStudioProps> = ({
  reels,
  topics = [],
  progress,
  initialTopicId,
  onBookmark,
  onMarkMastered,
  onCompleteLesson,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || 'all');
  const [activeViewTab, setActiveViewTab] = useState<'visual' | 'diagram' | 'videos'>('visual');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync initial topic selection when navigating from NotesView or other tabs
  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
      setCurrentIndex(0);
    }
  }, [initialTopicId]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState<{ [id: string]: boolean }>({});
  const [videoPlaybackError, setVideoPlaybackError] = useState<{ [id: string]: boolean }>({});
  const [isDiagramModalOpen, setIsDiagramModalOpen] = useState(false);

  // Dynamic topic-specific videos state
  const [topicVideosMap, setTopicVideosMap] = useState<{ [topicKey: string]: EducationalVideo[] }>({});
  const [loadingVideosMap, setLoadingVideosMap] = useState<{ [topicKey: string]: boolean }>({});
  const [activeVideoMap, setActiveVideoMap] = useState<{ [topicKey: string]: EducationalVideo | null }>({});

  // Filter reels based on selected topic
  const filteredReels = reels.filter(r => {
    return selectedTopicId === 'all' || r.topicId === selectedTopicId;
  });

  const currentReel = filteredReels[currentIndex] || filteredReels[0] || reels[0];
  const isBookmarked = currentReel ? progress.bookmarkedReels.includes(currentReel.id) : false;
  const isMastered = currentReel ? progress.masteredTopicIds.includes(currentReel.topicId) : false;

  // Active topic object: prioritize selected topic if filtered, otherwise current reel's topic
  const activeTopic = useMemo(() => {
    return (selectedTopicId !== 'all' ? topics.find(t => t.id === selectedTopicId) : null)
      || topics.find(t => t.id === currentReel?.topicId)
      || topics[0]
      || {
        id: currentReel?.topicId || 't1',
        name: currentReel?.topicName || 'Core Concept',
        pageReference: currentReel?.pageReference || 1,
        importance: 'high',
        definition: currentReel?.coreIdea || 'Fundamental principle extracted from study notes.',
        keyPoints: currentReel?.bulletPoints || ['Core mechanism', 'Key rule', 'Applied outcome'],
        examples: []
      };
  }, [selectedTopicId, currentReel?.topicId, topics]);

  const activeTopicKey = activeTopic.name;

  // Block Diagram strictly matching active topic
  const [currentDiagram, setCurrentDiagram] = useState<TopicBlockDiagram>(() => 
    diagramService.generateBlockDiagram(activeTopic)
  );

  // Update block diagram whenever active topic changes
  useEffect(() => {
    setCurrentDiagram(diagramService.generateBlockDiagram(activeTopic));
  }, [activeTopic]);

  // Fetch real educational videos when active topic changes
  useEffect(() => {
    if (!activeTopicKey) return;

    if (!topicVideosMap[activeTopicKey]) {
      fetchVideosForTopic(activeTopicKey);
    }
  }, [activeTopicKey]);

  const fetchVideosForTopic = async (topicName: string) => {
    setLoadingVideosMap(prev => ({ ...prev, [topicName]: true }));
    try {
      const videos = await apiService.searchVideos(topicName);
      setTopicVideosMap(prev => ({ ...prev, [topicName]: videos }));
      if (videos.length > 0) {
        setActiveVideoMap(prev => ({ ...prev, [topicName]: videos[0] }));
        setVideoPlaybackError(prev => ({ ...prev, [videos[0].youtubeId]: false }));
      } else {
        setActiveVideoMap(prev => ({ ...prev, [topicName]: null }));
      }
    } catch (err) {
      console.error(`Failed to fetch videos for ${topicName}:`, err);
    } finally {
      setLoadingVideosMap(prev => ({ ...prev, [topicName]: false }));
    }
  };

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window) || !currentReel) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${currentReel.topicName}. ${currentReel.hook}. Core concept: ${currentReel.coreIdea}. Key takeaways: ${currentReel.bulletPoints.join('. ')}. Analogy: ${currentReel.realWorldAnalogy}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleNext = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    if (currentReel) {
      onCompleteLesson(currentReel.id);
    }
    if (currentIndex < filteredReels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShare = () => {
    if (!currentReel) return;
    navigator.clipboard.writeText(`${currentReel.topicName} — StudyBuddy AI: ${currentReel.quickTakeaway}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDiagramSvg = () => {
    if (!currentDiagram.svgMarkup) return;
    const blob = new Blob([currentDiagram.svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StudyBuddy-Diagram-${activeTopic.name.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!reels || reels.length === 0) {
    return (
      <div className="clean-card p-12 text-center max-w-lg mx-auto space-y-3">
        <Sparkles className="w-10 h-10 mx-auto text-turquoise-400" />
        <h3 className="text-base font-bold text-ivory-50">No Reel Lessons Available</h3>
        <p className="text-xs text-ivory-200/70">
          Upload or select a study document to generate topic-matched visual cards, accurate block diagrams, and educational videos.
        </p>
      </div>
    );
  }

  // Active topic's video playlist
  const topicVideos = topicVideosMap[activeTopicKey] || [];
  const isTopicVideosLoading = loadingVideosMap[activeTopicKey] ?? false;
  const isTopicMatchingReel = currentReel?.topicName?.toLowerCase() === activeTopicKey.toLowerCase();
  const currentActiveVideo = activeVideoMap[activeTopicKey] ?? (
    topicVideos.length > 0
      ? topicVideos[0]
      : (isTopicMatchingReel && currentReel?.media?.type === 'video' && currentReel.media.youtubeId ? {
          youtubeId: currentReel.media.youtubeId,
          title: currentReel.media.title || currentReel.topicName,
          channelTitle: currentReel.media.channelTitle || 'Educational Reference',
          duration: currentReel.media.duration || 'Short',
          thumbnailUrl: currentReel.media.thumbnailUrl || `https://img.youtube.com/vi/${currentReel.media.youtubeId}/hqdefault.jpg`,
          embedUrl: currentReel.media.url || `https://www.youtube-nocookie.com/embed/${currentReel.media.youtubeId}?rel=0`,
          caption: currentReel.media.caption
        } : null)
  );

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in duration-300">
      
      {/* 1. TOPIC SELECTOR BAR (Extracted from Uploaded PDF) */}
      {topics.length > 0 && (
        <div className="clean-card p-3 space-y-2 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-ivory-50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-turquoise-400" />
              <span>Extracted Topics ({topics.length})</span>
            </span>
            <span className="text-[11px] text-champagne-300/80">
              Select topic to explore diagrams & videos
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => {
                setSelectedTopicId('all');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopicId === 'all'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold shadow-glow-turquoise'
                  : 'bg-slate-900/60 text-ivory-200/70 hover:text-white hover:bg-slate-800 border border-white/[0.05]'
              }`}
            >
              All Topics ({topics.length})
            </button>

            {topics.map((t) => {
              const isSelected = selectedTopicId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTopicId(t.id);
                    setCurrentIndex(0);
                    fetchVideosForTopic(t.name);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold border-turquoise-400 shadow-glow-turquoise'
                      : 'bg-slate-900/60 text-ivory-200/80 hover:text-white hover:bg-slate-800 border-white/[0.05]'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-slate-900 text-turquoise-300' : 'bg-slate-800 text-ivory-200/50'
                  }`}>
                    p.{t.pageReference}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. THREE DEDICATED LEARNING TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 clean-card p-3 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 text-xs">
          {/* Tab 1: Learn Visually */}
          <button
            onClick={() => setActiveViewTab('visual')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeViewTab === 'visual'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold shadow-glow-turquoise'
                : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Learn Visually</span>
          </button>

          {/* Tab 2: Block Diagram (Accurate Flow) */}
          <button
            onClick={() => setActiveViewTab('diagram')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeViewTab === 'diagram'
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-glow-gold'
                : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            <span>Block Diagram ✨</span>
          </button>

          {/* Tab 3: Watch Educational Videos */}
          <button
            onClick={() => setActiveViewTab('videos')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all ${
              activeViewTab === 'videos'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold shadow-glow-turquoise'
                : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Watch Videos ({topicVideos.length})</span>
          </button>
        </div>

        {/* Counter and Mini-Progress */}
        <div className="flex items-center gap-2 text-xs text-ivory-200/60">
          <span>Concept {currentIndex + 1} of {filteredReels.length || 1}</span>
          <div className="flex items-center gap-1">
            {filteredReels.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-5 bg-turquoise-400'
                    : 'w-1.5 bg-slate-800'
                }`}
                title={`Jump to concept ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN REEL CARD CONTAINER */}
      {currentReel && (
        <div className="clean-card p-5 sm:p-7 space-y-5 border border-turquoise-500/25 shadow-glow-purple bg-[#0F172A]/90 backdrop-blur-xl">
          
          {/* Card Top Action Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-turquoise-500/15 text-turquoise-300 border border-turquoise-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-champagne-400" />
                <span>{activeTopic.name}</span>
              </span>

              <span className="text-[10px] font-mono text-champagne-300/80 px-2 py-0.5 rounded bg-slate-900 border border-white/[0.05]">
                Page {currentReel.pageReference} Citation
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Audio Read Aloud */}
              <button
                onClick={toggleSpeech}
                className={`p-2 rounded-xl transition-all ${
                  isPlayingAudio
                    ? 'bg-turquoise-500 text-white font-bold shadow-glow-turquoise'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-ivory-200 border border-white/[0.06]'
                }`}
                title={isPlayingAudio ? 'Stop Speech' : 'Listen with Audio Narration'}
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Bookmark */}
              <button
                onClick={() => onBookmark(currentReel.id)}
                className={`p-2 rounded-xl transition-all ${
                  isBookmarked
                    ? 'bg-champagne-400/25 text-champagne-300 border border-champagne-400/40'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-ivory-200 border border-white/[0.06]'
                }`}
                title="Save Bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-champagne-400 text-champagne-400' : ''}`} />
              </button>

              {/* Share takeaway */}
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 text-ivory-200 border border-white/[0.06] transition-colors"
                title="Copy Takeaway"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MAIN DYNAMIC CONTENT CONTAINER ACCORDING TO ACTIVE VIEW TAB */}
          
          {/* TAB 1: LEARN VISUALLY (Concept Image / Vector Architecture) */}
          {activeViewTab === 'visual' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="rounded-2xl overflow-hidden bg-[#0B0F19] border border-turquoise-500/20 relative">
                <div className="relative w-full min-h-[220px] max-h-[340px] flex items-center justify-center p-3 bg-[#0B0F19]">
                  {currentDiagram?.svgMarkup ? (
                    <div 
                      className="w-full max-h-[320px] flex items-center justify-center overflow-hidden rounded-lg"
                      dangerouslySetInnerHTML={{ __html: currentDiagram.svgMarkup }}
                    />
                  ) : currentReel.media?.diagramSvg ? (
                    <div 
                      className="w-full max-h-[320px] flex items-center justify-center overflow-hidden rounded-lg"
                      dangerouslySetInnerHTML={{ __html: currentReel.media.diagramSvg }}
                    />
                  ) : currentReel.media?.url && !imageError[currentReel.id] ? (
                    <img
                      src={currentReel.media.url}
                      alt={currentReel.media.altText || currentReel.topicName}
                      className="max-h-[320px] w-full object-cover rounded-xl"
                      onError={() => setImageError(prev => ({ ...prev, [currentReel.id]: true }))}
                    />
                  ) : (
                    <div className="p-8 text-center text-xs text-ivory-200/70 space-y-2">
                      <Layers className="w-8 h-8 mx-auto text-turquoise-400 opacity-70" />
                      <p className="font-semibold text-ivory-50">{currentReel.topicName}</p>
                      <p className="text-[11px]">Structured concept from Page {currentReel.pageReference}</p>
                    </div>
                  )}
                </div>

                {/* Caption Strip */}
                {currentReel.media?.caption && (
                  <div className="p-2.5 bg-[#0F172A]/90 border-t border-turquoise-500/15 flex items-center justify-between text-[11px] text-ivory-200/70">
                    <span className="truncate pr-2 italic">"{currentReel.media.caption}"</span>
                    <span className="shrink-0 text-[10px] text-champagne-300">
                      {currentReel.media.sourceCredit || 'Verified Grounding'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ACCURATE BLOCK DIAGRAM (Essential Feature) */}
          {activeViewTab === 'diagram' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="rounded-2xl overflow-hidden bg-[#0B0F19] border-2 border-turquoise-500/30 p-4 space-y-3 relative shadow-2xl">
                
                {/* Diagram Action Bar */}
                <div className="flex items-center justify-between border-b border-turquoise-500/15 pb-2 text-xs">
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-brand-gradient text-sm">
                      {currentDiagram.title}
                    </h3>
                    <p className="text-[11px] text-ivory-200/70">
                      {currentDiagram.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Zoom / Enlarge Modal */}
                    <button
                      onClick={() => setIsDiagramModalOpen(true)}
                      className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-emerald-800 text-turquoise-300 border border-turquoise-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Enlarge diagram"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enlarge</span>
                    </button>

                    {/* Download SVG */}
                    <button
                      onClick={handleDownloadDiagramSvg}
                      className="p-1.5 rounded-lg bg-champagne-500/20 hover:bg-champagne-500/30 text-champagne-300 border border-champagne-400/30 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Download Vector Diagram"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download SVG</span>
                    </button>
                  </div>
                </div>

                {/* Vector SVG Render */}
                <div 
                  className="w-full flex items-center justify-center overflow-x-auto py-2"
                  dangerouslySetInnerHTML={{ __html: currentDiagram.svgMarkup || '' }}
                />

                {/* Key Flow Blocks Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06] text-left">
                  {currentDiagram.blocks.map((b, i) => (
                    <div key={b.id} className="p-2.5 rounded-xl bg-slate-900/60 border border-turquoise-500/15 space-y-1">
                      <span className="text-[10px] font-bold text-turquoise-400 uppercase tracking-wider block">
                        Step {i + 1}
                      </span>
                      <p className="font-extrabold text-xs text-ivory-50 leading-tight">
                        {b.label.replace(/^\d+\.\s*/, '')}
                      </p>
                      <p className="text-[10px] text-champagne-300/80">
                        {b.subtitle}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: WATCH EDUCATIONAL VIDEOS (Topic-Matched Real Videos) */}
          {activeViewTab === 'videos' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="rounded-2xl overflow-hidden bg-[#0B0F19] border border-turquoise-500/25 space-y-3">
                
                {/* Embedded Video Player (No autoplay sound) */}
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                  {isTopicVideosLoading ? (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-8 h-8 mx-auto border-2 border-turquoise-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-ivory-200/80">Searching verified educational videos for "{activeTopicKey}"...</p>
                    </div>
                  ) : currentActiveVideo ? (
                    !videoPlaybackError[currentActiveVideo.youtubeId] ? (
                      <iframe
                        src={currentActiveVideo.embedUrl}
                        title={currentActiveVideo.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        onError={() => setVideoPlaybackError(prev => ({ ...prev, [currentActiveVideo.youtubeId]: true }))}
                      />
                    ) : (
                      <div className="p-6 text-center text-xs text-ivory-200/70 space-y-2">
                        <Play className="w-8 h-8 mx-auto text-turquoise-400/50" />
                        <p>Video embed restricted. Watch directly on YouTube:</p>
                        <a
                          href={`https://www.youtube.com/watch?v=${currentActiveVideo.youtubeId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-turquoise-300 underline font-semibold"
                        >
                          <span>Open on YouTube ({currentActiveVideo.title})</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )
                  ) : (
                    <div className="p-8 text-center text-xs text-ivory-200/70 space-y-3 max-w-md mx-auto">
                      <Tv className="w-10 h-10 mx-auto text-turquoise-400/50" />
                      <div className="space-y-1">
                        <p className="font-bold text-ivory-100 text-sm">No Pre-Cached Video in Local Index</p>
                        <p className="text-[11px] text-ivory-200/60 leading-relaxed">
                          We do not show fabricated or unrelated videos. You can watch verified lectures for "{activeTopicKey}" directly on YouTube or explore the vector block diagram above.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activeTopicKey + ' educational lecture tutorial')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-glow-turquoise transition-all cursor-pointer"
                        >
                          <span>Search YouTube for "{activeTopicKey}"</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => fetchVideosForTopic(activeTopicKey)}
                          className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-ivory-200 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Retry Search</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Active Video Info Strip */}
                {currentActiveVideo && (
                  <div className="p-3 bg-[#0F172A]/95 border-t border-turquoise-500/15 flex items-center justify-between text-xs gap-3">
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-bold text-ivory-50 truncate">
                        {currentActiveVideo.title}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-ivory-200/70">
                        <span>Channel: <strong className="text-turquoise-400">{currentActiveVideo.channelTitle}</strong></span>
                        {currentActiveVideo.duration && (
                          <span className="flex items-center gap-1 text-[10px] text-champagne-300">
                            <Clock className="w-3 h-3" /> {currentActiveVideo.duration}
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={`https://www.youtube.com/watch?v=${currentActiveVideo.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-turquoise-500/20 hover:bg-turquoise-500/30 border border-turquoise-400/40 text-turquoise-300 font-semibold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors"
                      title="Open full video in YouTube"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {/* MULTIPLE TOPIC VIDEOS PLAYLIST */}
                {topicVideos.length > 1 && (
                  <div className="p-3 bg-[#0B0F19]/80 border-t border-turquoise-500/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-ivory-200">
                      <span className="flex items-center gap-1 text-champagne-300">
                        <ListVideo className="w-3.5 h-3.5" />
                        <span>Available Educational Videos for "{activeTopicKey}" ({topicVideos.length})</span>
                      </span>
                      <span className="text-[10px] text-turquoise-400">Click to Play</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topicVideos.map((vid) => {
                        const isCurrentPlaying = currentActiveVideo?.youtubeId === vid.youtubeId;
                        return (
                          <div
                            key={vid.youtubeId}
                            onClick={() => {
                              setVideoPlaybackError(prev => ({ ...prev, [vid.youtubeId]: false }));
                              setActiveVideoMap(prev => ({ ...prev, [activeTopicKey]: vid }));
                            }}
                            className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-2.5 ${
                              isCurrentPlaying
                                ? 'bg-turquoise-500/20 border-turquoise-400 shadow-glow-turquoise'
                                : 'bg-slate-900/60 hover:bg-slate-800 border-white/[0.05]'
                            }`}
                          >
                            <div className="relative w-16 h-11 shrink-0 rounded-lg overflow-hidden bg-black">
                              <img
                                src={vid.thumbnailUrl}
                                alt={vid.title}
                                className="w-full h-full object-cover"
                              />
                              {isCurrentPlaying && (
                                <div className="absolute inset-0 bg-slate-900/70 flex items-center justify-center">
                                  <Play className="w-4 h-4 text-turquoise-400 fill-turquoise-400" />
                                </div>
                              )}
                            </div>

                            <div className="truncate space-y-0.5">
                              <p className={`text-[11px] font-semibold truncate leading-tight ${
                                isCurrentPlaying ? 'text-turquoise-300 font-bold' : 'text-ivory-100'
                              }`}>
                                {vid.title}
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] text-ivory-200/60">
                                <span className="text-champagne-300 truncate">{vid.channelTitle}</span>
                                {vid.duration && <span>• {vid.duration}</span>}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TOPIC TITLE & HOOK */}
          <div className="space-y-2 pt-2 border-t border-turquoise-500/10">
            <h2 className="text-xl sm:text-2xl font-black text-ivory-50 tracking-tight">
              {currentReel.topicName}
            </h2>
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950 to-[#161F30] border border-turquoise-500/25 text-turquoise-200 text-xs font-semibold leading-relaxed">
              {currentReel.hook}
            </div>
          </div>

          {/* CORE CONCEPT / DEFINITION */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-champagne-300 uppercase tracking-wider block">
              Core Mechanism (From Page {currentReel.pageReference})
            </span>
            <p className="text-xs sm:text-sm text-ivory-100 leading-relaxed font-normal">
              {currentReel.coreIdea}
            </p>
          </div>

          {/* KEY INSIGHTS BULLET POINTS */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-champagne-300 uppercase tracking-wider block">
              Key Insights to Remember
            </span>
            <div className="space-y-1.5">
              {currentReel.bulletPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-ivory-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-turquoise-400 mt-1.5 shrink-0" />
                  <span className="leading-snug">{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MENTAL MODEL / REAL-WORLD ANALOGY */}
          {currentReel.realWorldAnalogy && (
            <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-champagne-400/20 text-xs space-y-1">
              <span className="text-[10px] font-bold text-champagne-400 uppercase tracking-wider block">
                💡 Real-World Mental Model
              </span>
              <p className="text-ivory-200 leading-relaxed">{currentReel.realWorldAnalogy}</p>
            </div>
          )}

          {/* CODE / FORMULA SNIPPET */}
          {currentReel.codeOrFormula && (
            <div className="p-2.5 rounded-xl bg-black/80 border border-turquoise-500/20 font-mono text-[11px] text-turquoise-300">
              <code>{currentReel.codeOrFormula}</code>
            </div>
          )}

          {/* CARD FOOTER: MARK MASTERED & TAKEAWAY */}
          <div className="pt-2 border-t border-turquoise-500/15 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-ivory-200/70 text-[11px] truncate pr-2">
              <span className="font-bold text-champagne-300">Takeaway:</span>
              <span className="truncate">{currentReel.quickTakeaway}</span>
            </div>

            <button
              onClick={() => onMarkMastered(currentReel.topicId)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 border ${
                isMastered
                  ? 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40 shadow-glow-purple'
                  : 'bg-slate-900 hover:bg-slate-800 text-ivory-200 border-white/[0.06]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
            </button>
          </div>

        </div>
      )}

      {/* PREV / NEXT BOTTOM NAV */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800/90 disabled:opacity-30 border border-turquoise-500/20 text-ivory-200 text-xs font-bold transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Concept</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredReels.length - 1}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-turquoise-500 to-emerald-600 hover:from-turquoise-400 hover:to-emerald-500 disabled:opacity-30 text-white text-xs font-extrabold transition-all shadow-glow-turquoise"
        >
          <span>Next Concept</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {copied && (
        <div className="text-center text-xs text-turquoise-300 animate-in fade-in">
          Takeaway copied to clipboard!
        </div>
      )}

      {/* ENLARGE DIAGRAM FULL-SCREEN MODAL */}
      {isDiagramModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in"
          onClick={() => setIsDiagramModalOpen(false)}
        >
          <div 
            className="clean-card max-w-4xl w-full p-6 space-y-4 border-2 border-turquoise-400 shadow-glow-turquoise bg-[#0B0F19] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-turquoise-500/20 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-brand-gradient">
                  {currentDiagram.title}
                </h3>
                <p className="text-xs text-ivory-200/70">
                  {currentDiagram.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadDiagramSvg}
                  className="px-3 py-1.5 rounded-lg bg-champagne-500/20 text-champagne-300 border border-champagne-400/30 text-xs font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download SVG</span>
                </button>
                <button
                  onClick={() => setIsDiagramModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 text-ivory-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div 
              className="w-full flex items-center justify-center py-4 overflow-auto"
              dangerouslySetInnerHTML={{ __html: currentDiagram.svgMarkup || '' }}
            />
          </div>
        </div>
      )}

    </div>
  );
};
