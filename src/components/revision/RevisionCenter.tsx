import React from 'react';
import { 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Play, 
  ArrowRight,
  TrendingUp,
  Clock,
  History
} from 'lucide-react';
import { UserLearningProgress, TopicConcept, GeneratedContent } from '../../types';
import { NavTab } from '../layout/Sidebar';

interface RevisionCenterProps {
  progress: UserLearningProgress;
  content: GeneratedContent | null;
  onNavigateTab: (tab: NavTab) => void;
  onMarkTopicMastered: (topicId: string) => void;
}

export const RevisionCenter: React.FC<RevisionCenterProps> = ({
  progress,
  content,
  onNavigateTab,
  onMarkTopicMastered,
}) => {
  const weakTopics = content?.topics.filter(t => progress.weakTopicIds.includes(t.id)) || [];
  const masteredTopics = content?.topics.filter(t => progress.masteredTopicIds.includes(t.id)) || [];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-rose-500/20 bg-gradient-to-r from-rose-950/20 via-navy-900/80 to-navy-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
            <span>Spaced Repetition & Weak Topic Recovery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Targeted Revision Center</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            StudyBuddy AI continuously isolates concepts missed in quizzes so you never waste study time on topics you already know.
          </p>
        </div>

        {weakTopics.length > 0 && (
          <button
            onClick={() => onNavigateTab('quiz')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95 shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Practice Weak Questions</span>
          </button>
        )}
      </div>

      {/* Topics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Weak Topics Card */}
        <div className="glass-panel rounded-2xl p-5 border border-rose-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white">
                Needs Immediate Revision ({weakTopics.length})
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Flagged from quiz errors</span>
          </div>

          {weakTopics.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto opacity-70" />
              <p className="text-xs font-medium text-slate-200">No weak topics flagged!</p>
              <p className="text-[11px] text-slate-400">
                You scored accurately on all tested concepts so far. Take a quiz to test your memory.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {weakTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{topic.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Page {topic.pageReference}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-snug">{topic.definition}</p>
                  </div>

                  <button
                    onClick={() => onMarkTopicMastered(topic.id)}
                    className="shrink-0 p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-semibold transition-colors flex items-center gap-1"
                    title="Mark as understood & mastered"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mastered</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mastered Topics Card */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">
                Mastered Topics ({masteredTopics.length})
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Confidence verified</span>
          </div>

          {masteredTopics.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto opacity-70" />
              <p className="text-xs font-medium text-slate-200">No topics marked mastered yet</p>
              <p className="text-[11px] text-slate-400">
                Complete lessons or answer quizzes correctly to build up your verified mastery list.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {masteredTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/20 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{topic.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Page {topic.pageReference}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-snug">{topic.definition}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold shrink-0">
                    Solid
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Quiz Attempt History */}
      <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-purple-400" />
            <span>Quiz Attempt Log</span>
          </h3>
          <span className="text-xs text-slate-400">
            {progress.quizAttempts.length} total sessions recorded
          </span>
        </div>

        {progress.quizAttempts.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-4">
            No quiz attempts recorded yet.
          </p>
        ) : (
          <div className="space-y-2">
            {progress.quizAttempts.map((attempt) => (
              <div 
                key={attempt.id}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="space-y-0.5">
                  <p className="font-semibold text-slate-200">{attempt.documentTitle}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{new Date(attempt.timestamp).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{attempt.correctAnswers}/{attempt.totalQuestions} Questions</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${
                    attempt.scorePercent >= 80 ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {attempt.scorePercent}%
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    attempt.scorePercent >= 80 
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                  }`}>
                    {attempt.scorePercent >= 80 ? 'Pass' : 'Review'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
