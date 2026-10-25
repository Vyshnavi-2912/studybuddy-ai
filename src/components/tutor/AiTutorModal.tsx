import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  HelpCircle
} from 'lucide-react';
import { DocumentNote, AiChatMessage } from '../../types';
import { askNotesTutor } from '../../services/aiTutorService';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDoc: DocumentNote | null;
  apiKey?: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  currentDoc,
  apiKey,
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your AI Study Tutor. Ask me any question about "${currentDoc?.title || 'your notes'}", and I will provide answers strictly grounded in your uploaded pages with exact citations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || !currentDoc || isAsking) return;

    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuestion('');
    setIsAsking(true);

    try {
      const result = await askNotesTutor(q, currentDoc, apiKey);
      const assistantMsg: AiChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: result.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pageCitations: result.pageCitations,
        isWarning: result.isOutOfScope,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `Error analyzing notes: ${err.message}. Please try again.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isWarning: true,
        }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  // Quick suggestions based on doc
  const quickPrompts = currentDoc?.title.toLowerCase().includes('network') 
    ? [
        'Explain the TCP 3-way handshake sequence',
        'What is the difference between TCP and UDP?',
        'Which layer handles physical MAC addresses?'
      ]
    : currentDoc?.title.toLowerCase().includes('operat') || currentDoc?.title.toLowerCase().includes('os')
      ? [
          'What are the 4 Coffman deadlock conditions?',
          'What is the difference between a process and a thread?',
          'How does the TLB speed up virtual memory?'
        ]
      : [
          'Summarize the core takeaways from Page 1',
          'What are the most important definitions in these notes?',
          'Give me an exam-style question from these notes'
        ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-2xl h-[600px] max-h-[90vh] rounded-2xl border border-purple-500/25 shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-500/15 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">Ask Your Notes 💬</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Strictly Grounded
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-sm">
                Document: {currentDoc?.title || 'No notes selected'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {messages.map((m) => (
            <div 
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                  <Bot className="w-4 h-4 text-purple-400" />
                </div>
              )}

              <div className={`space-y-2 max-w-[85%] ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl rounded-tr-sm p-3.5 shadow-sm font-medium'
                  : m.isWarning
                    ? 'bg-amber-950/30 border border-amber-500/30 text-amber-200 rounded-2xl rounded-tl-sm p-3.5'
                    : 'bg-slate-900/90 border border-purple-500/15 text-slate-200 rounded-2xl rounded-tl-sm p-3.5'
              }`}>
                <div className="whitespace-pre-line leading-relaxed">
                  {m.text}
                </div>

                {/* Page Citations */}
                {m.pageCitations && m.pageCitations.length > 0 && (
                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-wider">
                      Verified Citations:
                    </span>
                    {m.pageCitations.map((cite, cIdx) => (
                      <div key={cIdx} className="text-[11px] text-slate-300 flex items-start gap-1.5 font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">
                          Page {cite.pageNumber}
                        </span>
                        {cite.quote && <span className="italic line-clamp-1">"{cite.quote}"</span>}
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-[9px] text-slate-400 text-right">
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isAsking && (
            <div className="flex gap-3 items-center text-xs text-slate-400">
              <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-300 flex items-center justify-center shrink-0 border border-purple-500/30">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
              </div>
              <span>Searching source pages & verifying grounding...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-900/80 border-t border-purple-500/15 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-semibold shrink-0">Quick ask:</span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-purple-600/30 border border-purple-500/20 text-slate-300 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-purple-500/15 flex items-center gap-2">
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about your uploaded notes..."
            className="flex-1 bg-slate-900 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-medium"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputQuestion.trim() || isAsking}
            className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-40 text-white transition-all shadow-glow-purple active:scale-95 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
