import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Heart,
  Smile,
  Flame,
  User
} from 'lucide-react';
import { UserProfile } from '../../types';

interface WelcomeGatewayProps {
  onComplete: (profile: UserProfile) => void;
}

const WELCOME_MESSAGES = [
  (name: string) => `Yo, ${name} 🔥 Ready to turn boring lectures into pure vibes & high grades?`,
  (name: string) => `Hey, ${name} ✨ Were you always this smart, or did StudyBuddy bring out your secret genius?`,
  (name: string) => `Well, ${name} 🚀 Grab your notes — we're about to make studying genuinely addictive.`,
  (name: string) => `Hey, ${name}! Your brain called — it’s hyped and ready for its next upgrade. 🧠⚡`,
  (name: string) => `Welcome aboard, ${name}! Time to flex on those exams with zero stress. 💯`,
  (name: string) => `Hey, ${name} 💫 Bite-sized reels, dope memes, and 10-second cheat codes are ready for you!`,
];

export const WelcomeGateway: React.FC<WelcomeGatewayProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'unspecified'>('unspecified');
  const [nameError, setNameError] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [chosenMessage, setChosenMessage] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const profileRef = useRef<UserProfile | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setNameError('Drop your name or nickname so we can customize your study playground!');
      return;
    }

    if (cleanName.length > 30) {
      setNameError('Keep your nickname under 30 characters.');
      return;
    }

    // Pick a charming welcome message
    const randomMsgFn = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
    const msg = randomMsgFn(cleanName);
    setChosenMessage(msg);
    setIsTransitioning(true);

    const profile: UserProfile = {
      name: cleanName,
      gender,
      onboarded: true,
      welcomeMessage: msg,
      createdAt: new Date().toISOString(),
    };
    profileRef.current = profile;
  };

  // Typewriter effect
  useEffect(() => {
    if (!isTransitioning || !chosenMessage) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayedText(chosenMessage);
      setIsTypingDone(true);
    } else {
      let charIdx = 0;
      setDisplayedText('');
      setIsTypingDone(false);
      const typeInterval = setInterval(() => {
        if (charIdx < chosenMessage.length) {
          setDisplayedText(chosenMessage.slice(0, charIdx + 1));
          charIdx++;
        } else {
          setIsTypingDone(true);
          clearInterval(typeInterval);
        }
      }, 20);

      return () => clearInterval(typeInterval);
    }
  }, [isTransitioning, chosenMessage]);

  const handleProceedToDashboard = () => {
    if (profileRef.current) {
      onComplete(profileRef.current);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070A12]/95 backdrop-blur-2xl text-slate-100 overflow-hidden select-none">
      
      {/* Ambient Lighting Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[620px] h-[620px] rounded-full border border-purple-500/25 animate-spin-slow" />
        <div className="absolute w-[460px] h-[460px] rounded-full border border-cyan-400/25 animate-spin-reverse" />
        <div className="absolute w-[320px] h-[320px] rounded-full border border-pink-500/25 border-dashed animate-pulse-slow" />
        <div className="absolute w-[220px] h-[220px] rounded-full bg-purple-500/15 filter blur-3xl" />
      </div>

      {/* Floating Chill Study Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden text-purple-400/20 font-mono text-sm">
        <span className="absolute top-[12%] left-[15%] animate-float">O(1) Memory Cheat</span>
        <span className="absolute top-[20%] right-[18%] animate-float-reverse text-amber-300/25">100% No Cap 🧢</span>
        <span className="absolute bottom-[22%] left-[20%] animate-float text-cyan-300/25">TCP 3-Way Handshake 🤝</span>
        <span className="absolute bottom-[16%] right-[16%] animate-float-reverse">Quick Grab ⚡</span>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        
        {!isTransitioning ? (
          <div className="clean-card p-7 sm:p-9 border border-purple-500/30 shadow-glow-purple bg-[#111827]/90 backdrop-blur-2xl space-y-6 animate-in fade-in zoom-in-95 duration-500 relative">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between border-b border-purple-500/15 pb-4">
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase text-purple-300">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>StudyBuddy AI • Quick Welcome</span>
              </div>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                CHILL MODE ✨
              </span>
            </div>

            {/* Title */}
            <div className="space-y-2 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-brand-gradient">
                Let's make studying actually fun 🚀
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                No boring textbooks. Just bite-sized reels, hilarious study memes, and instant 10-second exam cheat codes.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Nickname Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                  <span>What's your name or nickname?</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">Required</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="e.g. Alex, Maya, Jordan..."
                  autoFocus
                  className="w-full bg-slate-900/90 border border-purple-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-all outline-none font-semibold"
                />
                {nameError && (
                  <p className="text-xs text-rose-400 font-medium animate-in fade-in">
                    {nameError}
                  </p>
                )}
              </div>

              {/* Vibe Preference */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-200 block">
                  Select your vibe preference:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'male', label: 'Chill Dude 🎧' },
                    { id: 'female', label: 'Study Queen 👑' },
                    { id: 'unspecified', label: 'Just Vibes ✨' },
                  ].map((opt) => {
                    const isSelected = gender === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setGender(opt.id as any)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center border cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600/30 border-purple-400 text-white shadow-glow-purple'
                            : 'bg-slate-900/60 border-purple-500/15 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-sm tracking-wide shadow-glow-purple transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Let's Cook ⚡</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>
        ) : (
          /* Transitioning Screen */
          <div className="clean-card p-8 sm:p-10 border border-cyan-400/40 shadow-glow-turquoise bg-[#111827]/95 backdrop-blur-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-purple-500 via-cyan-400 to-rose-400 flex items-center justify-center shadow-glow-purple text-2xl animate-bounce">
              ⚡
            </div>

            <div className="space-y-3 min-h-[90px] flex flex-col justify-center">
              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {displayedText}
                {!isTypingDone && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1" />}
              </p>
            </div>

            {isTypingDone && (
              <button
                onClick={handleProceedToDashboard}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm shadow-glow-turquoise transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
              >
                <span>Okay, Let's Go 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
