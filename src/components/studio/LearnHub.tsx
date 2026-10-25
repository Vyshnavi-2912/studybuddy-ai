import React, { useState } from 'react';
import { 
  Film, 
  Smile, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { ReelStudio } from './ReelStudio';
import { MemeStudio } from './MemeStudio';
import { SimpleStudio } from './SimpleStudio';
import { GeneratedContent, UserLearningProgress, DocumentNote, MemeCard } from '../../types';

interface LearnHubProps {
  currentDoc: DocumentNote | null;
  content: GeneratedContent | null;
  progress: UserLearningProgress;
  activeSubMode: 'reel' | 'meme' | 'simple';
  onSubModeChange: (mode: 'reel' | 'meme' | 'simple') => void;
  onNavigateQuiz: () => void;
  onBookmarkReel: (reelId: string) => void;
  onSaveMeme: (memeId: string) => void;
  onMarkMastered: (topicId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onUpdateMemes?: (memes: MemeCard[]) => void;
}

export const LearnHub: React.FC<LearnHubProps> = ({
  currentDoc,
  content,
  progress,
  activeSubMode,
  onSubModeChange,
  onNavigateQuiz,
  onBookmarkReel,
  onSaveMeme,
  onMarkMastered,
  onCompleteLesson,
  onUpdateMemes,
}) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Learning Mode Navigation Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 clean-card p-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => onSubModeChange('reel')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors ${
              activeSubMode === 'reel'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-pink-400" />
            <span>Reel Mode</span>
          </button>

          <button
            onClick={() => onSubModeChange('meme')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors ${
              activeSubMode === 'meme'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-amber-400" />
            <span>Meme Mode</span>
          </button>

          <button
            onClick={() => onSubModeChange('simple')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors ${
              activeSubMode === 'simple'
                ? 'bg-purple-600 text-white font-semibold'
                : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Simple Mode</span>
          </button>
        </div>

        <button
          onClick={onNavigateQuiz}
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-purple-300 text-xs font-semibold transition-colors shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Switch to Quiz Mode</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Active Mode Render */}
      <div>
        {activeSubMode === 'reel' && (
          <ReelStudio
            reels={content?.reels || []}
            topics={content?.topics || []}
            progress={progress}
            onBookmark={onBookmarkReel}
            onMarkMastered={onMarkMastered}
            onCompleteLesson={onCompleteLesson}
          />
        )}

        {activeSubMode === 'meme' && (
          <MemeStudio
            memes={content?.memes || []}
            topics={content?.topics || []}
            progress={progress}
            documentId={currentDoc?.id}
            onSaveMeme={onSaveMeme}
            onCompleteLesson={onCompleteLesson}
            onUpdateMemes={onUpdateMemes}
          />
        )}

        {activeSubMode === 'simple' && (
          <SimpleStudio
            lessons={content?.simpleLessons || []}
            progress={progress}
            onMarkMastered={onMarkMastered}
            onCompleteLesson={onCompleteLesson}
          />
        )}
      </div>

    </div>
  );
};
