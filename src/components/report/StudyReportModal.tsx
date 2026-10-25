import React from 'react';
import { 
  Award, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  FileText,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { DocumentNote, GeneratedContent, UserLearningProgress } from '../../types';

interface StudyReportModalProps {
  currentDoc: DocumentNote | null;
  content: GeneratedContent | null;
  progress: UserLearningProgress;
}

export const StudyReportView: React.FC<StudyReportModalProps> = ({
  currentDoc,
  content,
  progress,
}) => {
  const totalQuizAttempts = progress.quizAttempts.length;
  const avgQuizAccuracy = totalQuizAttempts > 0
    ? Math.round(progress.quizAttempts.reduce((acc, a) => acc + a.scorePercent, 0) / totalQuizAttempts)
    : 85;

  const masteredTopics = content?.topics.filter(t => progress.masteredTopicIds.includes(t.id)) || [];
  const weakTopics = content?.topics.filter(t => progress.weakTopicIds.includes(t.id)) || [];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>StudyBuddy AI — Study Report for ${currentDoc?.title || 'Notes'}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1e293b; }
          h1 { color: #4338ca; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
          .stats { display: flex; gap: 20px; margin: 20px 0; }
          .stat-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 15px; border-radius: 8px; flex: 1; }
          .stat-value { font-size: 24px; font-weight: bold; color: #3b82f6; }
          .section { margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 14px; }
          th { background: #f1f5f9; }
          .badge-mastered { color: #166534; font-weight: bold; }
          .badge-weak { color: #991b1b; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>StudyBuddy AI — Comprehensive Study Report</h1>
        <p><strong>Document:</strong> ${currentDoc?.title || 'General Study Session'}</p>
        <p><strong>Date Generated:</strong> ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
        
        <div class="stats">
          <div class="stat-box"><div class="stat-value">${progress.totalStudyMinutes} mins</div>Total Study Time</div>
          <div class="stat-box"><div class="stat-value">${progress.completedLessonIds.length}</div>Lessons Completed</div>
          <div class="stat-box"><div class="stat-value">${avgQuizAccuracy}%</div>Quiz Accuracy</div>
          <div class="stat-box"><div class="stat-value">${progress.studyStreakDays} Days</div>Learning Streak</div>
        </div>

        <div class="section">
          <h2>Topic Mastery & Retention Audit</h2>
          <table>
            <thead>
              <tr><th>Topic Concept</th><th>Source Page</th><th>Mastery Status</th></tr>
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

        <div class="section">
          <h2>Next Recommended Steps</h2>
          <ul>
            <li>Review the ${weakTopics.length} flagged revision topics in Simple Mode.</li>
            <li>Take another 5-question active recall quiz to verify long-term retention.</li>
          </ul>
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
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Print Actions */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold">
            <Award className="w-3.5 h-3.5 text-accent-violet" />
            <span>Academic Performance Record</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Study Progress & Final Report</h2>
          <p className="text-xs text-slate-400">
            Document: {currentDoc?.title || 'Active Session'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-violet transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download HTML Report</span>
          </button>
        </div>
      </div>

      {/* Actual Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Study Session Time</span>
          <p className="text-2xl font-bold text-white">{progress.totalStudyMinutes} min</p>
          <span className="text-[10px] text-slate-500">Active engagement</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Lessons Completed</span>
          <p className="text-2xl font-bold text-purple-400">{progress.completedLessonIds.length}</p>
          <span className="text-[10px] text-slate-500">Modules finished</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Quiz Recall Accuracy</span>
          <p className="text-2xl font-bold text-cyan-400">{avgQuizAccuracy}%</p>
          <span className="text-[10px] text-slate-500">{totalQuizAttempts} attempts</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-white/5 space-y-1">
          <span className="text-[11px] text-slate-400 font-medium">Learning Streak</span>
          <p className="text-2xl font-bold text-orange-400">{progress.studyStreakDays} Days</p>
          <span className="text-[10px] text-slate-500">Consistent study</span>
        </div>
      </div>

      {/* Topic Concepts Breakdown Table */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Concepts Learned & Mastery Breakdown</span>
          </h3>
          <span className="text-xs text-slate-400">
            {content?.topics.length || 0} Core Topics
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Concept Name</th>
                <th className="pb-3 font-semibold">Source Page</th>
                <th className="pb-3 font-semibold">Definition</th>
                <th className="pb-3 text-right font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(content?.topics || []).map((topic) => {
                const isWeak = progress.weakTopicIds.includes(topic.id);
                const isMaster = progress.masteredTopicIds.includes(topic.id);

                return (
                  <tr key={topic.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-slate-200 max-w-[160px] truncate">
                      {topic.name}
                    </td>
                    <td className="py-3 text-slate-400 font-mono">
                      Page {topic.pageReference}
                    </td>
                    <td className="py-3 text-slate-300 max-w-sm">
                      <p className="line-clamp-2">{topic.definition}</p>
                    </td>
                    <td className="py-3 text-right">
                      {isWeak ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold text-[10px]">
                          <AlertTriangle className="w-2.5 h-2.5" />
                          Needs Revision
                        </span>
                      ) : isMaster ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-[10px]">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Mastered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-semibold text-[10px]">
                          In Progress
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Recommended Next Actions</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="font-semibold text-purple-300">1. Target Weak Areas</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              You have {weakTopics.length} concepts marked for revision. Launch the Targeted Revision center to clear them.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="font-semibold text-cyan-300">2. Re-test Active Recall</span>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Complete a second quiz attempt tomorrow to engage spaced repetition and lock in memory retention.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
