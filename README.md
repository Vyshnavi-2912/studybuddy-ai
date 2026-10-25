# StudyBuddy AI — Turn Your Notes Into an Experience 🎓✨

**Tagline:** *Turn Your Notes Into an Experience.*

StudyBuddy AI transforms uploaded study materials into interactive, personalized learning experiences using a lightweight, traceable multi-agent AI workflow.

---

## 🌟 Key Features

1. **Premium Modern UI**:
   - Midnight navy and deep purple theme with subtle violet and cyan glowing accents.
   - Polished glassmorphism cards, responsive navigation, and clean typography.
2. **Dashboard**:
   - Welcome banner: *"Learn Smarter, Not Harder."*
   - Upload Notes button with drag & drop PDF parsing.
   - Instant 1-Click sample notes (*Computer Networks: OSI Model*, *Operating Systems: Concurrency & Virtual Memory*).
   - Continue Learning card with next recommended module.
   - 4 Learning Modes cards (Reel, Meme, Simple, Quiz).
   - Real-time progress metrics: lessons completed, quiz accuracy, topics mastered, and weak topics.
3. **Traceable 4-Agent Multi-Agent Workflow**:
   - **Agent 1 — Analyzer**: Extracts topics, definitions, core mechanisms, and preserves source page numbers.
   - **Agent 2 — Learning Planner**: Organizes pedagogical prerequisite order and maps cognitive learning formats.
   - **Agent 3 — Content Creator**: Crafts Reel cards, educational Memes, ELI5 lessons, and active recall Quizzes.
   - **Agent 4 — Validator**: Verifies all claims and quiz answers against raw source text, flags inaccuracies, and triggers targeted regeneration.
4. **Live Workflow Tracker**:
   - 5-stage animated stepper: Analyzing -> Planning -> Generating -> Validating -> Ready.
   - Live agent log stream and clickable Trace Inspector drawer.
   - Viewable and customizable Learning Plan before studying.
5. **Interactive Learning Studio (4 Modes)**:
   - **Reel Mode (Upgraded with Images & Educational Videos)**:
     - **Visual Concept Cards**: High-definition architectural schematics and vector diagrams matching the extracted topic (e.g., 7 OSI Layers, TCP 3-Way Handshake, Coffman Deadlock graphs, TLB Paging, IoT edge architectures, and Neural Networks).
     - **Educational Video Cards**: In-app embedded educational video clips from trusted channels (NetworkChuck, Computerphile, CrashCourse, Fireship, 3Blue1Brown) with channel attribution, duration, and key bullet points.
     - **Card Filtering**: Easily switch between *All Cards*, *Diagrams Only*, and *Videos Only*.
     - **Audio Narration**: Listen to explanations with Web Speech API integration.
     - **Clean & Distraction-Free**: Purely educational, without distracting social media spam.
   - **Meme Mode**: Educational memes (Galaxy Brain, Drake, Spider-Man, This is Fine) with humorous yet accurate breakdowns and memory anchors.
   - **Simple Mode**: Feynman ELI5 explanations, key terms glossary pills, step-by-step intuition, and exam pitfall alerts.
   - **Quiz Mode**: Active recall 4-option MCQs with topic-only setup, instant source citations, streak counter, celebratory confetti, and automatic weak topic tagging.
6. **Personalized Learning Memory & Revision**:
   - Persistent storage for completed lessons, quiz scores, accuracy %, and study streaks.
   - Targeted Revision Center specifically focuses on weak topics to prevent wasted study time.
7. **AI Tutor ("Ask Your Notes")**:
   - Chat interface strictly grounded in uploaded notes with exact page citations.
   - Out-of-scope warnings prevent hallucinations.
8. **Progress & Final Study Report**:
   - Summary of study session metrics.
   - Printable report view and downloadable standalone HTML study report certificate.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Configuration & AI Backends

- **Intelligent Local Engine (Default)**: Runs completely out-of-the-box with zero configuration or API keys required. It parses uploaded PDF notes, extracts key concepts, generates all 4 study modes, and runs live Agent 4 validation checks.
- **Google Gemini API (Optional)**: Click the **Settings** gear icon in the top header and enter your Google Gemini API key to activate live LLM multi-agent calls.
- **Supabase (Optional)**: Configure your Supabase project URL and Anon key in the Settings modal to enable cloud synchronization.
