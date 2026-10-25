// ==========================================
// StudyBuddy AI — Core TypeScript Definitions
// ==========================================

export type NavTab = 'home' | 'notes' | 'reel' | 'meme' | 'quiz' | 'progress' | 'learn';

export interface UserProfile {
  name: string;
  gender?: 'male' | 'female' | 'unspecified';
  onboarded: boolean;
  welcomeMessage?: string;
  createdAt: string;
}

export interface DiagramBlock {
  id: string;
  label: string;
  subtitle?: string;
  category: 'input' | 'process' | 'storage' | 'output' | 'control';
  details?: string[];
}

export interface DiagramConnection {
  fromId: string;
  toId: string;
  label?: string;
  direction?: 'forward' | 'bidirectional';
}

export interface TopicBlockDiagram {
  topicId: string;
  topicName: string;
  title: string;
  description: string;
  blocks: DiagramBlock[];
  connections: DiagramConnection[];
  svgMarkup?: string;
}

export type LearningMode = 'reel' | 'meme' | 'simple' | 'quiz';

export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizConfig {
  topicId: string; // 'all' or specific topic id
  topicName: string;
  difficulty: QuizDifficulty;
  questionCount: number; // 5, 10, or 15
}

export interface PageContent {
  pageNumber: number;
  text: string;
  charCount: number;
  wordCount: number;
}

export interface DocumentNote {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  pageCount: number;
  uploadedAt: string;
  rawPages: PageContent[];
  fullText: string;
  status: 'idle' | 'analyzing' | 'planning' | 'generating' | 'validating' | 'ready' | 'error';
  errorMessage?: string;
  summary?: string;
  detectedSubject?: string;
}

export interface TopicConcept {
  id: string;
  name: string;
  pageReference: number;
  importance: 'high' | 'medium' | 'foundational';
  definition: string;
  keyPoints: string[];
  examples: string[];
  formulaOrCode?: string;
  prerequisites?: string[];
}

export interface LearningModule {
  id: string;
  topicId: string;
  topicName: string;
  order: number;
  recommendedMode: LearningMode;
  reasonForMode: string;
  prerequisites: string[];
  targetOutcome: string;
  estimatedMinutes: number;
}

export interface LearningPlan {
  id: string;
  documentId: string;
  title: string;
  totalEstimatedMinutes: number;
  targetMastery: string;
  modules: LearningModule[];
  createdAt: string;
}

export type ReelCardType = 'concept-image' | 'educational-video';

export interface ReelMedia {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  title?: string;
  caption: string;
  altText?: string;
  sourceCredit?: string;
  duration?: string;
  youtubeId?: string;
  channelTitle?: string;
  diagramSvg?: string;
}

export interface ReelCard {
  id: string;
  topicId: string;
  topicName: string;
  pageReference: number;
  cardType: ReelCardType;
  hook: string;
  coreIdea: string;
  bulletPoints: string[];
  realWorldAnalogy: string;
  quickTakeaway: string;
  codeOrFormula?: string;
  tags: string[];
  media?: ReelMedia;
}

export type MemeTemplate = 
  | 'galaxy-brain'
  | 'distracted-boyfriend'
  | 'drake-hotline'
  | 'this-is-fine'
  | 'spiderman-pointing'
  | 'expectation-vs-reality'
  | 'two-buttons';

export interface EducationalVideo {
  youtubeId: string;
  title: string;
  channelTitle: string;
  duration: string;
  thumbnailUrl: string;
  embedUrl: string;
  caption?: string;
  description?: string;
  relevanceScore?: number;
}

export interface MemeCard {
  id: string;
  topicId: string;
  topicName: string;
  pageReference: number;
  template: MemeTemplate;
  topText: string;
  bottomText: string;
  visualDesc: string;
  whyItsFunnyAndTrue: string;
  educationalConcept: string;
  memoryAnchor: string;
  reactionCount?: number;
  imageUrl?: string;
  imagePrompt?: string;
  isGeneratingImage?: boolean;
  imageError?: string;
}

export interface SimpleLesson {
  id: string;
  topicId: string;
  topicName: string;
  pageReference: number;
  title: string;
  eli5Explanation: string;
  keyDefinitions: { term: string; meaning: string }[];
  stepByStepBreakdown: string[];
  realLifeExample: string;
  commonMisconceptions: string;
  quickSummary: string;
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  topicName: string;
  pageReference: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceQuote: string;
  difficulty: QuizDifficulty;
}

export interface ValidationCheck {
  checkName: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
  sourcePageChecked?: number;
}

export interface ValidationFlag {
  type: 'unsupported_claim' | 'misleading_quiz_option' | 'page_mismatch';
  itemDescription: string;
  resolution: string;
}

export interface ValidationReport {
  isValid: boolean;
  overallScore: number; // 0-100%
  checks: ValidationCheck[];
  flags: ValidationFlag[];
  retryCount: number;
  status: 'verified' | 'regenerated_and_verified' | 'flagged';
  timestamp: string;
}

export interface GeneratedContent {
  documentId: string;
  topics: TopicConcept[];
  plan: LearningPlan;
  reels: ReelCard[];
  memes: MemeCard[];
  simpleLessons: SimpleLesson[];
  quizzes: QuizQuestion[];
  validation: ValidationReport;
}

export type AgentRole = 'analyzer' | 'planner' | 'creator' | 'validator';

export interface AgentTraceStep {
  id: string;
  agentRole: AgentRole;
  agentName: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'retrying';
  startedAt?: string;
  completedAt?: string;
  durationMs?: number;
  inputSummary: string;
  outputSummary: string;
  details?: Record<string, any>;
  logs: string[];
}

export interface QuizMistake {
  questionId: string;
  topicId: string;
  topicName: string;
  questionText: string;
  chosenAnswer: string;
  correctAnswer: string;
  explanation: string;
  sourcePage: number;
}

export interface QuizAttempt {
  id: string;
  documentId: string;
  documentTitle: string;
  topicId?: string;
  topicName: string;
  difficulty: QuizDifficulty;
  timestamp: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  mistakes: QuizMistake[];
}

export interface UserLearningProgress {
  completedLessonIds: string[];
  quizAttempts: QuizAttempt[];
  masteredTopicIds: string[];
  weakTopicIds: string[]; // Needs revision
  studyStreakDays: number;
  totalStudyMinutes: number;
  lastStudiedAt?: string;
  savedMemes: string[];
  bookmarkedReels: string[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  pageCitations?: { pageNumber: number; quote?: string }[];
  isWarning?: boolean;
}

export interface AppSettings {
  geminiApiKey: string;
  youtubeApiKey?: string;
  openaiApiKey?: string;
  model: string;
  useLocalFallback: boolean;
  speechVoiceRate: number;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}
