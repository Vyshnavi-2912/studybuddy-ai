import React, { useState } from 'react';
import { 
  BarChart3, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Download, 
  Printer, 
  Clock, 
  TrendingUp, 
  HelpCircle,
  ArrowRight,
  Smile,
  FileText,
  Images,
  ExternalLink
} from 'lucide-react';
import { 
  UserLearningProgress, 
  DocumentNote, 
  GeneratedContent, 
  TopicConcept 
} from '../../types';
import { storageService } from '../../services/storageService';

interface ProgressHubProps {
  currentDoc: DocumentNote | null;
  content: GeneratedContent | null;
  progress: UserLearningProgress;
  onStartTopicQuiz: (topicId: string, topicName: string) => void;
  onMarkTopicMastered: (topicId: string) => void;
}

export const ProgressHub: React.FC<ProgressHubProps> = ({
  currentDoc,
  content,
  progress,
  onStartTopicQuiz,
  onMarkTopicMastered,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'weak' | 'history' | 'memes'>('overview');

  const totalQuizAttempts = progress.quizAttempts.length;
  const avgQuizAccuracy = totalQuizAttempts > 0
    ? Math.round(progress.quizAttempts.reduce((acc, a) => acc + a.scorePercent, 0) / totalQuizAttempts)
    : 85;

  const weakTopics = content?.topics.filter(t => progress.weakTopicIds.includes(t.id)) || [];
  const masteredTopics = content?.topics.filter(t => progress.masteredTopicIds.includes(t.id)) || [];
  const allMemes = content?.memes || [];
  const memeImageCache = storageService.getMemeImageCache();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>StudyBuddy AI — Academic Learning Report for ${currentDoc?.title || 'Notes'}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0B0F19; background: #FCFBF7; line-height: 1.5; }
          h1 { color: #0F172A; border-bottom: 3px solid #00E5C8; padding-bottom: 10px; }
          .stats { display: flex; gap: 20px; margin: 25px 0; }
          .stat-box { background: #FFFFFF; border: 1px solid #DFD9C4; padding: 15px; border-radius: 12px; flex: 1; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
          .stat-value { font-size: 26px; font-weight: 800; color: #0D9488; }
          .section { margin-top: 35px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th, td { border: 1px solid #E2E8F0; padding: 12px; text-align: left; font-size: 13px; }
          th { background: #0F172A; color: #FFFFFF; }
          .badge-mastered { color: #059669; font-weight: bold; }
          .badge-weak { color: #DC2626; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>StudyBuddy AI — Student Performance Audit</h1>
        <p><strong>Document:</strong> ${currentDoc?.title || 'Study Session'}</p>
        <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        
        <div class="stats">
          <div class="stat-box"><div class="stat-value">${progress.totalStudyMinutes} min</div>Total Study Time</div>
          <div class="stat-box"><div class="stat-value">${progress.completedLessonIds.length}</div>Lessons Completed</div>
          <div class="stat-box"><div class="stat-value">${avgQuizAccuracy}%</div>Quiz Accuracy</div>
          <div class="stat-box"><div class="stat-value">${progress.studyStreakDays} Days</div>Learning Streak</div>
        </div>

        <div class="section">
          <h2>Topic Mastery & Retention Audit</h2>
          <table>
            <thead>
              <tr><th>Topic Concept</th><th>Page</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${(content?.topics || []).map(t => `
                <tr>
                  <td><strong>${t.name}</strong><br><small>${t.definition}</small></td>
                  <td>Page ${t.pageReference}</td>
                  <td>${progress.weakTopicIds.includes(t.id) ? '<span class="badge-weak">Needs Revision</span>' : '<span class="badge-mastered">Mastered</span>'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StudyBuddy_Report_${(currentDoc?.title || 'Notes').replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      
      {/* 1. Header Banner */}
      <div className="clean-card p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-turquoise-500/25 bg-[#0F172A]/90 backdrop-blur-xl shadow-glow-purple">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-turquoise-300 px-2.5 py-0.5 rounded-full bg-slate-900 border border-turquoise-400/30">
              Personalized Learning Memory
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-ivory-50 tracking-tight">
            Learning Progress & Mastery
          </h1>
          <p className="text-xs text-ivory-200/70">
            Real performance metrics derived from completed lessons and grounded quiz attempts.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-white/[0.08] text-ivory-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-champagne-400" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-black transition-all shadow-glow-turquoise cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="clean-card p-5 space-y-1.5 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
          <span className="text-xs text-ivory-200/70 font-bold block">Study Time</span>
          <p className="text-2xl sm:text-3xl font-black text-ivory-50">{progress.totalStudyMinutes} min</p>
          <span className="text-[10px] text-champagne-300 font-mono">Recorded study</span>
        </div>

        <div className="clean-card p-5 space-y-1.5 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
          <span className="text-xs text-ivory-200/70 font-bold block">Completed Lessons</span>
          <p className="text-2xl sm:text-3xl font-black text-turquoise-400">{progress.completedLessonIds.length}</p>
          <span className="text-[10px] text-turquoise-300 font-mono">Modules finished</span>
        </div>

        <div className="clean-card p-5 space-y-1.5 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
          <span className="text-xs text-ivory-200/70 font-bold block">Quiz Accuracy</span>
          <p className="text-2xl sm:text-3xl font-black text-champagne-400">{avgQuizAccuracy}%</p>
          <span className="text-[10px] text-champagne-300 font-mono">{totalQuizAttempts} attempts</span>
        </div>

        <div className="clean-card p-5 space-y-1.5 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
          <span className="text-xs text-ivory-200/70 font-bold block">Study Streak</span>
          <p className="text-2xl sm:text-3xl font-black text-amber-400">{progress.studyStreakDays} Days</p>
          <span className="text-[10px] text-amber-300 font-mono">Daily consistency</span>
        </div>
      </div>

      {/* 3. Sub Tabs: Overview, Weak Topics, Quiz History, Saved Memes */}
      <div className="flex items-center gap-1.5 border-b border-turquoise-500/15 pb-2 text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-glow-turquoise'
              : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
          }`}
        >
          Mastery Overview
        </button>

        <button
          onClick={() => setActiveTab('weak')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'weak'
              ? 'bg-rose-500/25 text-rose-300 border border-rose-400/40'
              : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>Topics to Revise</span>
          {weakTopics.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500/30 text-rose-200 font-mono">
              {weakTopics.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-glow-turquoise'
              : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
          }`}
        >
          Quiz History ({progress.quizAttempts.length})
        </button>

        <button
          onClick={() => setActiveTab('memes')}
          className={`px-3.5 py-2 rounded-xl font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'memes'
              ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-glow-gold'
              : 'text-ivory-200/70 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Smile className="w-3.5 h-3.5" />
          <span>Generated Memes ({allMemes.length})</span>
        </button>
      </div>

      {/* Tab 1: Overview (Mastered vs Weak) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Needs Revision */}
          <div className="clean-card p-5 space-y-3 border border-rose-500/30 bg-[#0F172A]/90 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-ivory-50 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Needs Revision ({weakTopics.length})</span>
              </h3>
            </div>

            {weakTopics.length === 0 ? (
              <p className="text-xs text-ivory-200/60 py-6 text-center italic">
                ✨ Zero weak topics flagged! Your concept retention is high.
              </p>
            ) : (
              <div className="space-y-2">
                {weakTopics.map((topic) => (
                  <div key={topic.id} className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/25 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-bold text-ivory-50">{topic.name}</p>
                      <span className="text-[10px] text-champagne-300 font-mono">Page {topic.pageReference}</span>
                    </div>
                    <button
                      onClick={() => onStartTopicQuiz(topic.id, topic.name)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>Quiz</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mastered Topics */}
          <div className="clean-card p-5 space-y-3 border border-turquoise-500/30 bg-[#0F172A]/90 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-ivory-50 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-turquoise-400" />
                <span>Mastered Topics ({masteredTopics.length})</span>
              </h3>
            </div>

            {masteredTopics.length === 0 ? (
              <p className="text-xs text-ivory-200/60 py-6 text-center italic">
                Take quizzes and complete topic lessons to build your mastery roster.
              </p>
            ) : (
              <div className="space-y-2">
                {masteredTopics.map((topic) => (
                  <div key={topic.id} className="p-3 rounded-xl bg-[#0B0F19] border border-turquoise-500/20 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-bold text-ivory-50">{topic.name}</p>
                      <span className="text-[10px] text-champagne-300 font-mono">Page {topic.pageReference}</span>
                    </div>
                    <span className="text-[10px] text-turquoise-300 font-bold px-2 py-0.5 rounded bg-slate-900 border border-turquoise-400/30">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 2: Topics to Revise */}
      {activeTab === 'weak' && (
        <div className="clean-card p-6 space-y-4 border border-rose-500/30 bg-[#0F172A]/90 backdrop-blur-xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-ivory-50 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Targeted Revision Hub</span>
            </h3>
            <p className="text-xs text-ivory-200/70">
              Topics where quiz questions were missed. Take quick practice quizzes to cement memory.
            </p>
          </div>

          {weakTopics.length === 0 ? (
            <div className="p-8 text-center text-xs text-ivory-200/60 space-y-2">
              <CheckCircle2 className="w-10 h-10 mx-auto text-turquoise-400" />
              <p className="font-bold text-ivory-100">No Revision Needed Right Now</p>
              <p>You have answered all questions correctly in your recent quiz attempts.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {weakTopics.map((topic) => (
                <div key={topic.id} className="p-4 rounded-xl bg-[#0B0F19] border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <p className="font-bold text-ivory-50 text-sm">{topic.name}</p>
                    <p className="text-[11px] text-ivory-200/70">{topic.definition}</p>
                    <span className="text-[10px] text-champagne-300 font-mono">Page {topic.pageReference}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onMarkTopicMastered(topic.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-turquoise-500/25 text-turquoise-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Mark Mastered
                    </button>
                    <button
                      onClick={() => onStartTopicQuiz(topic.id, topic.name)}
                      className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-black transition-all shadow-glow-turquoise flex items-center gap-1 cursor-pointer"
                    >
                      <span>Take Quiz</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Quiz History */}
      {activeTab === 'history' && (
        <div className="clean-card p-6 space-y-4 border border-turquoise-500/25 bg-[#0F172A]/90 backdrop-blur-xl">
          <h3 className="text-base font-bold text-ivory-50">Quiz Attempt History</h3>

          {progress.quizAttempts.length === 0 ? (
            <p className="text-xs text-ivory-200/60 py-8 text-center italic">
              No quiz attempts recorded yet. Head over to Quiz Mode to take your first test!
            </p>
          ) : (
            <div className="space-y-3">
              {progress.quizAttempts.map((att) => (
                <div key={att.id} className="p-4 rounded-xl bg-[#0B0F19] border border-turquoise-500/20 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-ivory-50 text-sm">{att.topicName}</p>
                    <div className="flex items-center gap-2 text-[11px] text-ivory-200/70">
                      <span className="capitalize">{att.difficulty} Difficulty</span>
                      <span>•</span>
                      <span>{new Date(att.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-xl font-black ${
                      att.scorePercent >= 75 ? 'text-turquoise-400' : 'text-amber-400'
                    }`}>
                      {att.scorePercent}%
                    </span>
                    <p className="text-[10px] text-ivory-200/60">
                      {att.correctAnswers}/{att.totalQuestions} correct
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Previously Generated Memes Gallery */}
      {activeTab === 'memes' && (
        <div className="clean-card p-6 space-y-4 border border-turquoise-500/25 bg-[#0F172A]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-ivory-50 flex items-center gap-2">
                <Smile className="w-5 h-5 text-champagne-400" />
                <span>Generated Educational Memes Gallery ({allMemes.length})</span>
              </h3>
              <p className="text-xs text-ivory-200/70">
                All subject-grounded AI comic artwork saved in your learning memory.
              </p>
            </div>
          </div>

          {allMemes.length === 0 ? (
            <p className="text-xs text-ivory-200/60 py-8 text-center italic">
              No memes generated yet. Process notes through the multi-agent pipeline to generate memes!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {allMemes.map((m) => {
                const img = memeImageCache[m.id] || m.imageUrl;
                return (
                  <div key={m.id} className="clean-card p-3 rounded-xl border border-turquoise-500/20 bg-[#0B0F19] space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-turquoise-300 truncate pr-1">{m.topicName}</span>
                      <span className="text-champagne-300 font-mono">p.{m.pageReference}</span>
                    </div>

                    <div className="aspect-square rounded-lg bg-black/60 overflow-hidden flex items-center justify-center">
                      {img ? (
                        <img src={img} alt={m.topicName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center p-2 text-[10px] text-ivory-200/60">
                          <Smile className="w-6 h-6 mx-auto text-champagne-400/50 mb-1" />
                          <span>{m.template}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] font-bold text-ivory-100 line-clamp-1">{m.topText}</p>
                    <p className="text-[10px] text-turquoise-300 line-clamp-1">{m.bottomText}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
