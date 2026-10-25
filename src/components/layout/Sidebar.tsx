import React from 'react';
import { 
  Home, 
  FileText, 
  Film, 
  Smile, 
  HelpCircle, 
  BarChart3, 
  Sparkles,
  Flame,
  Zap,
  BookOpen
} from 'lucide-react';
import { NavTab, DocumentNote } from '../../types';
export type { NavTab };

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentDoc: DocumentNote | null;
  documentsCount: number;
  weakTopicsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentDoc,
  documentsCount,
  weakTopicsCount,
}) => {
  const navItems = [
    {
      id: 'home' as NavTab,
      label: 'Chill Zone',
      icon: Home,
      badge: 'FEED',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    },
    {
      id: 'notes' as NavTab,
      label: 'Study Snacks',
      icon: FileText,
      badge: documentsCount > 0 ? `${documentsCount} docs` : null,
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    },
    {
      id: 'reel' as NavTab,
      label: 'Study Reels',
      icon: Film,
      badge: 'HOT 🔥',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
    },
    {
      id: 'meme' as NavTab,
      label: 'Meme Studio',
      icon: Smile,
      badge: 'VIRAL 🚀',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
    },
    {
      id: 'quiz' as NavTab,
      label: 'Boss Quiz',
      icon: HelpCircle,
      badge: 'FLEX ⚡',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    },
    {
      id: 'progress' as NavTab,
      label: 'XP & Streaks',
      icon: BarChart3,
      badge: weakTopicsCount > 0 ? `${weakTopicsCount} to fix 🚨` : 'LEVEL UP',
      badgeColor: weakTopicsCount > 0 
        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' 
        : 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0B0F19]/90 backdrop-blur-xl border-r border-purple-500/15 flex flex-col justify-between shrink-0 select-none">
      <div className="p-3 sm:p-4 space-y-6">
        
        {/* Navigation Section */}
        <div className="space-y-1.5">
          <p className="text-[11px] uppercase font-black tracking-wider text-amber-300/90 px-3 py-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Study Playground</span>
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm transition-all text-left group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 via-cyan-500/20 to-transparent text-white font-black border-l-4 border-purple-400 pl-3 shadow-glow-purple'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60 font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-purple-500/30 text-purple-300 shadow-sm' 
                      : 'text-slate-400 group-hover:text-cyan-300 group-hover:bg-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Currently Cooking Note Card */}
        {currentDoc && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 via-slate-900/80 to-slate-900 border border-purple-500/25 space-y-2 shadow-lg relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider flex items-center gap-1">
                <span>Cooking Right Now</span>
                <span className="animate-bounce">🍳</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-400/30">
                {currentDoc.pageCount} pgs
              </span>
            </div>
            <p className="text-xs font-black text-white line-clamp-2 leading-snug group-hover:text-purple-200 transition-colors">
              {currentDoc.title}
            </p>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-purple-500/15">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% Grounded
              </span>
              <span className="text-amber-300 font-semibold">Ready to ace 💯</span>
            </div>
          </div>
        )}

      </div>

      {/* Footer Student Vibe Tag */}
      <div className="p-4 border-t border-purple-500/15 bg-slate-950/40">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-[11px] font-semibold text-slate-300 leading-tight">
            Zero boring lectures • Pure vibes 🧠⚡
          </span>
        </div>
      </div>

    </aside>
  );
};
