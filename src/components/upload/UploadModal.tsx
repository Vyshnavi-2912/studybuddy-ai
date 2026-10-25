import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  ClipboardPaste,
  FileCode
} from 'lucide-react';
import { extractTextFromPdf, chunkTextIntoPages, SAMPLE_DOCUMENTS } from '../../services/pdfService';
import { DocumentNote } from '../../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentReady: (doc: DocumentNote) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onDocumentReady,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Paste text tab states
  const [pasteTitle, setPasteTitle] = useState('');
  const [pastedText, setPastedText] = useState('');

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setErrorMessage(null);
    const validExtensions = ['.pdf', '.txt', '.md', '.text'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setErrorMessage('Please upload a PDF (.pdf), Text file (.txt), or Markdown document (.md). Or use the "Paste Text" tab above!');
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      setErrorMessage('File size exceeds 30 MB limit. Please select a smaller document.');
      return;
    }
    setSelectedFile(file);
  };

  const processUploadedFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('Reading document structure & indexing pages...');

    try {
      const extracted = await extractTextFromPdf(selectedFile);
      setStatusMessage(`Extracted ${extracted.pages.length} pages (${extracted.pages.reduce((acc, p) => acc + p.wordCount, 0)} words)...`);

      // Check for empty text
      const totalWords = extracted.pages.reduce((acc, p) => acc + p.wordCount, 0);
      if (totalWords < 5) {
        throw new Error('This document does not contain readable text (it may be a scanned image or photo). You can paste your text directly using the "Paste Notes" tab above!');
      }

      const newDoc: DocumentNote = {
        id: `doc-${Date.now()}`,
        title: extracted.title,
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        pageCount: extracted.pages.length,
        uploadedAt: new Date().toISOString(),
        rawPages: extracted.pages,
        fullText: extracted.fullText,
        status: 'analyzing',
        detectedSubject: extracted.title.toLowerCase().includes('network') 
          ? 'Computer Networks'
          : extracted.title.toLowerCase().includes('system') 
            ? 'Operating Systems' 
            : 'Study Notes',
        summary: `Extracted ${extracted.pages.length} pages of study material ready for Multi-Agent AI processing.`
      };

      onDocumentReady(newDoc);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to process document.');
      setIsProcessing(false);
    }
  };

  const processPastedText = () => {
    if (!pastedText.trim() || pastedText.trim().length < 15) {
      setErrorMessage('Please paste at least a couple of sentences of notes or syllabus content.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('Processing text into structured study modules...');

    try {
      const cleanTitle = pasteTitle.trim() || 'My Study Notes';
      const pages = chunkTextIntoPages(pastedText.trim(), 300);

      const newDoc: DocumentNote = {
        id: `doc-${Date.now()}`,
        title: cleanTitle,
        fileName: `${cleanTitle.replace(/\s+/g, '_')}.txt`,
        fileSize: pastedText.length,
        pageCount: pages.length,
        uploadedAt: new Date().toISOString(),
        rawPages: pages,
        fullText: pastedText.trim(),
        status: 'analyzing',
        detectedSubject: cleanTitle.toLowerCase().includes('network') 
          ? 'Computer Networks'
          : cleanTitle.toLowerCase().includes('system') 
            ? 'Operating Systems' 
            : 'Study Notes',
        summary: `Pasted ${pages.length} section(s) of study notes ready for AI processing.`
      };

      onDocumentReady(newDoc);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not parse pasted notes.');
      setIsProcessing(false);
    }
  };

  const selectSample = (sample: DocumentNote) => {
    onDocumentReady(sample);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="clean-card w-full max-w-xl p-6 sm:p-7 relative overflow-hidden space-y-4 bg-[#0F172A] border border-turquoise-500/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4">
          {/* Header */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-turquoise-300 px-2.5 py-0.5 rounded-full bg-turquoise-950/60 border border-turquoise-500/30">
              StudyBuddy Document Ingestion
            </span>
            <h2 className="text-xl font-black text-white">Add Your Study Notes</h2>
            <p className="text-xs text-slate-400">
              Upload lecture PDFs/texts, or paste notes directly. AI will extract core topics and build study reels, process diagrams, memes, and quizzes.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/5 text-xs font-semibold">
            <button
              onClick={() => { setActiveTab('upload'); setErrorMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === 'upload'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold shadow-glow-purple'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document (.pdf, .txt, .md)</span>
            </button>
            <button
              onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === 'paste'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold shadow-glow-purple'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-amber-300" />
              <span>✍️ Paste Text / Syllabus</span>
            </button>
          </div>

          {/* TAB 1: FILE UPLOAD */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-turquoise-400 bg-turquoise-500/10'
                    : selectedFile
                      ? 'border-purple-500/50 bg-purple-500/10'
                      : 'border-white/10 hover:border-turquoise-400/50 hover:bg-white/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md,.text"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center mx-auto border border-purple-500/30">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{selectedFile.name}</p>
                      <p className="text-xs text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB • Ready for extraction</p>
                    </div>
                    <span className="inline-block text-[11px] text-turquoise-300 font-bold underline">
                      Click or drag to choose another file
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white/5 text-slate-300 flex items-center justify-center mx-auto">
                      <Upload className="w-6 h-6 text-turquoise-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        Drag & drop your study file here, or <span className="text-turquoise-400 font-bold underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Supports PDFs, Text notes (.txt), and Markdown (.md) up to 30 MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {selectedFile && !isProcessing && (
                <button
                  onClick={processUploadedFile}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-glow-purple cursor-pointer active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Process Document & Extract Topics ⚡</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 2: PASTE TEXT DIRECTLY (100% Extraction Immune) */}
          {activeTab === 'paste' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Document Title (e.g. Computer Networks Unit 2: Routing & Forwarding)"
                  value={pasteTitle}
                  onChange={(e) => setPasteTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-turquoise-400"
                />

                <textarea
                  placeholder="Paste your lecture notes, textbook paragraphs, or syllabus topics here..."
                  rows={6}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-turquoise-400 resize-none font-mono"
                />

                <p className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>💡 Paste from PDF reader, Google Docs, or slides directly.</span>
                  <span>{pastedText.trim().split(/\s+/).filter(Boolean).length} words</span>
                </p>
              </div>

              {!isProcessing && (
                <button
                  onClick={processPastedText}
                  disabled={!pastedText.trim()}
                  className={`w-full py-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 ${
                    pastedText.trim()
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-glow-purple cursor-pointer active:scale-98'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate AI Study Materials from Text ⚡</span>
                </button>
              )}
            </div>
          )}

          {/* Error Message with Quick Action */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-1.5 flex-1">
                <p className="font-bold text-rose-200">Extraction Issue</p>
                <p className="text-[11px] text-rose-300/90 leading-relaxed">{errorMessage}</p>
                {activeTab === 'upload' && (
                  <button
                    onClick={() => { setActiveTab('paste'); setErrorMessage(null); }}
                    className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-bold underline hover:text-amber-200 pt-0.5"
                  >
                    <span>👉 Click here to paste text directly instead</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3 text-xs text-cyan-300">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Pre-loaded Sample Selector */}
          <div className="pt-2 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or Try Verified Sample Modules (Instant 1-Click)
              </span>
              <span className="text-[10px] text-slate-500">No upload needed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_DOCUMENTS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => selectSample(sample)}
                  className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/5 hover:border-turquoise-400/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5 pr-2 truncate">
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-turquoise-300 truncate">
                      {sample.title}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {sample.pageCount} pages • {sample.detectedSubject}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-turquoise-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
