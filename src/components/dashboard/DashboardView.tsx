import React from 'react';
import { 
  Upload, 
  Film, 
  Smile, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  ArrowRight,
  Sparkles,
  Zap,
  Flame,
  Brain,
  Compass,
  Play
} from 'lucide-react';
import { 
  DocumentNote, 
  GeneratedContent, 
  UserLearningProgress, 
  UserProfile,
  NavTab
} from '../../types';

interface DashboardViewProps {
  currentDoc: DocumentNote | null;
  documents: DocumentNote[];
  content: GeneratedContent | null;
  progress: UserLearningProgress;
  userProfile?: UserProfile | null;
  onOpenUpload: () => void;
  onSelectDoc: (doc: DocumentNote) => void;
  onNavigateTab: (tab: NavTab, subMode?: 'reel' | 'meme' | 'simple') => void;
  onLoadSample: (sampleId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentDoc,
  documents,
  content,
  progress,
  userProfile,
  onOpenUpload,
  onSelectDoc,
  onNavigateTab,
  onLoadSample,
}) => {
  const totalCompletedLessons = progress.completedLessonIds.length;
  const totalQuizAttempts = progress.quizAttempts.length;
  const avgQuizAccuracy = totalQuizAttempts > 0
    ? Math.round(progress.quizAttempts.reduce((acc, a) => acc + a.scorePercent, 0) / totalQuizAttempts)
    : 92;

  const topicsNeedingRevisionCount = progress.weakTopicIds.length;
  const studentName = userProfile?.name || 'Champ';
  const totalXp = (totalCompletedLessons * 120) + (totalQuizAttempts * 85) + 320;
  const featuredTopic = content?.topics?.[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      
      {/* 1. High-Energy Hero Banner */}
      <div className="clean-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-purple-900/40 via-slate-900/90 to-cyan-950/40 border border-purple-500/30 shadow-glow-purple">
        
        {/* Glow Effects */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-purple-500/20 filter blur-3xl pointer-events-none" />
        <div className="absolute right-32 -bottom-16 w-64 h-64 rounded-full bg-cyan-500/20 filter blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-3.5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/40 text-purple-200 text-xs font-black tracking-wide">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Study Mode: Activated 🔥</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Welcome back, <span className="text-brand-gradient">{studentName}</span>! Ready to crush it? 🚀
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Turn dry, boring textbook notes into bite-sized reels, viral memes, and 10-second exam cheat codes. Zero boring lectures, 100% intuition.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {/* Main Action: Drop Notes */}
            <button
              onClick={onOpenUpload}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-xs tracking-wide shadow-glow-purple transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Drop Notes & Cook ⚡</span>
            </button>

            {documents.length > 0 && (
              <button
                onClick={() => onNavigateTab('notes')}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/30 text-slate-200 font-bold text-xs transition-all cursor-pointer hover:border-cyan-400/50"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Browse Study Snacks ({content?.topics?.length || 0}) 🍿</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Gamified Stats Bar (High Dopamine) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        {/* Brain XP */}
        <div className="clean-card p-4 space-y-1 border border-purple-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Brain XP</span>
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{totalXp}</span>
            <span className="text-[11px] text-amber-300 font-bold">XP</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(25, (totalXp % 1000) / 10))}%` }}
            />
          </div>
        </div>

        {/* Lessons Crushed */}
        <div className="clean-card p-4 space-y-1 border border-purple-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Lessons Crushed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{totalCompletedLessons}</span>
            <span className="text-[11px] text-emerald-400 font-bold">done</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(15, totalCompletedLessons * 15))}%` }}
            />
          </div>
        </div>

        {/* Quiz Flex Rate */}
        <div className="clean-card p-4 space-y-1 border border-purple-500/20 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Quiz Flex Rate</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{avgQuizAccuracy}%</span>
            <span className="text-[11px] text-cyan-300 font-bold">accuracy</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${avgQuizAccuracy}%` }}
            />
          </div>
        </div>

        {/* Exam Rescue */}
        <div 
          onClick={() => onNavigateTab('progress')}
          className="clean-card clean-card-hover p-4 space-y-1 cursor-pointer border border-rose-500/25 bg-slate-900/60"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Exam Rescue</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{topicsNeedingRevisionCount}</span>
            <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1">
              <span>Fix now</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 truncate">
            {topicsNeedingRevisionCount === 0 ? 'All concepts locked in 🔒' : 'Quick polish before tests'}
          </p>
        </div>

      </div>

      {/* 3. Featured 10-Second Quick Grab Spotlight */}
      {featuredTopic && (
        <div className="clean-card p-5 sm:p-6 border border-amber-400/30 bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-purple-950/30 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-400/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-black text-xs border border-amber-400/40 flex items-center gap-1">
                <span>⚡ 10-Second Quick Grab</span>
              </span>
              <span className="text-xs font-bold text-slate-400">
                From {currentDoc?.title || 'active notes'}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-400/30">
              Page {featuredTopic.pageReference} Exam Favorite ⭐
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-white">
              {featuredTopic.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {featuredTopic.definition}
            </p>
          </div>

          {featuredTopic.keyPoints && featuredTopic.keyPoints.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-500/20 flex items-start gap-2 text-xs text-amber-200">
              <span className="text-base shrink-0">💡</span>
              <div>
                <span className="font-bold text-amber-300 block text-[11px] uppercase tracking-wider">The Real Takeaway:</span>
                <span>{featuredTopic.keyPoints[0]}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1 flex-wrap text-xs font-bold">
            <button
              onClick={() => onNavigateTab('reel')}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Watch Reel 🎬</span>
            </button>
            <button
              onClick={() => onNavigateTab('meme')}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Meme It 😂</span>
            </button>
            <button
              onClick={() => onNavigateTab('quiz')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold transition-all shadow-glow-turquoise flex items-center gap-1.5 cursor-pointer ml-auto"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>2-Min Quiz ⚡</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Four Core Learning Playgrounds Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Interactive Study Playgrounds</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium">Pick your favorite study style</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Study Reels */}
          <div className="clean-card clean-card-hover p-5 flex flex-col justify-between space-y-4 border border-rose-500/20 bg-slate-900/80 shadow-md">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center justify-center shadow-sm">
                <Film className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>Study Reels</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30">HOT 🔥</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Topic-matched short videos & real architecture diagrams. Like TikTok for your brain.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('reel')}
              className="w-full py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Watch Reels 🎬</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Meme Studio */}
          <div className="clean-card clean-card-hover p-5 flex flex-col justify-between space-y-4 border border-amber-500/20 bg-slate-900/80 shadow-md">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shadow-sm">
                <Smile className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>Meme Studio</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">DOPE 😂</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Instant illustrated memes & exam jokes that act as unforgettable memory anchors.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('meme')}
              className="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Cook AI Memes 😂</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Explain Like I'm 5 */}
          <div className="clean-card clean-card-hover p-5 flex flex-col justify-between space-y-4 border border-purple-500/20 bg-slate-900/80 shadow-md">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>ELI5 Mode</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">NO JARGON 🍼</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Plain English Feynman summaries with real-world analogies and common traps.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('learn', 'simple')}
              className="w-full py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Read ELI5 💡</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Boss Quiz */}
          <div className="clean-card clean-card-hover p-5 flex flex-col justify-between space-y-4 border border-cyan-500/20 bg-slate-900/80 shadow-md">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shadow-sm">
                <HelpCircle className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>Boss Quiz</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">FLEX ⚡</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Fast-paced active recall questions with instant explanations & page citations.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('quiz')}
              className="w-full py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Flex Knowledge 🏆</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* 5. Extracted Study Snacks from Notes */}
      {content && content.topics && content.topics.length > 0 && (
        <div className="clean-card p-5 sm:p-6 space-y-4 border border-purple-500/20 bg-slate-900/80">
          <div className="flex items-center justify-between border-b border-purple-500/15 pb-3">
            <div className="space-y-0.5">
              <h2 className="text-sm font-black text-white flex items-center gap-1.5">
                <span>Study Snacks from Your Notes ({content.topics.length})</span>
                <span className="text-base">🍿</span>
              </h2>
              <p className="text-xs text-slate-400">
                Extracted page-by-page from {currentDoc?.title || 'active notes'}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('notes')}
              className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline font-bold"
            >
              View Full Notes & Cheat Codes →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {content.topics.slice(0, 6).map((t) => (
              <div 
                key={t.id}
                onClick={() => onNavigateTab('reel')}
                className="p-4 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-purple-500/15 hover:border-purple-400/50 transition-all cursor-pointer space-y-2 group shadow-sm hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-400/30">
                    Page {t.pageReference}
                  </span>
                  <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">
                    {t.importance} Priority
                  </span>
                </div>
                <h4 className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {t.name}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  {t.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Built-in Quick Practice Packs */}
      <div className="clean-card p-5 space-y-3 border border-purple-500/15 bg-slate-950/70">
        <div className="flex items-center justify-between text-xs">
          <span className="font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Instant Practice Packs (Pick a Topic & Play) ⚡</span>
          </span>
          <span className="text-slate-400 text-[11px] font-medium">Pre-loaded curricula</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            { id: 'sample-doc-net-1', title: 'Computer Networks', sub: 'OSI 7 Layers & TCP Handshake' },
            { id: 'sample-doc-os-2', title: 'Operating Systems', sub: 'Deadlocks & Virtual Memory' },
            { id: 'sample-doc-java-3', title: 'Java Programming', sub: 'Inheritance & Polymorphism' },
            { id: 'sample-doc-iot-4', title: 'Internet of Things', sub: '3-Tier Sensors & MQTT' },
          ].map((sample) => (
            <button
              key={sample.id}
              onClick={() => onLoadSample(sample.id)}
              className="p-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/15 hover:border-cyan-400/40 text-left transition-all group cursor-pointer"
            >
              <p className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">
                {sample.title}
              </p>
              <p className="text-[10px] text-slate-400 truncate mt-0.5">
                {sample.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
