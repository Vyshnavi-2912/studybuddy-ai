import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  ShieldCheck,
  Check,
  FileText
} from 'lucide-react';
import { 
  DocumentNote, 
  TopicConcept, 
  QuizQuestion, 
  QuizAttempt, 
  QuizMistake, 
  UserLearningProgress, 
  QuizConfig, 
  QuizDifficulty 
} from '../../types';
import { generateTopicSpecificQuiz } from '../../services/quizService';

interface QuizStudioProps {
  document: DocumentNote | null;
  topics: TopicConcept[];
  progress: UserLearningProgress;
  apiKey?: string;
  initialTopicId?: string;
  onRecordQuizAttempt: (attempt: QuizAttempt) => void;
  onNavigateRevision: () => void;
  onOpenUpload: () => void;
}

export const QuizStudio: React.FC<QuizStudioProps> = ({
  document,
  topics,
  progress,
  apiKey,
  initialTopicId = 'all',
  onRecordQuizAttempt,
  onNavigateRevision,
  onOpenUpload,
}) => {
  // Screen state: 'setup' | 'active' | 'results'
  const [screen, setScreen] = useState<'setup' | 'active' | 'results'>('setup');

  // Setup configuration state
  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  // Active quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIndex: number]: number }>({});
  const [activeTopicName, setActiveTopicName] = useState('All Topics');

  // Results state
  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);

  // Sync initial topic selection
  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  if (!document) {
    return (
      <div className="clean-card p-12 text-center max-w-lg mx-auto space-y-4 bg-[#0F172A]/80 border-turquoise-500/20 shadow-glow-purple">
        <HelpCircle className="w-12 h-12 mx-auto text-turquoise-400" />
        <h3 className="text-lg font-bold text-ivory-50">No Notes Available for Quiz</h3>
        <p className="text-xs text-ivory-200/70">
          Upload a study document to extract topics and take a topic-filtered quiz.
        </p>
        <button
          onClick={onOpenUpload}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-glow-turquoise transition-all cursor-pointer"
        >
          Upload Your Notes
        </button>
      </div>
    );
  }

  // 1. START QUIZ HANDLER
  const handleStartQuiz = async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setInfoMessage(null);

    const activeTopic = topics.find(t => t.id === selectedTopicId);
    const config: QuizConfig = {
      topicId: selectedTopicId,
      topicName: activeTopic ? activeTopic.name : 'All Extracted Topics',
      difficulty,
      questionCount,
    };

    try {
      const result = await generateTopicSpecificQuiz(document, topics, config, apiKey);
      const generatedQuestions = result.questions;

      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error('No quiz questions could be formulated for this selection. Try selecting All Topics or a different difficulty.');
      }

      if (result.infoMessage) {
        setInfoMessage(result.infoMessage);
      } else if (generatedQuestions.length < questionCount) {
        setInfoMessage(`Generated ${generatedQuestions.length} factually verified questions available from the uploaded material.`);
      }

      setActiveTopicName(result.topicName || (activeTopic ? activeTopic.name : 'All Extracted Topics'));

      setQuizQuestions(generatedQuestions);
      setCurrentIdx(0);
      setSelectedAnswers({});
      setScreen('active');
    } catch (err: any) {
      setGenerationError(err.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const currentQ = quizQuestions[currentIdx];

  // SUBMIT QUIZ HANDLER
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const mistakes: QuizMistake[] = [];

    quizQuestions.forEach((q, idx) => {
      const chosen = selectedAnswers[idx];
      if (chosen === q.correctIndex) {
        correctCount++;
      } else {
        mistakes.push({
          questionId: q.id,
          topicId: q.topicId,
          topicName: q.topicName,
          questionText: q.question,
          chosenAnswer: chosen !== undefined ? q.options[chosen] : 'Unanswered',
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanation,
          sourcePage: q.pageReference,
        });
      }
    });

    const scorePercent = Math.round((correctCount / quizQuestions.length) * 100);

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      documentId: document.id,
      documentTitle: document.title,
      topicId: selectedTopicId,
      topicName: activeTopicName,
      difficulty,
      timestamp: new Date().toISOString(),
      totalQuestions: quizQuestions.length,
      correctAnswers: correctCount,
      scorePercent,
      mistakes,
    };

    setCompletedAttempt(attempt);
    onRecordQuizAttempt(attempt);
    setScreen('results');

    if (scorePercent >= 75) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00E5C8', '#F7D070', '#10B981']
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setScreen('active');
  };

  const handleNewSetup = () => {
    setScreen('setup');
    setSelectedAnswers({});
    setCurrentIdx(0);
  };

  // -------------------------------------------------------------
  // VIEW: SETUP SCREEN
  // -------------------------------------------------------------
  if (screen === 'setup') {
    return (
      <div className="max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="clean-card p-6 sm:p-7 space-y-2 text-center sm:text-left border border-turquoise-500/25 bg-[#0F172A]/90 backdrop-blur-xl shadow-glow-purple">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-turquoise-300 px-2.5 py-0.5 rounded-full bg-slate-900 border border-turquoise-400/30">
              Topic-Grounded Quiz
            </span>
            <span className="text-xs text-champagne-300/80 font-mono">
              {topics.length} topics available
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-ivory-50 tracking-tight">
            Configure Your Practice Quiz
          </h2>
          <p className="text-xs text-ivory-200/80 leading-relaxed">
            Select a specific topic extracted from <strong className="text-champagne-300">{document.title}</strong> to test only relevant material.
          </p>
        </div>

        {/* Setup Controls Form */}
        <div className="clean-card p-6 sm:p-7 space-y-5 border border-turquoise-500/25 bg-[#0F172A]/80 backdrop-blur-md">
          
          {/* 1. Choose Topic */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ivory-100 block">
              1. Choose Topic
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="w-full bg-[#0B0F19] border border-turquoise-500/30 focus:border-turquoise-400 focus:ring-1 focus:ring-turquoise-400 rounded-xl px-4 py-3 text-xs text-ivory-50 outline-none transition-all cursor-pointer"
            >
              <option value="all">All Topics (Full Document Coverage)</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} (Page {t.pageReference})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-ivory-200/60">
              Questions will be formulated strictly from the selected topic's source material.
            </p>
          </div>

          {/* 2. Difficulty */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ivory-100 block">
              2. Select Difficulty
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['easy', 'medium', 'hard'] as QuizDifficulty[]).map((level) => {
                const isSelected = difficulty === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-2.5 rounded-xl text-xs font-bold capitalize transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-turquoise-500 to-emerald-600 text-white font-black shadow-glow-purple border-purple-400'
                        : 'bg-slate-900/60 border-white/[0.06] text-ivory-200/70 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Number of Questions */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ivory-100 block">
              3. Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map((count) => {
                const isSelected = questionCount === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-champagne-400 to-amber-500 text-white font-black shadow-glow-gold border-amber-400'
                        : 'bg-slate-900/60 border-white/[0.06] text-ivory-200/70 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {count} Questions
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message if Generation Fails */}
          {generationError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{generationError}</span>
            </div>
          )}

          {/* Start Quiz Action */}
          <button
            onClick={handleStartQuiz}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 disabled:opacity-40 text-white font-black text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-glow-turquoise cursor-pointer active:scale-98"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Formulating Grounded Questions...</span>
              </>
            ) : (
              <>
                <span>Start Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: ACTIVE QUIZ SCREEN
  // -------------------------------------------------------------
  if (screen === 'active') {
    if (!currentQ) return null;

    const selectedOption = selectedAnswers[currentIdx];
    const isAnswered = selectedOption !== undefined;
    const isLastQuestion = currentIdx === quizQuestions.length - 1;

    return (
      <div className="max-w-2xl mx-auto space-y-4 animate-in fade-in duration-300">
        
        {/* Info Banner if material limited question count */}
        {infoMessage && (
          <div className="p-3 rounded-xl bg-turquoise-500/15 border border-turquoise-400/30 text-xs text-turquoise-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-turquoise-400 shrink-0" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Top Progress & Header */}
        <div className="clean-card p-4 space-y-3 border border-turquoise-500/25 bg-[#0F172A]/90 backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-ivory-50">
              Question {currentIdx + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-turquoise-300 font-semibold truncate max-w-[200px]">
                {currentQ.topicName}
              </span>
              <span className="text-[10px] text-champagne-300 font-mono px-2 py-0.5 rounded bg-slate-900 border border-champagne-400/30">
                Page {currentQ.pageReference}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-turquoise-500/20">
            <div 
              className="bg-gradient-to-r from-turquoise-400 to-champagne-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question & 4 Options Card */}
        <div className="clean-card p-6 sm:p-7 space-y-5 border border-turquoise-500/25 bg-[#0F172A]/90 backdrop-blur-xl shadow-glow-purple">
          
          <h3 className="text-base sm:text-lg font-black text-ivory-50 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* 4 Neatly Arranged Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-turquoise-500/20 border-turquoise-400 text-ivory-50 font-bold shadow-glow-turquoise'
                      : 'bg-[#0B0F19]/80 border-white/[0.06] text-ivory-200/80 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 ${
                    isSelected 
                      ? 'border-purple-400 bg-purple-500 text-white' 
                      : 'border-emerald-700/60 text-ivory-200/60'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="pt-2 border-t border-turquoise-500/15 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 disabled:opacity-30 text-ivory-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/[0.06]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Question Quick-Jumper Ticks */}
            <div className="hidden sm:flex items-center gap-1.5">
              {quizQuestions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-6 h-6 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    i === currentIdx
                      ? 'bg-purple-500 text-white font-black'
                      : selectedAnswers[i] !== undefined
                        ? 'bg-slate-900 text-turquoise-300 border border-turquoise-500/30'
                        : 'bg-slate-900/40 text-ivory-200/40'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {isLastQuestion ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={!isAnswered}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-turquoise-500 to-emerald-600 hover:from-turquoise-400 hover:to-emerald-500 disabled:opacity-40 text-white text-xs font-black transition-all shadow-glow-turquoise cursor-pointer"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-black transition-all shadow-glow-turquoise flex items-center gap-1.5 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: QUIZ RESULTS SCREEN
  // -------------------------------------------------------------
  if (screen === 'results' && completedAttempt) {
    const isPassing = completedAttempt.scorePercent >= 75;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Results Summary Card */}
        <div className="clean-card p-6 sm:p-8 text-center space-y-4 border border-turquoise-500/25 bg-[#0F172A]/95 backdrop-blur-xl shadow-glow-purple">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-turquoise-500 to-champagne-400 text-white flex items-center justify-center mx-auto shadow-glow-gold animate-bounce">
            <Award className="w-8 h-8 text-white" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-ivory-50">Quiz Completed</h2>
            <p className="text-xs text-ivory-200/70">
              Topic: <strong className="text-champagne-300">{completedAttempt.topicName}</strong> • {document.title}
            </p>
          </div>

          {/* Big Score Number */}
          <div className="py-2">
            <span className="text-4xl sm:text-6xl font-black text-brand-gradient">
              {completedAttempt.scorePercent}%
            </span>
            <p className="text-xs text-ivory-200/70 mt-1">
              {completedAttempt.correctAnswers} of {completedAttempt.totalQuestions} questions answered correctly
            </p>
          </div>

          {/* Feedback pill */}
          <div className={`p-3 rounded-xl text-xs font-bold max-w-md mx-auto border ${
            isPassing 
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40 shadow-glow-purple' 
              : 'bg-amber-500/15 text-amber-300 border-amber-400/40'
          }`}>
            {isPassing
              ? '✨ Excellent mastery! Your conceptual intuition on this topic is solid.'
              : '💡 Review the explanations below to turn these concepts into pure intuition.'}
          </div>

          {/* Actions: Try Again, Revise Weak Topics, New Setup */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleTryAgain}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-turquoise-500/25 text-ivory-100 text-xs font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-turquoise-400" />
              <span>Try Again</span>
            </button>

            {completedAttempt.mistakes.length > 0 && (
              <button
                onClick={onNavigateRevision}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Revise Weak Topics ({completedAttempt.mistakes.length})</span>
              </button>
            )}

            <button
              onClick={handleNewSetup}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white text-xs font-black transition-all shadow-glow-turquoise cursor-pointer"
            >
              <span>Setup New Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-champagne-400 uppercase tracking-wider px-1">
            Question Review & Grounded Explanations
          </h3>

          <div className="space-y-3">
            {quizQuestions.map((q, idx) => {
              const chosen = selectedAnswers[idx];
              const isCorrect = chosen === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className={`clean-card p-4 sm:p-5 space-y-3 border ${
                    isCorrect ? 'border-emerald-500/30 bg-[#0F172A]/80' : 'border-rose-500/40 bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-ivory-100">
                      Question {idx + 1}
                    </span>
                    <span className="text-[10px] text-champagne-300 font-mono px-2 py-0.5 rounded bg-slate-900 border border-champagne-400/25">
                      Page {q.pageReference} Citation
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-ivory-50 leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-1 text-xs pt-1">
                    <p className={`font-semibold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isCorrect ? '✅ Your answer: ' : '❌ Your answer: '}
                      {chosen !== undefined ? q.options[chosen] : 'Skipped'}
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-400 font-semibold">
                        ✅ Correct answer: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>

                  {/* Grounded Explanation */}
                  <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-turquoise-500/15 space-y-1 text-xs text-ivory-200">
                    <span className="text-[10px] font-bold text-turquoise-400 uppercase tracking-wider block">
                      Source Explanation (from Page {q.pageReference}):
                    </span>
                    <p className="leading-relaxed text-[11px] font-mono">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  }

  return null;
};
