import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Upload, 
  BookOpen, 
  HelpCircle, 
  Film, 
  Smile, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Search,
  ChevronDown,
  ChevronUp,
  Workflow,
  Sparkles,
  Zap,
  Flame,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { DocumentNote, TopicConcept, GeneratedContent, NavTab } from '../../types';

interface NotesViewProps {
  currentDoc: DocumentNote | null;
  documents: DocumentNote[];
  content: GeneratedContent | null;
  onSelectDoc: (doc: DocumentNote) => void;
  onOpenUpload: () => void;
  onStartTopicQuiz: (topicId: string, topicName: string) => void;
  onNavigateTab: (tab: NavTab, subMode?: 'reel' | 'meme' | 'simple') => void;
  onNavigateTopic?: (topicId: string, tab: NavTab) => void;
}

export const NotesView: React.FC<NotesViewProps> = ({
  currentDoc,
  documents,
  content,
  onSelectDoc,
  onOpenUpload,
  onStartTopicQuiz,
  onNavigateTab,
  onNavigateTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPages, setExpandedPages] = useState<{ [pageNum: number]: boolean }>({ 1: true, 2: true, 3: true, 4: true, 5: true });

  const topics = content?.topics || [];

  // Group topics strictly by original PDF page number
  const pageGroups = useMemo(() => {
    const map = new Map<number, TopicConcept[]>();
    topics.forEach((t) => {
      const pageNum = t.pageReference || 1;
      const list = map.get(pageNum) || [];
      list.push(t);
      map.set(pageNum, list);
    });

    if (currentDoc?.rawPages) {
      currentDoc.rawPages.forEach((p) => {
        if (!map.has(p.pageNumber)) {
          map.set(p.pageNumber, []);
        }
      });
    }

    return Array.from(map.entries()).sort(([pA], [pB]) => pA - pB);
  }, [topics, currentDoc]);

  // Filter page groups based on search query
  const filteredPageGroups = useMemo(() => {
    if (!searchQuery.trim()) return pageGroups;
    const q = searchQuery.toLowerCase().trim();

    return pageGroups
      .map(([pageNum, pageTopics]) => {
        const matchingTopics = pageTopics.filter(t => 
          t.name.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.keyPoints?.some(kp => kp.toLowerCase().includes(q)) ||
          `page ${pageNum}`.includes(q)
        );
        return [pageNum, matchingTopics] as [number, TopicConcept[]];
      })
      .filter(([_, matchingTopics]) => matchingTopics.length > 0);
  }, [pageGroups, searchQuery]);

  const togglePageAccordion = (pageNum: number) => {
    setExpandedPages(prev => ({
      ...prev,
      [pageNum]: !prev[pageNum]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: { [p: number]: boolean } = {};
    pageGroups.forEach(([p]) => { allExpanded[p] = true; });
    setExpandedPages(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedPages({});
  };

  const handleLaunchTopic = (topicId: string, targetTab: NavTab) => {
    if (onNavigateTopic) {
      onNavigateTopic(topicId, targetTab);
    } else {
      onNavigateTab(targetTab);
    }
  };

  if (!currentDoc) {
    return (
      <div className="clean-card p-12 text-center max-w-lg mx-auto space-y-4 bg-slate-900/80 border-purple-500/20 shadow-glow-purple">
        <FileText className="w-12 h-12 mx-auto text-cyan-400" />
        <h3 className="text-lg font-black text-white">No Notes Loaded Yet</h3>
        <p className="text-xs text-slate-300 font-medium">
          Drop a lecture note or textbook PDF to turn it into bite-sized study snacks, visual reels, and memes.
        </p>
        <button
          onClick={onOpenUpload}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-xs shadow-glow-purple transition-all cursor-pointer"
        >
          Drop Your Notes ⚡
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="clean-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-cyan-950/40 backdrop-blur-xl shadow-glow-purple">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black tracking-wider text-amber-300 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-amber-400/30 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Active Study Snacks</span>
            </span>
            <span className="text-xs text-cyan-300 font-mono font-bold">
              {currentDoc.pageCount} Pages • {currentDoc.detectedSubject || 'Computer Science'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentDoc.title}
          </h1>

          <p className="text-xs text-slate-300 font-medium">
            Uploaded on {new Date(currentDoc.uploadedAt).toLocaleDateString()} • {topics.length} concepts broken down page-by-page
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => onStartTopicQuiz('all', 'All Extracted Topics')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs transition-all shadow-glow-turquoise cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quiz This Note ⚡</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-purple-500/30 text-slate-200 text-xs font-bold transition-all cursor-pointer hover:border-purple-400/50"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>Drop Another 📄</span>
          </button>
        </div>
      </div>

      {/* 2. Switcher Row */}
      {documents.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-amber-300 text-[11px] font-black uppercase tracking-wider shrink-0">Switch Notes:</span>
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDoc(doc)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-bold cursor-pointer ${
                currentDoc.id === doc.id
                  ? 'bg-purple-600/30 border border-purple-400 text-white shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border border-purple-500/15'
              }`}
            >
              {doc.title}
            </button>
          ))}
        </div>
      )}

      {/* 3. Search and Accordion Controls Bar */}
      <div className="clean-card p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 border border-purple-500/20 bg-slate-900/80">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, topics, or page numbers..."
            className="w-full bg-slate-950/80 border border-purple-500/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-bold text-slate-400">
          <button
            onClick={handleExpandAll}
            className="px-2.5 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <span>•</span>
          <button
            onClick={handleCollapseAll}
            className="px-2.5 py-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* 4. Page-by-Page Concepts Accordion */}
      <div className="space-y-4">
        {filteredPageGroups.length === 0 ? (
          <div className="clean-card p-8 text-center space-y-2 border border-purple-500/20 bg-slate-900/60">
            <p className="text-sm font-bold text-slate-300">No matching concepts found</p>
            <p className="text-xs text-slate-400">Try searching for a different keyword or page number.</p>
          </div>
        ) : (
          filteredPageGroups.map(([pageNum, pageTopics]) => {
            const isExpanded = expandedPages[pageNum] ?? true;
            const primaryTopicName = pageTopics[0]?.name || `General Notes (Page ${pageNum})`;

            return (
              <div 
                key={pageNum}
                className="clean-card border border-purple-500/25 bg-slate-900/85 backdrop-blur-xl overflow-hidden shadow-sm transition-all"
              >
                
                {/* Page Accordion Header */}
                <div 
                  onClick={() => togglePageAccordion(pageNum)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/60 transition-colors border-b border-purple-500/15 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300 font-black text-xs font-mono shrink-0">
                      PAGE {pageNum}
                    </span>
                    <div>
                      <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                        <span>{primaryTopicName}</span>
                        {pageTopics.length > 1 && (
                          <span className="text-xs text-slate-400 font-semibold">
                            (+{pageTopics.length - 1} more)
                          </span>
                        )}
                      </h2>
                      <p className="text-[11px] text-amber-300/90 font-mono font-semibold">
                        {pageTopics.length} {pageTopics.length === 1 ? 'concept' : 'concepts'} verified on this page
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[11px] font-semibold hidden sm:inline">
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
                  </div>
                </div>

                {/* Concepts on Page */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-4 animate-in fade-in duration-200">
                    {pageTopics.length === 0 ? (
                      <p className="text-xs text-slate-400 italic p-3">
                        Page verified in document. No isolated sub-headings found.
                      </p>
                    ) : (
                      pageTopics.map((topic, tIdx) => (
                        <div 
                          key={topic.id}
                          className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-purple-500/20 space-y-3.5 hover:border-purple-400/50 transition-all shadow-inner group"
                        >
                          
                          {/* Topic Name & Importance Badges */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                                {tIdx + 1}
                              </span>
                              <h3 className="text-sm sm:text-base font-black text-white tracking-tight group-hover:text-purple-200 transition-colors">
                                {topic.name}
                              </h3>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-amber-300 border border-amber-400/30">
                                Page {topic.pageReference} Citation
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                                {topic.importance} Priority
                              </span>
                            </div>
                          </div>

                          {/* ⚡ 10-Second Quick Grab (Exam Cheat Code) */}
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-purple-500/10 border border-amber-400/30 space-y-1">
                            <div className="flex items-center gap-1.5 text-amber-300 font-black text-[11px] uppercase tracking-wider">
                              <Zap className="w-3.5 h-3.5 fill-amber-300" />
                              <span>10-Second Quick Grab (Exam Cheat Code)</span>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed">
                              {topic.definition.split('.')[0] + '.'}
                            </p>
                          </div>

                          {/* Full Explanation */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                              Detailed Breakdown
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed font-normal">
                              {topic.definition}
                            </p>
                          </div>

                          {/* Key Takeaways */}
                          {topic.keyPoints && topic.keyPoints.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[10px] font-black text-cyan-300 uppercase tracking-wider block">
                                Key Mechanisms & Traps to Avoid
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {topic.keyPoints.map((pt, pIdx) => (
                                  <div key={pIdx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                                    <span className="leading-snug">{pt}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick Interactive Actions */}
                          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                onClick={() => handleLaunchTopic(topic.id, 'reel')}
                                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/30 transition-all font-bold flex items-center gap-1.5 cursor-pointer active:scale-95"
                                title="Watch bite-sized visual reels"
                              >
                                <Film className="w-3.5 h-3.5" />
                                <span>Watch Reel 🎬</span>
                              </button>

                              <button
                                onClick={() => handleLaunchTopic(topic.id, 'meme')}
                                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 transition-all font-bold flex items-center gap-1.5 cursor-pointer active:scale-95"
                                title="See dope study memes"
                              >
                                <Smile className="w-3.5 h-3.5" />
                                <span>Meme It 😂</span>
                              </button>
                            </div>

                            <button
                              onClick={() => onStartTopicQuiz(topic.id, topic.name)}
                              className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs transition-all shadow-glow-turquoise flex items-center gap-1.5 cursor-pointer active:scale-95 ml-auto"
                            >
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>Quiz on {topic.name} ⚡</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>

                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
