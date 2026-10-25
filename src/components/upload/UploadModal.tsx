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
  BookOpen
} from 'lucide-react';
import { extractTextFromPdf, SAMPLE_DOCUMENTS } from '../../services/pdfService';
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
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a valid PDF document (.pdf). Currently text-based PDF lecture notes and slides are supported.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds 25 MB limit. Please select a smaller PDF.');
      return;
    }
    setSelectedFile(file);
  };

  const processUploadedFile = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage('Reading PDF structure & indexing pages...');

    try {
      const extracted = await extractTextFromPdf(selectedFile);
      setStatusMessage(`Extracted ${extracted.pages.length} pages (${extracted.pages.reduce((acc, p) => acc + p.wordCount, 0)} words)...`);

      // Check for empty or unreadable text
      const totalWords = extracted.pages.reduce((acc, p) => acc + p.wordCount, 0);
      if (totalWords < 20) {
        throw new Error('This PDF appears to contain mostly scanned images or lacks selectable text. Please upload a text-based PDF or select one of our rich sample notes below.');
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
      setErrorMessage(err.message || 'Failed to process PDF.');
      setIsProcessing(false);
    }
  };

  const selectSample = (sample: DocumentNote) => {
    onDocumentReady(sample);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="clean-card w-full max-w-xl p-6 sm:p-7 relative overflow-hidden space-y-5 bg-[#121829] shadow-2xl"
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-500/20">
              PDF Upload & Ingestion
            </span>
            <h2 className="text-xl font-bold text-white">Upload Your Study Notes</h2>
            <p className="text-xs text-slate-400">
              Upload your lecture slides or study PDFs. StudyBuddy AI will extract real topics and preserve page citations.
            </p>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-cyan-400 bg-cyan-500/10'
                : selectedFile
                  ? 'border-purple-500/50 bg-purple-500/10'
                  : 'border-purple-500/20 hover:border-purple-400/50 hover:bg-white/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
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
                  <p className="text-xs text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB • PDF Document</p>
                </div>
                <span className="inline-block text-[11px] text-cyan-300 font-bold underline">
                  Click or drag to choose another file
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-white/5 text-slate-300 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-200">
                    Drag & drop your study PDF here, or <span className="text-purple-400 font-bold underline">browse</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Supports text-based PDFs up to 25 MB (Syllabus, Lecture Slides, Summaries)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">Extraction Issue</p>
                <p className="text-[11px] text-rose-300/90 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Processing State */}
          {isProcessing && (
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3 text-xs text-cyan-300">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Action Button */}
          {selectedFile && !isProcessing && (
            <button
              onClick={processUploadedFile}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-glow-purple cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Process Notes & Extract Topics ⚡</span>
            </button>
          )}

          {/* Pre-loaded Sample Selector */}
          <div className="pt-2 border-t border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or Try Sample Materials (Instant 1-Click)
              </span>
              <span className="text-[10px] text-slate-500">No upload required</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_DOCUMENTS.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => selectSample(sample)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5 pr-2 truncate">
                    <p className="text-xs font-medium text-slate-200 group-hover:text-purple-300 truncate">
                      {sample.title}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {sample.pageCount} pages • {sample.detectedSubject}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
