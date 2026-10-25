import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  Lightbulb, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { SimpleLesson, UserLearningProgress } from '../../types';

interface SimpleStudioProps {
  lessons: SimpleLesson[];
  progress: UserLearningProgress;
  onMarkMastered: (topicId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
}

export const SimpleStudio: React.FC<SimpleStudioProps> = ({
  lessons,
  progress,
  onMarkMastered,
  onCompleteLesson,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentLesson = lessons[currentIndex];
  const isMastered = currentLesson ? progress.masteredTopicIds.includes(currentLesson.topicId) : false;
  const isCompleted = currentLesson ? progress.completedLessonIds.includes(currentLesson.id) : false;

  const handleNext = () => {
    if (currentLesson) onCompleteLesson(currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!lessons || lessons.length === 0) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl max-w-lg mx-auto space-y-3">
        <BookOpen className="w-10 h-10 mx-auto text-cyan-400" />
        <h3 className="text-base font-bold text-white">No Simple Lessons Available</h3>
        <p className="text-xs text-slate-400">Process notes through the Multi-Agent pipeline to generate Feynman ELI5 lessons.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 animate-in fade-in duration-300">
      
      {/* Header controls & progress */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Simple Mode (Feynman Technique)</span>
          </span>
          <span className="text-slate-400">
            Lesson {currentIndex + 1} of {lessons.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => currentLesson && onMarkMastered(currentLesson.topicId)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              isMastered
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-400'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
          </button>
        </div>
      </div>

      {/* Main Lesson Card */}
      <div className="clean-card p-6 sm:p-7 space-y-5 border border-white/[0.08]">
        
        {/* Title & Page Reference */}
        <div className="space-y-2 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              ELI5 Explanation
            </span>
            <span className="text-xs font-mono text-slate-400">
              Source: Page {currentLesson.pageReference}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentLesson.title}
          </h2>
        </div>

        {/* Intuitive ELI5 Explanation */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            The 5-Year-Old Explanation
          </span>
          <p className="text-sm text-slate-100 leading-relaxed font-medium">
            {currentLesson.eli5Explanation}
          </p>
        </div>

        {/* Key Definitions Glossary */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Core Definitions to Remember
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentLesson.keyDefinitions.map((def, i) => (
              <div 
                key={i}
                className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 hover:border-cyan-500/30 transition-colors"
              >
                <span className="font-bold text-xs text-purple-300 block">
                  {def.term}
                </span>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {def.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Breakdown */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            How It Works (Step-by-Step)
          </span>
          <div className="space-y-2">
            {currentLesson.stepByStepBreakdown.map((step, i) => (
              <div 
                key={i}
                className="p-3 rounded-xl bg-navy-950/60 border border-white/5 flex items-start gap-3 text-xs"
              >
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Life Practical Example */}
        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-1.5">
          <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
            Practical Real-World Example
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentLesson.realLifeExample}
          </p>
        </div>

        {/* Common Misconceptions Warning */}
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold text-amber-300 text-[11px]">Exam Pitfall Alert:</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {currentLesson.commonMisconceptions}
            </p>
          </div>
        </div>

      </div>

      {/* Prev / Next Navigation */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 border border-white/[0.08] text-slate-300 text-xs font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Lesson</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === lessons.length - 1}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-30 text-white text-xs font-semibold transition-colors"
        >
          <span>Next Lesson</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
