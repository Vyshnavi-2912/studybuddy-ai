import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  Sparkles, 
  Search, 
  Calendar, 
  Edit3, 
  ShieldCheck, 
  ChevronRight, 
  Terminal, 
  Info,
  BookOpen,
  ArrowRight,
  Play
} from 'lucide-react';
import { 
  AgentTraceStep, 
  DocumentNote, 
  GeneratedContent, 
  LearningPlan 
} from '../../types';
import { NavTab } from '../layout/Sidebar';

interface WorkflowTrackerProps {
  currentDoc: DocumentNote | null;
  content: GeneratedContent | null;
  activeSteps: AgentTraceStep[];
  currentProgressPercent: number;
  progressLabel: string;
  isProcessing: boolean;
  onRerunPipeline: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const WorkflowTracker: React.FC<WorkflowTrackerProps> = ({
  currentDoc,
  content,
  activeSteps,
  currentProgressPercent,
  progressLabel,
  isProcessing,
  onRerunPipeline,
  onNavigateTab,
}) => {
  const [selectedStep, setSelectedStep] = useState<AgentTraceStep | null>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);

  const pipelineStages = [
    {
      id: 'analyzer',
      role: 'Agent 1 — Analyzer',
      title: 'Analyzing Notes',
      desc: 'Extracts core concepts, definitions & maps source pages',
      icon: Search,
      color: 'purple',
    },
    {
      id: 'planner',
      role: 'Agent 2 — Learning Planner',
      title: 'Planning Lessons',
      desc: 'Sequences prerequisites & maps cognitive learning formats',
      icon: Calendar,
      color: 'indigo',
    },
    {
      id: 'creator',
      role: 'Agent 3 — Content Creator',
      title: 'Generating Content',
      desc: 'Crafts Reels, educational Memes, ELI5 summaries & Quizzes',
      icon: Edit3,
      color: 'cyan',
    },
    {
      id: 'validator',
      role: 'Agent 4 — Validator',
      title: 'Validating Results',
      desc: 'Cross-checks factual claims & quiz answers against source notes',
      icon: ShieldCheck,
      color: 'emerald',
    },
    {
      id: 'ready',
      role: 'System Ready',
      title: 'Ready to Learn',
      desc: 'All 4 learning modes verified and unlocked for study',
      icon: Sparkles,
      color: 'amber',
    },
  ];

  // Helper to determine status for each stage
  const getStageStatus = (stageId: string) => {
    if (!currentDoc) return 'pending';
    if (stageId === 'ready') {
      return content ? 'completed' : 'pending';
    }
    const matchingStep = activeSteps.find(s => s.agentRole === stageId);
    if (matchingStep) return matchingStep.status;
    if (content) return 'completed';
    return 'pending';
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent-cyan">
            <Sparkles className="w-4 h-4" />
            <span>Traceable Multi-Agent Pipeline</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Live AI Workflow Tracker
          </h2>
          <p className="text-xs text-slate-400">
            {currentDoc 
              ? `Processing: "${currentDoc.title}" (${currentDoc.pageCount} pages)` 
              : 'Select or upload a document to observe the 4-agent coordination in real time.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {content && (
            <button
              onClick={() => setShowPlanModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-200 text-xs font-semibold transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 text-accent-violetLight" />
              <span>Inspect Learning Plan</span>
            </button>
          )}

          <button
            onClick={onRerunPipeline}
            disabled={isProcessing || !currentDoc}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-40 border border-white/10 text-slate-200 text-xs font-medium transition-all"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>Re-run Pipeline</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Status Text */}
      <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-200 flex items-center gap-2">
            {isProcessing && <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
            {progressLabel || (content ? 'Pipeline complete. All artifacts validated.' : 'Waiting for document...')}
          </span>
          <span className="font-bold text-accent-cyan">{currentProgressPercent}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${currentProgressPercent}%` }}
          />
        </div>
      </div>

      {/* 5-Stage Stepper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {pipelineStages.map((stage, idx) => {
          const status = getStageStatus(stage.id);
          const Icon = stage.icon;
          const matchingStep = activeSteps.find(s => s.agentRole === stage.id);

          return (
            <div
              key={stage.id}
              onClick={() => matchingStep && setSelectedStep(matchingStep)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                status === 'completed'
                  ? 'bg-purple-950/30 border-purple-500/40 hover:border-purple-500/60 shadow-sm'
                  : status === 'running'
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-glow-cyan shimmer-bg'
                    : status === 'retrying'
                      ? 'bg-amber-950/30 border-amber-500/40'
                      : 'bg-white/5 border-white/5 opacity-60 hover:opacity-80'
              }`}
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Step {idx + 1}
                </span>
                {status === 'completed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : status === 'running' ? (
                  <Clock className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : status === 'retrying' ? (
                  <RotateCcw className="w-4 h-4 text-amber-400 animate-spin" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-white/20" />
                )}
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-accent-violetLight shrink-0" />
                  <span>{stage.title}</span>
                </h4>
                <p className="text-[10px] text-slate-400 leading-snug line-clamp-2">
                  {stage.desc}
                </p>
              </div>

              {/* Inspect hint */}
              {matchingStep && (
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-accent-cyan font-medium">
                  <span>View Trace Logs</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Report Highlights (Agent 4) */}
      {content?.validation && (
        <div className="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Agent 4 Audit Report</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {content.validation.status.toUpperCase()}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Factual consistency score: <strong className="text-emerald-400">{content.validation.overallScore}%</strong> • {content.validation.retryCount > 0 ? `${content.validation.retryCount} targeted regenerations executed` : 'Zero retries required'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('quiz')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-glow-violet transition-all shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Verified Quiz</span>
            </button>
          </div>

          {/* Validation Checks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {content.validation.checks.map((chk, i) => (
              <div 
                key={i}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5 text-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">{chk.checkName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{chk.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Trace Logs Console */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 bg-navy-900/90 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300">
            <Terminal className="w-4 h-4 text-accent-cyan" />
            <span>Agent Orchestration Event Stream</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            {activeSteps.length} Agents reporting
          </span>
        </div>

        <div className="p-4 font-mono text-xs space-y-2 max-h-60 overflow-y-auto bg-black/40">
          {activeSteps.flatMap(s => s.logs.map(logMsg => ({ step: s, msg: logMsg }))).length === 0 ? (
            <p className="text-slate-500 text-center py-4">Waiting for pipeline execution...</p>
          ) : (
            activeSteps.flatMap((s, idx) => 
              s.logs.map((logMsg, lIdx) => (
                <div key={`${idx}-${lIdx}`} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-purple-400 shrink-0">[{s.agentRole.toUpperCase()}]</span>
                  <span className="text-slate-300">{logMsg}</span>
                </div>
              ))
            )
          )}
        </div>
      </div>

      {/* Trace Inspector Modal / Drawer */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent-cyan tracking-wider">
                  {selectedStep.agentName}
                </span>
                <h3 className="text-base font-bold text-white">{selectedStep.title}</h3>
              </div>
              <button
                onClick={() => setSelectedStep(null)}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-slate-300"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 space-y-1">
                <span className="font-semibold text-slate-400 block">Input State:</span>
                <p className="text-slate-200">{selectedStep.inputSummary}</p>
              </div>

              <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 space-y-1">
                <span className="font-semibold text-purple-300 block">Agent Execution Summary:</span>
                <p className="text-slate-200">{selectedStep.outputSummary}</p>
              </div>

              <div className="space-y-1.5">
                <span className="font-semibold text-slate-400 block font-mono">Agent Trace Logs:</span>
                <div className="p-3 rounded-xl bg-black/50 font-mono text-[11px] space-y-1 text-slate-300 max-h-48 overflow-y-auto">
                  {selectedStep.logs.map((l, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-slate-500">•</span>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Plan Modal (View before starting) */}
      {showPlanModal && content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/10 shadow-2xl p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-accent-violet tracking-wider">
                  Curriculum Architecture
                </span>
                <h3 className="text-base font-bold text-white">{content.plan.title}</h3>
                <p className="text-xs text-slate-400">
                  Total study time: ~{content.plan.totalEstimatedMinutes} mins • {content.plan.modules.length} bite-sized modules
                </p>
              </div>
              <button
                onClick={() => setShowPlanModal(false)}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-xs text-slate-300"
              >
                Close
              </button>
            </div>

            <div className="space-y-2.5">
              {content.plan.modules.map((mod) => (
                <div 
                  key={mod.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 text-[10px] font-bold flex items-center justify-center">
                        {mod.order}
                      </span>
                      <h4 className="font-bold text-white text-sm">{mod.topicName}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold capitalize border border-purple-500/30">
                        {mod.recommendedMode} Mode
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs pl-7">{mod.targetOutcome}</p>
                    <p className="text-[11px] text-slate-400 pl-7 italic">Rationale: {mod.reasonForMode}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowPlanModal(false);
                      onNavigateTab(mod.recommendedMode === 'quiz' ? 'quiz' : 'learn');
                    }}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setShowPlanModal(false);
                  onNavigateTab('learn');
                }}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                Start Learning Pathway
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
