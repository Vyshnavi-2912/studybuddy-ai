import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  MessageSquare, 
  Settings, 
  Upload, 
  CheckCircle2, 
  FileText,
  ChevronDown,
  User,
  Edit3,
  Zap,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { DocumentNote, UserLearningProgress, UserProfile } from '../../types';

export type StudyVibe = 'neon' | 'bubblegum' | 'cyber' | 'daylight';

interface HeaderProps {
  currentDoc: DocumentNote | null;
  documents: DocumentNote[];
  progress: UserLearningProgress;
  userProfile?: UserProfile | null;
  currentVibe?: StudyVibe;
  onSelectVibe?: (vibe: StudyVibe) => void;
  onSelectDoc: (doc: DocumentNote) => void;
  onOpenUpload: () => void;
  onOpenTutor: () => void;
  onOpenSettings: () => void;
  onEditProfile?: () => void;
}

const VIBE_OPTIONS: { id: StudyVibe; label: string; icon: string; desc: string }[] = [
  { id: 'neon', label: 'Neon Pop', icon: '⚡', desc: 'Electric violet, cyan & coral' },
  { id: 'bubblegum', label: 'Bubblegum', icon: '🍬', desc: 'Pink, purple & sunset gold' },
  { id: 'cyber', label: 'Cyber Pop', icon: '🚀', desc: 'Electric blue & neon lime' },
  { id: 'daylight', label: 'Daylight Chill', icon: '☀️', desc: 'Clean, warm & crisp light mode' },
];

export const Header: React.FC<HeaderProps> = ({
  currentDoc,
  documents,
  progress,
  userProfile,
  currentVibe = 'neon',
  onSelectVibe,
  onSelectDoc,
  onOpenUpload,
  onOpenTutor,
  onOpenSettings,
  onEditProfile,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vibeMenuOpen, setVibeMenuOpen] = useState(false);

  const totalXp = (progress.completedLessonIds.length * 120) + (progress.quizAttempts.length * 85) + 320;
  const activeVibeMeta = VIBE_OPTIONS.find(v => v.id === currentVibe) || VIBE_OPTIONS[0];

  return (
    <header className="sticky top-0 z-30 border-b border-purple-500/20 bg-[#0B0F19]/85 backdrop-blur-xl px-4 lg:px-8 py-3 transition-colors shadow-sm">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
        
        {/* Brand & Punchy Casual Tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-cyan-400 to-rose-400 text-white font-black shadow-glow-purple transform hover:rotate-6 transition-transform cursor-pointer">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1">
                StudyBuddy <span className="text-brand-gradient">AI</span>
                <span className="text-base">🔥</span>
              </span>
            </div>
            <p className="text-[11px] text-amber-300/90 font-medium hidden sm:block">
              Bite-sized notes that actually stick ✨
            </p>
          </div>
        </div>

        {/* Center: Active Document Dropdown */}
        <div className="hidden md:flex items-center">
          {documents.length > 0 && currentDoc ? (
            <div className="relative">
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setVibeMenuOpen(false);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/25 text-xs font-bold text-slate-100 transition-all max-w-[280px] shadow-sm hover:border-purple-400/50"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{currentDoc.title}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-300 shrink-0 ml-1" />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#111827] border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider px-2.5 py-1.5 border-b border-purple-500/15 flex items-center justify-between">
                    <span>Your Study Notes</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[9px]">{documents.length}</span>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1 space-y-1">
                    {documents.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          onSelectDoc(doc);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition-all ${
                          currentDoc.id === doc.id
                            ? 'bg-purple-500/25 text-purple-200 font-bold border border-purple-400/30'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="truncate font-semibold">{doc.title}</p>
                          <span className="text-[10px] text-slate-400">{doc.pageCount} pages</span>
                        </div>
                        {currentDoc.id === doc.id && (
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="pt-1.5 border-t border-purple-500/15">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onOpenUpload();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 px-2 py-2 text-xs text-cyan-300 hover:bg-cyan-500/15 rounded-xl font-bold transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Drop New PDF Notes 📄
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Right Actions: Vibe Switcher, Gamified Streaks & Quick Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Casual Vibe Switcher Pill */}
          {onSelectVibe && (
            <div className="relative">
              <button
                onClick={() => {
                  setVibeMenuOpen(!vibeMenuOpen);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-200 text-xs font-bold transition-all"
                title="Change visual vibe & theme"
              >
                <span>{activeVibeMeta.icon}</span>
                <span className="hidden xl:inline text-[11px]">{activeVibeMeta.label}</span>
                <Palette className="w-3.5 h-3.5 text-purple-300" />
              </button>

              {vibeMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111827] border border-purple-500/30 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setVibeMenuOpen(false)}
                >
                  <p className="text-[10px] font-black uppercase text-amber-300 px-2.5 py-1 tracking-wider">
                    Pick Your Vibe ✨
                  </p>
                  <div className="space-y-1">
                    {VIBE_OPTIONS.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          onSelectVibe(v.id);
                          setVibeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs text-left transition-all ${
                          currentVibe === v.id
                            ? 'bg-purple-500/25 text-purple-200 font-black border border-purple-400/40'
                            : 'hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{v.icon}</span>
                          <div>
                            <p className="font-bold leading-tight">{v.label}</p>
                            <p className="text-[9px] text-slate-400">{v.desc}</p>
                          </div>
                        </div>
                        {currentVibe === v.id && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Name Pill */}
          {userProfile?.name && (
            <button
              onClick={onEditProfile}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-black transition-all group"
              title="Click to change your nickname"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="max-w-[70px] truncate">{userProfile.name}</span>
              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-0.5 text-cyan-400" />
            </button>
          )}

          {/* Gamified Streak Pill */}
          <div 
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-black shadow-sm"
            title={`${progress.studyStreakDays} day streak on fire!`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
            <span>{progress.studyStreakDays}d streak 🔥</span>
          </div>

          {/* Brain XP Pill */}
          <div 
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black"
            title={`Total Brain XP: ${totalXp}`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{totalXp} XP</span>
          </div>

          {/* Ask Bestie AI Button */}
          <button
            onClick={onOpenTutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/25 text-purple-300 text-xs font-bold transition-all cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Ask Bestie AI 💬</span>
          </button>

          {/* Drop Notes Button */}
          <button
            onClick={onOpenUpload}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 text-white text-xs font-black shadow-glow-purple transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Drop Notes ⚡</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-purple-500/20 transition-all hover:rotate-90 duration-300 cursor-pointer"
            title="Settings & Reset"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
