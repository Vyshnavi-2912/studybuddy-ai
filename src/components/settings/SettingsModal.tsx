import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Save, 
  ExternalLink 
} from 'lucide-react';
import { AppSettings } from '../../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetProgress,
}) => {
  const [geminiKey, setGeminiKey] = useState(settings.geminiApiKey);
  const [youtubeKey, setYoutubeKey] = useState(settings.youtubeApiKey || '');
  const [openaiKey, setOpenaiKey] = useState(settings.openaiApiKey || '');
  const [model, setModel] = useState(settings.model || 'gemini-1.5-flash');
  const [useLocalFallback, setUseLocalFallback] = useState(settings.useLocalFallback ?? true);
  const [supabaseUrl, setSupabaseUrl] = useState(settings.supabaseUrl || '');
  const [supabaseKey, setSupabaseKey] = useState(settings.supabaseAnonKey || '');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({
      geminiApiKey: geminiKey.trim(),
      youtubeApiKey: youtubeKey.trim(),
      openaiApiKey: openaiKey.trim(),
      model,
      useLocalFallback,
      speechVoiceRate: 1.0,
      supabaseUrl: supabaseUrl.trim(),
      supabaseAnonKey: supabaseKey.trim(),
    });
    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your learning history, quiz scores, and weak topics list?')) {
      onResetProgress();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-xl rounded-2xl border border-purple-500/25 shadow-2xl p-6 sm:p-7 relative overflow-hidden space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Settings className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">System & AI Settings ⚙️</h3>
              <p className="text-xs text-slate-400">Configure LLM orchestration, Supabase sync, and local engines</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* AI Provider Config */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>Google Gemini API Key</span>
            </span>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noreferrer"
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1 font-bold"
            >
              <span>Get Free Key</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <input
            type="password"
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
          />

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium">Multi-Agent Processing Mode</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                geminiKey.trim().length > 10 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }`}>
                {geminiKey.trim().length > 10 ? 'Live Gemini LLM' : 'Intelligent Analytical Engine'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When no API key is provided, the platform uses our deterministic, domain-aware natural language pipeline that extracts real topics from your text, sequences modules, and runs live Agent 4 validation checks with zero API delay.
            </p>
          </div>

          {/* YouTube Data API & AI Image Key */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                YouTube Data API v3 Key (Optional)
              </label>
              <input
                type="password"
                value={youtubeKey}
                onChange={(e) => setYoutubeKey(e.target.value)}
                placeholder="AIzaSy... (for live video search)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Leave empty to use curated educational video repository.
              </span>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                OpenAI Key for DALL-E (Optional)
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj... (for DALL-E 3)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                Leave empty to use Pollinations FLUX AI (free & instant).
              </span>
            </div>
          </div>
        </div>

        {/* Supabase Integration (Optional) */}
        <div className="space-y-3 pt-2 border-t border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Supabase Cloud Sync (Optional)</span>
            </span>
            <span className="text-[10px] text-slate-500">Local storage active by default</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Project URL
              </label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xyz.supabase.co"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                Anon Public Key
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOi..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Reset Memory Option */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-rose-300">Reset Learning Memory</span>
            <p className="text-[11px] text-slate-400">Clear all quiz mistakes and streak counters</p>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>

        {/* Save Button */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
          {isSavedAlert && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Settings Saved!
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-xs shadow-glow-purple transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>

      </div>
    </div>
  );
};
