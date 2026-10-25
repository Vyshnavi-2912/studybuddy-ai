import React, { useState, useEffect, useMemo } from 'react';
import { 
  Smile, 
  Sparkles, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Zap, 
  HelpCircle, 
  RotateCw,
  Download,
  RefreshCw,
  PlusCircle,
  Filter,
  CheckCircle2,
  Info,
  Images,
  X,
  Wand2,
  Edit3,
  Layers,
  Flame,
  Lightbulb
} from 'lucide-react';
import { MemeCard, TopicConcept, UserLearningProgress, MemeTemplate } from '../../types';
import { apiService } from '../../services/apiService';
import { storageService } from '../../services/storageService';
import { memeArtService } from '../../services/memeArtService';

interface MemeStudioProps {
  memes: MemeCard[];
  topics?: TopicConcept[];
  progress: UserLearningProgress;
  documentId?: string;
  initialTopicId?: string;
  onSaveMeme: (memeId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onUpdateMemes?: (memes: MemeCard[]) => void;
}

export const MemeStudio: React.FC<MemeStudioProps> = ({
  memes: initialMemes,
  topics = [],
  progress,
  documentId,
  initialTopicId,
  onSaveMeme,
  onCompleteLesson,
  onUpdateMemes,
}) => {
  const [memesList, setMemesList] = useState<MemeCard[]>(() => {
    const list = initialMemes && initialMemes.length > 0 ? [...initialMemes] : [];
    // Ensure every meme has an initial illustrated vector image and purge any pollinations URLs
    return list.map(m => {
      if (!m.imageUrl || m.imageUrl.includes('pollinations.ai')) {
        return { ...m, imageUrl: memeArtService.generateMemeSvgDataUri(m) };
      }
      return m;
    });
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string>(initialTopicId || 'all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reactions, setReactions] = useState<{ [id: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [generateFeedback, setGenerateFeedback] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // Custom Meme Creator form state
  const [customTemplate, setCustomTemplate] = useState<MemeTemplate>('drake-hotline');
  const [customTopicId, setCustomTopicId] = useState<string>(topics[0]?.id || 'custom');
  const [customTopText, setCustomTopText] = useState('');
  const [customBottomText, setCustomBottomText] = useState('');
  const [customWhyFunny, setCustomWhyFunny] = useState('');

  // Auto-purge any stale pollinations rate-limit images on load
  useEffect(() => {
    storageService.purgePollinationsCache(documentId);
    setMemesList(prev => prev.map(m => {
      if (!m.imageUrl || m.imageUrl.includes('pollinations.ai')) {
        const clean = memeArtService.generateMemeSvgDataUri(m);
        return { ...m, imageUrl: clean };
      }
      return m;
    }));
  }, [documentId]);

  // Sync initial topic selection
  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
      setCurrentIndex(0);
    }
  }, [initialTopicId]);

  // Sync initial memes from props
  useEffect(() => {
    if (initialMemes && initialMemes.length > 0) {
      setMemesList(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const merged = [...prev];
        initialMemes.forEach(m => {
          if (!existingIds.has(m.id)) {
            const cleanUrl = (m.imageUrl && !m.imageUrl.includes('pollinations.ai'))
              ? m.imageUrl
              : memeArtService.generateMemeSvgDataUri(m);
            merged.push({ ...m, imageUrl: cleanUrl });
            existingIds.add(m.id);
          }
        });
        return merged;
      });
    }
  }, [initialMemes]);

  // Persistent image cache (sanitizing out pollinations rate-limited images)
  const [imageMap, setImageMap] = useState<{ [id: string]: string }>(() => {
    const rawCache = storageService.getMemeImageCache();
    const clean: Record<string, string> = {};
    for (const [k, v] of Object.entries(rawCache)) {
      if (typeof v === 'string' && !v.includes('pollinations.ai')) {
        clean[k] = v;
      }
    }
    return clean;
  });
  const [loadingMap, setLoadingMap] = useState<{ [id: string]: boolean }>({});
  const [errorMap, setErrorMap] = useState<{ [id: string]: { message: string; isRateLimit: boolean } }>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Filter memes by selected topic
  const filteredMemes = useMemo(() => {
    if (selectedTopicId === 'all') return memesList;
    return memesList.filter(m => m.topicId === selectedTopicId);
  }, [memesList, selectedTopicId]);

  const currentMeme = filteredMemes[currentIndex] || filteredMemes[0] || memesList[0];
  const isSaved = currentMeme ? progress.savedMemes.includes(currentMeme.id) : false;

  // Ensure current meme has an image immediately in imageMap
  useEffect(() => {
    if (!currentMeme) return;
    if (!imageMap[currentMeme.id]) {
      const initialImg = currentMeme.imageUrl || memeArtService.generateMemeSvgDataUri(currentMeme);
      setImageMap(prev => ({ ...prev, [currentMeme.id]: initialImg }));
      storageService.saveMemeImage(currentMeme.id, initialImg);
    }
  }, [currentMeme?.id]);

  // Fast AI image generation via Turbo model with clean fallback
  const generateImageForMeme = async (meme: MemeCard, forceNew = false) => {
    if (!meme) return;

    setIsGeneratingAi(true);
    setLoadingMap(prev => ({ ...prev, [meme.id]: true }));
    setErrorMap(prev => {
      const copy = { ...prev };
      delete copy[meme.id];
      return copy;
    });

    try {
      // 6-second timeout race to prevent hanging
      const timeoutPromise = new Promise<{ imageUrl?: string }>((_, reject) =>
        setTimeout(() => reject(new Error('AI server response exceeded timeout. Displaying instant vector artwork.')), 7000)
      );

      const genPromise = apiService.generateMemeImage({
        topicName: meme.topicName,
        template: meme.template,
        visualPrompt: meme.visualDesc,
        topText: meme.topText,
        bottomText: meme.bottomText,
      });

      const res = await Promise.race([genPromise, timeoutPromise]);

      if (res && res.imageUrl) {
        const finalUrl = forceNew ? `${res.imageUrl}&t=${Date.now()}` : res.imageUrl;
        setImageMap(prev => {
          const next = { ...prev, [meme.id]: finalUrl };
          storageService.saveMemeImage(meme.id, finalUrl);
          return next;
        });
        setGenerateFeedback(`✨ AI Neural Artwork generated for "${meme.topicName}"!`);
        setTimeout(() => setGenerateFeedback(null), 3000);
      } else {
        throw new Error('AI image returned empty URL');
      }
    } catch (err: any) {
      console.warn('AI artwork status:', err);
      // Fallback to crisp instant vector illustration immediately
      const vectorFallback = memeArtService.generateMemeSvgDataUri(meme);
      setImageMap(prev => ({ ...prev, [meme.id]: vectorFallback }));
      storageService.saveMemeImage(meme.id, vectorFallback);

      setErrorMap(prev => ({
        ...prev,
        [meme.id]: {
          message: 'Displaying instant high-resolution illustrated comic artwork.',
          isRateLimit: false
        }
      }));
    } finally {
      setLoadingMap(prev => ({ ...prev, [meme.id]: false }));
      setIsGeneratingAi(false);
    }
  };

  // Re-render instant vector artwork
  const handleResetToIllustrated = () => {
    if (!currentMeme) return;
    const vectorArt = memeArtService.generateMemeSvgDataUri(currentMeme);
    setImageMap(prev => {
      const next = { ...prev, [currentMeme.id]: vectorArt };
      storageService.saveMemeImage(currentMeme.id, vectorArt);
      return next;
    });
    setGenerateFeedback(`Reset to crisp vector illustrated artwork!`);
    setTimeout(() => setGenerateFeedback(null), 2500);
  };

  // "Generate More Memes" Action: Adds 3 to 5 distinct, witty, high-quality memes
  const handleGenerateBatch = (count = 3) => {
    const activeTopic = (selectedTopicId !== 'all' ? topics.find(t => t.id === selectedTopicId) : null)
      || topics.find(t => t.id === currentMeme?.topicId)
      || topics[0]
      || {
        id: currentMeme?.topicId || 't1',
        name: currentMeme?.topicName || 'Core Concept',
        pageReference: currentMeme?.pageReference || 1,
        definition: currentMeme?.educationalConcept || 'Core architectural rule'
      };

    const templatesPool: MemeTemplate[] = [
      'drake-hotline',
      'galaxy-brain',
      'this-is-fine',
      'spiderman-pointing',
      'two-buttons',
      'distracted-boyfriend',
      'expectation-vs-reality'
    ];

    const jokeBank = [
      {
        tpl: 'drake-hotline' as MemeTemplate,
        top: `Spending 4 hours debugging ${activeTopic.name} by reading random 2013 forum posts:`,
        bot: `Reading the actual 2-step definition on Page ${activeTopic.pageReference}: "It worked immediately."`,
        why: `Forums overcomplicate things with 50-line hacks when ${activeTopic.name} is just one direct architectural rule.`,
        anchor: `Rule: Check Page ${activeTopic.pageReference} verified mechanisms first.`
      },
      {
        tpl: 'galaxy-brain' as MemeTemplate,
        top: `Normal Dev: Writing a 100-line function with 5 nested if-statements for ${activeTopic.name}`,
        bot: `Galaxy Brain: Using the Page ${activeTopic.pageReference} principle to solve it in 1 clean line`,
        why: `Junior engineers write code; senior engineers leverage the core system architecture to let the OS do the work.`,
        anchor: `Cognitive anchor for ${activeTopic.name}: Elegant abstractions eliminate boilerplate.`
      },
      {
        tpl: 'this-is-fine' as MemeTemplate,
        top: `Production server executing ${activeTopic.name} with 50,000 concurrent requests:`,
        bot: `The system architect drinking coffee: "This is fine. Page ${activeTopic.pageReference} guarantees deterministic flow."`,
        why: `System designs that adhere strictly to verified protocol states remain resilient even under high load.`,
        anchor: `Resilience anchor: ${activeTopic.definition.slice(0, 80)}...`
      },
      {
        tpl: 'spiderman-pointing' as MemeTemplate,
        top: `Two subsystems arguing over who owns the resource in ${activeTopic.name}:`,
        bot: `Both pointing at each other while the scheduler waits indefinitely on Page ${activeTopic.pageReference}`,
        why: `Without a global ordering rule, symmetric components lock each other out in circular dependency standoffs.`,
        anchor: `Eliminate circular wait by establishing strict hierarchical priority.`
      },
      {
        tpl: 'two-buttons' as MemeTemplate,
        top: `Student in exam deciding how to explain ${activeTopic.name}:`,
        bot: `Button A: Write 5 pages of buzzwords | Button B: Draw the exact Page ${activeTopic.pageReference} diagram`,
        why: `Professors award full marks for accurate schematics and state transitions rather than endless vague paragraphs.`,
        anchor: `Exam tip: Diagramming the mechanism proves real conceptual intuition.`
      },
      {
        tpl: 'distracted-boyfriend' as MemeTemplate,
        top: `Developer mesmerized by the latest hyped framework while ${activeTopic.name} is already built into the core:`,
        bot: `The tested Page ${activeTopic.pageReference} standard staring in pure disbelief`,
        why: `Every few years the industry reinvents the exact same networking or concurrency pattern under a new shiny name.`,
        anchor: `Fundamentals remain constant across decades of software tools.`
      },
      {
        tpl: 'expectation-vs-reality' as MemeTemplate,
        top: `Textbook Diagram of ${activeTopic.name}: Clean arrows, zero dropped packets, happy users.`,
        bot: `Real World: Network latency spike, half-open sockets, and panic on Page ${activeTopic.pageReference}.`,
        why: `Real production environments must gracefully handle messy edge cases and timeouts.`,
        anchor: `Always design for the failure mode, not just the happy path.`
      }
    ];

    const currentTotal = memesList.length;
    const newMemes: MemeCard[] = [];

    for (let i = 0; i < count; i++) {
      const jokeIdx = (currentTotal + i) % jokeBank.length;
      const joke = jokeBank[jokeIdx];
      const template = templatesPool[(currentTotal + i) % templatesPool.length];
      const timeId = Date.now() + i * 17;

      const card: MemeCard = {
        id: `meme-gen-${timeId}`,
        topicId: activeTopic.id,
        topicName: activeTopic.name,
        pageReference: activeTopic.pageReference,
        template: joke.tpl || template,
        topText: joke.top,
        bottomText: joke.bot,
        visualDesc: `${joke.tpl} comic illustration about ${activeTopic.name}`,
        whyItsFunnyAndTrue: joke.why,
        educationalConcept: activeTopic.definition,
        memoryAnchor: joke.anchor,
        reactionCount: Math.floor(Math.random() * 25) + 18,
        imageUrl: '',
        imagePrompt: `Educational comic meme illustration about ${activeTopic.name}: ${joke.top}`
      };

      // Generate instant vector illustration
      card.imageUrl = memeArtService.generateMemeSvgDataUri(card);
      newMemes.push(card);
    }

    const updatedList = [...newMemes, ...memesList];
    setMemesList(updatedList);
    setCurrentIndex(0);

    // Update parent content & storage
    if (onUpdateMemes) {
      onUpdateMemes(updatedList);
    }
    if (documentId) {
      storageService.updateDocumentMemes(documentId, updatedList);
    }

    setGenerateFeedback(`✨ Generated ${count} fresh educational memes for "${activeTopic.name}"! You now have ${updatedList.length} memes total.`);
    setTimeout(() => setGenerateFeedback(null), 4000);
  };

  // Add custom user-created meme
  const handleSaveCustomMeme = () => {
    if (!customTopText.trim() || !customBottomText.trim()) return;

    const topic = topics.find(t => t.id === customTopicId) || topics[0] || {
      id: 't-custom',
      name: 'Custom Concept',
      pageReference: 1,
      definition: 'Student created concept'
    };

    const newMeme: MemeCard = {
      id: `meme-custom-${Date.now()}`,
      topicId: topic.id,
      topicName: topic.name,
      pageReference: topic.pageReference,
      template: customTemplate,
      topText: customTopText.trim(),
      bottomText: customBottomText.trim(),
      visualDesc: `Custom student comic meme about ${topic.name}`,
      whyItsFunnyAndTrue: customWhyFunny.trim() || 'Student personalized intuition anchor.',
      educationalConcept: topic.definition,
      memoryAnchor: `Custom Recall Anchor: ${customBottomText.slice(0, 70)}...`,
      reactionCount: 24,
      imageUrl: ''
    };

    newMeme.imageUrl = memeArtService.generateMemeSvgDataUri(newMeme);

    const updated = [newMeme, ...memesList];
    setMemesList(updated);
    setCurrentIndex(0);

    if (onUpdateMemes) onUpdateMemes(updated);
    if (documentId) storageService.appendMemeToDocument(documentId, newMeme);

    setIsCreatorOpen(false);
    setCustomTopText('');
    setCustomBottomText('');
    setCustomWhyFunny('');
    setGenerateFeedback(`🎉 Created your custom ${customTemplate} meme!`);
    setTimeout(() => setGenerateFeedback(null), 3000);
  };

  // Auto-fill random humorous joke in Creator
  const handleRandomizeCreatorJoke = () => {
    const activeTopic = topics.find(t => t.id === customTopicId) || topics[0];
    const name = activeTopic?.name || 'This Topic';
    const page = activeTopic?.pageReference || 1;

    const jokes = [
      { top: `Me explaining ${name} in 1 sentence:`, bot: `Classmate: "Can you repeat that 5 more times?"` },
      { top: `Code compiling with zero errors on ${name}:`, bot: `"Wait, that was too easy. Something is deeply wrong."` },
      { top: `Reading Page ${page} 10 minutes before the exam:`, bot: `"Everything makes complete sense now."` },
      { top: `When the professor asks who wants to explain ${name}:`, bot: `Entire lecture hall suddenly fascinated by the carpet.` },
    ];
    const pick = jokes[Math.floor(Math.random() * jokes.length)];
    setCustomTopText(pick.top);
    setCustomBottomText(pick.bot);
  };

  // Download meme as PNG
  const handleDownload = async (targetMeme = currentMeme) => {
    if (!targetMeme) return;
    const imgUrl = imageMap[targetMeme.id] || targetMeme.imageUrl || memeArtService.generateMemeSvgDataUri(targetMeme);

    setIsDownloading(true);
    try {
      await apiService.downloadMemeImage(
        imgUrl,
        targetMeme.topText,
        targetMeme.bottomText,
        targetMeme.topicName
      );
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReaction = () => {
    if (!currentMeme) return;
    setReactions(prev => ({
      ...prev,
      [currentMeme.id]: (prev[currentMeme.id] || (currentMeme.reactionCount || 15)) + 1
    }));
  };

  const handleNext = () => {
    if (currentMeme) onCompleteLesson(currentMeme.id);
    setShowExplanation(false);
    if (currentIndex < filteredMemes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    setShowExplanation(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!memesList || memesList.length === 0) {
    return (
      <div className="clean-card p-12 text-center max-w-lg mx-auto space-y-4 bg-[#0F172A]/80 border-turquoise-500/20">
        <Smile className="w-12 h-12 mx-auto text-champagne-400" />
        <h3 className="text-base font-bold text-ivory-50">No Memes in Library Yet</h3>
        <p className="text-xs text-ivory-200/70">Click below to generate a fresh batch of subject-grounded memes.</p>
        <button
          onClick={() => handleGenerateBatch(4)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-black text-xs transition-all shadow-glow-turquoise"
        >
          Generate Memes Now
        </button>
      </div>
    );
  }

  // Visual template icon and styling
  const getTemplateBadge = (tpl: string) => {
    switch (tpl) {
      case 'galaxy-brain': return { label: '🧠 Galaxy Brain', color: 'from-turquoise-500 to-emerald-600', avatar: '🌌' };
      case 'distracted-boyfriend': return { label: '👀 Distracted Priority', color: 'from-champagne-400 to-amber-500', avatar: '👀' };
      case 'drake-hotline': return { label: '🕺 Drake Hotline', color: 'from-amber-400 to-yellow-500', avatar: '🕺' };
      case 'this-is-fine': return { label: '🔥 "This is Fine"', color: 'from-rose-500 to-orange-500', avatar: '🔥' };
      case 'spiderman-pointing': return { label: '👉 Spider-Man Pointing', color: 'from-turquoise-400 to-cyan-500', avatar: '👉' };
      case 'two-buttons': return { label: '🔘 Two Buttons', color: 'from-emerald-400 to-teal-500', avatar: '🔘' };
      default: return { label: '⚖️ Expectation vs Reality', color: 'from-turquoise-500 to-champagne-400', avatar: '⚖️' };
    }
  };

  const tplInfo = getTemplateBadge(currentMeme.template);
  const rawCurrentImg = imageMap[currentMeme.id] || currentMeme.imageUrl;
  const currentImageUrl = (rawCurrentImg && !rawCurrentImg.includes('pollinations.ai'))
    ? rawCurrentImg
    : memeArtService.generateMemeSvgDataUri(currentMeme);
  const isImageLoading = loadingMap[currentMeme.id];
  const isSvgArt = currentImageUrl?.startsWith('data:image/svg+xml');

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in duration-300">
      
      {/* 1. TOPIC FILTER TABS */}
      {topics.length > 0 && (
        <div className="clean-card p-3 space-y-2 border border-turquoise-500/20 bg-[#0F172A]/80 backdrop-blur-md">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-ivory-50 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-turquoise-400" />
              <span>Select Subject Topic</span>
            </span>
            <span className="text-[11px] text-champagne-300/80 font-mono">
              {filteredMemes.length} memes in view
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => {
                setSelectedTopicId('all');
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTopicId === 'all'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold shadow-glow-turquoise'
                  : 'bg-slate-900/60 text-ivory-200/70 hover:text-white hover:bg-slate-800 border border-white/[0.05]'
              }`}
            >
              All Topics ({memesList.length})
            </button>

            {topics.map((t) => {
              const isSelected = selectedTopicId === t.id;
              const topicMemeCount = memesList.filter(m => m.topicId === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelectedTopicId(t.id);
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold border-turquoise-400 shadow-glow-turquoise'
                      : 'bg-slate-900/60 text-ivory-200/80 hover:text-white hover:bg-slate-800 border-white/[0.05]'
                  }`}
                >
                  <span>{t.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-slate-900 text-turquoise-300' : 'bg-slate-800 text-ivory-200/50'
                  }`}>
                    {topicMemeCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Generation Toast */}
      {generateFeedback && (
        <div className="p-3 rounded-xl bg-turquoise-500/20 border border-turquoise-400 text-turquoise-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-turquoise-400" />
          <span>{generateFeedback}</span>
        </div>
      )}

      {/* Top Header Bar with Batch Generator Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-ivory-50 flex items-center gap-1.5">
            <Smile className="w-4 h-4 text-champagne-400" />
            <span>Educational Meme Studio</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-turquoise-500/30 text-turquoise-300 font-mono text-[11px]">
            {currentIndex + 1} of {filteredMemes.length}
          </span>
        </div>

        {/* Action Group: Generate More, Create Custom, Open Gallery */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Quick Generate +3 Memes */}
          <button
            onClick={() => handleGenerateBatch(3)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-black text-xs shadow-glow-turquoise transition-all cursor-pointer active:scale-95"
            title="Generate 3 fresh memes instantly"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Generate +3 More</span>
          </button>

          {/* Quick Generate +5 Memes */}
          <button
            onClick={() => handleGenerateBatch(5)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-champagne-400/20 hover:bg-champagne-400/30 border border-champagne-400/40 text-champagne-300 font-bold text-xs transition-all cursor-pointer active:scale-95"
            title="Generate 5 fresh memes instantly"
          >
            <Flame className="w-3.5 h-3.5 text-champagne-400" />
            <span>+5 Batch</span>
          </button>

          {/* Create Custom Meme */}
          <button
            onClick={() => setIsCreatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-turquoise-500/30 text-ivory-100 font-semibold text-xs transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-turquoise-400" />
            <span>Create Meme</span>
          </button>

          {/* Gallery Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/[0.08] text-ivory-200 font-semibold text-xs transition-all cursor-pointer"
          >
            <Images className="w-3.5 h-3.5 text-champagne-400" />
            <span>Deck ({memesList.length})</span>
          </button>
        </div>
      </div>

      {/* Main Active Meme Card */}
      <div className="clean-card p-5 sm:p-7 space-y-4 border border-turquoise-500/25 shadow-glow-purple bg-[#0F172A]/90 backdrop-blur-xl">
        
        {/* Template & Page Banner */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold text-champagne-300 bg-champagne-400/15 border border-champagne-400/30">
              {tplInfo.label}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isSvgArt 
                ? 'bg-turquoise-500/15 text-turquoise-300 border-turquoise-400/30' 
                : 'bg-purple-500/15 text-purple-300 border-purple-400/30'
            }`}>
              {isSvgArt ? '⚡ Instant Vector Art' : '🎨 AI Neural Art'}
            </span>
          </div>

          <span className="text-[11px] font-mono text-champagne-300/80">
            Page {currentMeme.pageReference} Citation
          </span>
        </div>

        {/* Topic Title */}
        <div>
          <h2 className="text-base sm:text-lg font-black text-ivory-50 tracking-tight">
            {currentMeme.topicName}
          </h2>
          <p className="text-xs text-ivory-200/70 mt-0.5">
            {currentMeme.educationalConcept}
          </p>
        </div>

        {/* Visual Meme Graphic Artboard */}
        <div className="rounded-2xl border-2 border-turquoise-500/25 bg-[#0B0F19] overflow-hidden shadow-2xl relative">
          
          {/* Top Meme Caption */}
          <div className="p-3.5 bg-gradient-to-b from-black/95 to-black/70 border-b border-turquoise-500/15 text-center">
            <p className="font-extrabold text-xs sm:text-sm text-champagne-300 uppercase tracking-wide leading-snug drop-shadow-md">
              {currentMeme.topText}
            </p>
          </div>

          {/* Graphic Artwork Area */}
          <div className="relative min-h-[320px] max-h-[460px] flex items-center justify-center bg-[#070A12] overflow-hidden">
            
            {/* The Image (SVG Vector or Turbo AI Image) */}
            <img
              src={currentImageUrl}
              alt={`Meme for ${currentMeme.topicName}`}
              className="w-full h-auto max-h-[460px] object-contain transition-transform duration-300"
              onError={() => {
                // If external AI image fails, gracefully fallback to clean SVG vector immediately
                handleResetToIllustrated();
              }}
            />

            {/* AI Synthesizing Overlay (shown non-blockingly) */}
            {isImageLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-2 animate-in fade-in">
                <div className="w-10 h-10 rounded-full border-2 border-turquoise-400/30 border-t-turquoise-400 animate-spin flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-champagne-400" />
                </div>
                <p className="text-xs font-bold text-turquoise-300">Synthesizing Fast Turbo AI Art...</p>
                <p className="text-[10px] text-ivory-200/70">Takes 1-2 seconds</p>
              </div>
            )}
          </div>

          {/* Bottom Meme Caption */}
          <div className="p-3.5 bg-gradient-to-t from-black/95 to-black/70 border-t border-turquoise-500/15 text-center">
            <p className="font-extrabold text-xs sm:text-sm text-turquoise-300 uppercase tracking-wide leading-snug drop-shadow-md">
              {currentMeme.bottomText}
            </p>
          </div>
        </div>

        {/* Meme Filmstrip / Quick Switcher Strip */}
        {filteredMemes.length > 1 && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] text-ivory-200/60 px-0.5">
              <span className="flex items-center gap-1 font-semibold">
                <Layers className="w-3 h-3 text-turquoise-400" />
                <span>Meme Deck Filmstrip ({filteredMemes.length})</span>
              </span>
              <span>Click any card to view</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {filteredMemes.map((m, idx) => {
                const isActive = idx === currentIndex;
                const mBadge = getTemplateBadge(m.template);
                const rawThumb = imageMap[m.id] || m.imageUrl;
                const thumbImg = (rawThumb && !rawThumb.includes('pollinations.ai'))
                  ? rawThumb
                  : memeArtService.generateMemeSvgDataUri(m);

                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowExplanation(false);
                    }}
                    className={`shrink-0 w-28 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-turquoise-500/20 border-turquoise-400 shadow-glow-turquoise' 
                        : 'bg-[#0B0F19]/90 border-white/[0.06] hover:bg-slate-800'
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/80 flex items-center justify-center mb-1.5 border border-white/5">
                      {thumbImg ? (
                        <img src={thumbImg} alt={m.topicName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl">{mBadge.avatar}</span>
                      )}
                    </div>
                    <p className={`text-[10px] font-bold truncate ${isActive ? 'text-turquoise-300' : 'text-ivory-100'}`}>
                      #{idx + 1} {m.template.split('-')[0]}
                    </p>
                    <p className="text-[9px] text-ivory-200/60 truncate font-mono">
                      p.{m.pageReference}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Controls: AI Art, Reset Vector, Download, Like, Save */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-turquoise-500/15">
          
          <div className="flex items-center gap-2 flex-wrap">
            {/* Generate / Switch to Turbo AI Art */}
            <button
              onClick={() => generateImageForMeme(currentMeme, true)}
              disabled={isGeneratingAi}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black transition-all shadow-md active:scale-95 disabled:opacity-40 cursor-pointer"
              title="Synthesize AI neural artwork using fast turbo diffusion"
            >
              <Wand2 className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAi ? 'Synthesizing...' : 'Generate AI Art'}</span>
            </button>

            {/* Reset to Vector Art (if in AI mode) */}
            {!isSvgArt && (
              <button
                onClick={handleResetToIllustrated}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-turquoise-500/15 hover:bg-turquoise-500/25 border border-turquoise-400/30 text-turquoise-300 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                title="Switch back to crisp instant vector illustration"
              >
                <Zap className="w-3.5 h-3.5 text-champagne-400" />
                <span>Vector Mode</span>
              </button>
            )}

            {/* Download Meme PNG */}
            <button
              onClick={() => handleDownload(currentMeme)}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-champagne-500/20 hover:bg-champagne-500/30 border border-champagne-400/30 text-champagne-300 text-xs font-bold transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
              title="Download image with captions"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Saving...' : 'Download PNG'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Heart / Reactions */}
            <button
              onClick={handleReaction}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-champagne-400/15 hover:bg-champagne-400/25 border border-champagne-400/30 text-champagne-300 text-xs font-bold transition-all active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 text-champagne-400 fill-champagne-400" />
              <span>{reactions[currentMeme.id] || currentMeme.reactionCount || 18}</span>
            </button>

            {/* Bookmark Meme */}
            <button
              onClick={() => onSaveMeme(currentMeme.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isSaved
                  ? 'bg-turquoise-500/25 text-turquoise-300 border border-turquoise-400/40'
                  : 'bg-slate-900/70 hover:bg-slate-800 text-ivory-200 border border-white/[0.05]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-turquoise-400' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>

            {/* Why is this true button */}
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-white/[0.08] text-xs font-medium text-ivory-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-turquoise-400" />
              <span>{showExplanation ? 'Hide' : 'Why true?'}</span>
            </button>
          </div>

        </div>

        {/* Collapsible Educational Deep Dive */}
        {showExplanation && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-turquoise-500/25 space-y-2.5 animate-in fade-in duration-200 text-xs">
            <div className="space-y-1">
              <span className="font-extrabold text-champagne-300 uppercase tracking-wider text-[10px]">
                The Academic Humor Breakdown:
              </span>
              <p className="text-ivory-100 leading-relaxed">
                {currentMeme.whyItsFunnyAndTrue}
              </p>
            </div>

            <div className="space-y-1 pt-2 border-t border-turquoise-500/10">
              <span className="font-extrabold text-turquoise-300 uppercase tracking-wider text-[10px]">
                Notes Excerpt (Page {currentMeme.pageReference}):
              </span>
              <p className="text-ivory-200 leading-relaxed font-mono text-[11px]">
                {currentMeme.educationalConcept}
              </p>
            </div>
          </div>
        )}

        {/* Memory Anchor Box for Exams */}
        <div className="p-3.5 rounded-xl bg-[#0B0F19] border border-champagne-400/25 text-xs space-y-1">
          <span className="text-[10px] font-bold text-champagne-400 uppercase tracking-wider flex items-center gap-1">
            <Zap className="w-3 h-3 text-champagne-400" />
            Exam Recall Anchor:
          </span>
          <p className="text-ivory-100 font-semibold leading-relaxed">
            {currentMeme.memoryAnchor}
          </p>
        </div>

      </div>

      {/* Navigation Controls: Prev / Next */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 disabled:opacity-30 border border-turquoise-500/20 text-ivory-200 text-xs font-bold transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Meme</span>
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === filteredMemes.length - 1}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-gradient-to-r from-turquoise-500 to-emerald-600 hover:from-turquoise-400 hover:to-emerald-500 disabled:opacity-30 text-white text-xs font-extrabold transition-all shadow-glow-turquoise cursor-pointer"
        >
          <span>Next Meme</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. CUSTOM MEME CREATOR MODAL */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="clean-card w-full max-w-xl flex flex-col bg-[#0F172A] border border-turquoise-500/40 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-6">
            
            <div className="flex items-center justify-between border-b border-turquoise-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-turquoise-400" />
                <h3 className="text-base font-bold text-ivory-50">Create Custom Study Meme</h3>
              </div>
              <button
                onClick={() => setIsCreatorOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-ivory-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Select Topic */}
              <div className="space-y-1">
                <label className="font-bold text-ivory-100">1. Target Topic</label>
                <select
                  value={customTopicId}
                  onChange={(e) => setCustomTopicId(e.target.value)}
                  className="w-full bg-[#0B0F19] border border-turquoise-500/30 rounded-xl px-3 py-2 text-ivory-100 text-xs outline-none focus:border-turquoise-400"
                >
                  {topics.map(t => (
                    <option key={t.id} value={t.id}>{t.name} (Page {t.pageReference})</option>
                  ))}
                </select>
              </div>

              {/* Select Template */}
              <div className="space-y-1">
                <label className="font-bold text-ivory-100">2. Template Format</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['drake-hotline', 'galaxy-brain', 'this-is-fine', 'spiderman-pointing', 'two-buttons', 'distracted-boyfriend', 'expectation-vs-reality'] as MemeTemplate[]).map(tpl => {
                    const info = getTemplateBadge(tpl);
                    const isSelected = customTemplate === tpl;
                    return (
                      <button
                        key={tpl}
                        type="button"
                        onClick={() => setCustomTemplate(tpl)}
                        className={`p-2 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-turquoise-400 bg-turquoise-500/20 text-turquoise-300 shadow-glow-turquoise'
                            : 'border-white/10 bg-[#0B0F19] text-ivory-200/70 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-base block mb-0.5">{info.avatar}</span>
                        <span className="truncate block">{info.label.split(' ')[1] || info.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Captions */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-ivory-100">3. Top Caption</label>
                  <button
                    type="button"
                    onClick={handleRandomizeCreatorJoke}
                    className="text-[10px] text-champagne-300 hover:text-champagne-200 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Lightbulb className="w-3 h-3 text-champagne-400" />
                    <span>Auto-Suggest Joke</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={customTopText}
                  onChange={(e) => setCustomTopText(e.target.value)}
                  placeholder="e.g. Reading 50-page lecture slides:"
                  className="w-full bg-[#0B0F19] border border-turquoise-500/30 rounded-xl px-3 py-2 text-ivory-100 text-xs outline-none focus:border-turquoise-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ivory-100">4. Bottom Caption / Punchline</label>
                <input
                  type="text"
                  value={customBottomText}
                  onChange={(e) => setCustomBottomText(e.target.value)}
                  placeholder="e.g. Understanding the 1-line rule in 30 seconds."
                  className="w-full bg-[#0B0F19] border border-turquoise-500/30 rounded-xl px-3 py-2 text-ivory-100 text-xs outline-none focus:border-turquoise-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-ivory-100">5. Why It's True & Educational Anchor (Optional)</label>
                <input
                  type="text"
                  value={customWhyFunny}
                  onChange={(e) => setCustomWhyFunny(e.target.value)}
                  placeholder="e.g. Always check page principles before writing complex code."
                  className="w-full bg-[#0B0F19] border border-turquoise-500/30 rounded-xl px-3 py-2 text-ivory-100 text-xs outline-none focus:border-turquoise-400"
                />
              </div>

            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-turquoise-500/20">
              <button
                type="button"
                onClick={() => setIsCreatorOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-ivory-200 text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomMeme}
                disabled={!customTopText.trim() || !customBottomText.trim()}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-turquoise-500 to-emerald-600 disabled:opacity-40 text-white text-xs font-black shadow-glow-turquoise cursor-pointer"
              >
                Add Meme to Deck
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. ACCESS TO PREVIOUSLY GENERATED MEMES (GALLERY MODAL) */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="clean-card w-full max-w-4xl max-h-[85vh] flex flex-col bg-[#0F172A] border border-turquoise-500/30 rounded-2xl overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-turquoise-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Images className="w-5 h-5 text-champagne-400" />
                <h3 className="text-base font-bold text-ivory-50">
                  All Generated Study Memes ({memesList.length})
                </h3>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-ivory-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {memesList.map((m, idx) => {
                  const rawGallery = imageMap[m.id] || m.imageUrl;
                  const mImg = (rawGallery && !rawGallery.includes('pollinations.ai'))
                    ? rawGallery
                    : memeArtService.generateMemeSvgDataUri(m);
                  const isCurrent = m.id === currentMeme.id;

                  return (
                    <div 
                      key={m.id}
                      className={`clean-card p-3.5 space-y-2.5 rounded-xl border transition-all ${
                        isCurrent 
                          ? 'border-turquoise-400 bg-turquoise-500/10 shadow-glow-turquoise' 
                          : 'border-turquoise-500/20 bg-[#0B0F19]/80 hover:border-turquoise-400/40'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-turquoise-300 truncate pr-2">
                          {m.topicName}
                        </span>
                        <span className="text-[10px] text-champagne-300 font-mono shrink-0">
                          p.{m.pageReference}
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black flex items-center justify-center border border-white/5">
                        <img 
                          src={mImg} 
                          alt={m.topicName} 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      <div className="space-y-1 text-[11px] leading-tight">
                        <p className="font-bold text-ivory-100 line-clamp-1">{m.topText}</p>
                        <p className="text-turquoise-300 line-clamp-1 font-semibold">{m.bottomText}</p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                        <button
                          onClick={() => {
                            setSelectedTopicId('all');
                            const foundIdx = memesList.findIndex(item => item.id === m.id);
                            if (foundIdx >= 0) setCurrentIndex(foundIdx);
                            setIsGalleryOpen(false);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-turquoise-500/20 hover:bg-turquoise-500/30 text-turquoise-300 text-xs font-semibold cursor-pointer"
                        >
                          View in Studio
                        </button>

                        <button
                          onClick={() => handleDownload(m)}
                          className="px-2 py-1 rounded-lg bg-champagne-400/20 hover:bg-champagne-400/30 text-champagne-300 text-xs font-semibold cursor-pointer"
                          title="Download PNG"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
