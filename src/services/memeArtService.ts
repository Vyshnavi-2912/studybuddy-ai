import { MemeCard } from '../types';

/**
 * Universal, High-Definition SVG Meme Graphic Generator.
 * Uses 100% pure SVG primitives (<text>, <path>, <circle>, <g>) without <foreignObject>.
 * Guaranteed to render instantly (0ms) in ALL browsers (Chrome, Edge, Firefox, Safari)
 * inside <img> tags, Canvas, or standalone SVG without external network dependencies.
 */
export const memeArtService = {
  /**
   * Generates a self-contained SVG Data URI for any meme card.
   */
  generateMemeSvgDataUri(meme: MemeCard): string {
    const svgString = this.generateMemeSvg(meme);
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  },

  /**
   * Generates clean SVG markup for a meme template.
   */
  generateMemeSvg(meme: MemeCard): string {
    const { template, topText, bottomText, topicName, pageReference } = meme;
    const width = 800;
    const height = 540;

    switch (template) {
      case 'drake-hotline':
        return this.renderDrakeHotline(width, height, topText, bottomText, topicName, pageReference);
      case 'galaxy-brain':
        return this.renderGalaxyBrain(width, height, topText, bottomText, topicName, pageReference);
      case 'this-is-fine':
        return this.renderThisIsFine(width, height, topText, bottomText, topicName, pageReference);
      case 'spiderman-pointing':
        return this.renderSpidermanPointing(width, height, topText, bottomText, topicName, pageReference);
      case 'two-buttons':
        return this.renderTwoButtons(width, height, topText, bottomText, topicName, pageReference);
      case 'distracted-boyfriend':
        return this.renderDistractedBoyfriend(width, height, topText, bottomText, topicName, pageReference);
      case 'expectation-vs-reality':
      default:
        return this.renderExpectationVsReality(width, height, topText, bottomText, topicName, pageReference);
    }
  },

  // 1. DRAKE HOTLINE BLING (Pure Vector & Text)
  renderDrakeHotline(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 38);
    const botLines = wrapText(bot, 38);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B0F19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
        <linearGradient id="rejectGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#450a0a" />
          <stop offset="100%" stop-color="#1e0505" />
        </linearGradient>
        <linearGradient id="acceptGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#064e3b" />
          <stop offset="100%" stop-color="#022c22" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${w}" height="${h}" fill="url(#bgGrad)" />

      <!-- Top Row: Disapproval (Drake looking away, palm up) -->
      <g transform="translate(15, 15)">
        <rect width="770" height="245" rx="16" fill="url(#rejectGrad)" stroke="#ef4444" stroke-width="2" stroke-opacity="0.5" />
        
        <!-- Left: Character Rejecting -->
        <g transform="translate(25, 20)">
          <!-- Circular Frame -->
          <circle cx="85" cy="85" r="75" fill="#f87171" fill-opacity="0.15" stroke="#ef4444" stroke-width="2" />
          <!-- Head looking away -->
          <circle cx="80" cy="70" r="36" fill="#fcd34d" />
          <!-- Hair & Beard -->
          <path d="M 50 65 Q 80 40 110 65" stroke="#451a03" stroke-width="6" fill="none" stroke-linecap="round" />
          <path d="M 55 85 Q 80 110 105 85" fill="#451a03" />
          <!-- Closed grimacing eye -->
          <path d="M 65 68 Q 75 74 85 68" stroke="#78350f" stroke-width="4" fill="none" stroke-linecap="round" />
          <!-- Hand raised (Nope gesture) -->
          <g transform="translate(110, 40)">
            <rect x="0" y="0" width="30" height="50" rx="8" fill="#f59e0b" transform="rotate(-20)" />
            <circle cx="10" cy="10" r="16" fill="#fbbf24" />
          </g>
          <!-- Badge -->
          <rect x="15" y="172" width="140" height="24" rx="6" fill="#ef4444" fill-opacity="0.3" stroke="#ef4444" />
          <text x="85" y="188" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#fca5a5" text-anchor="middle">✋ NOPE / THE OVERKILL</text>
        </g>

        <!-- Right: Text Box -->
        <g transform="translate(210, 25)">
          <rect width="535" height="195" rx="12" fill="#000000" fill-opacity="0.45" stroke="#ef4444" stroke-opacity="0.25" />
          ${renderSvgLines(topLines, 267, 100 - (topLines.length * 12), 26, '#fecaca', 19, 'middle')}
        </g>
      </g>

      <!-- Bottom Row: Approval (Drake smiling and pointing) -->
      <g transform="translate(15, 280)">
        <rect width="770" height="245" rx="16" fill="url(#acceptGrad)" stroke="#10b981" stroke-width="2" stroke-opacity="0.6" />
        
        <!-- Left: Character Approving -->
        <g transform="translate(25, 20)">
          <!-- Circular Frame -->
          <circle cx="85" cy="85" r="75" fill="#34d399" fill-opacity="0.15" stroke="#10b981" stroke-width="2" />
          <!-- Head smiling -->
          <circle cx="85" cy="70" r="36" fill="#fcd34d" />
          <!-- Hair & Beard -->
          <path d="M 55 65 Q 85 40 115 65" stroke="#451a03" stroke-width="6" fill="none" stroke-linecap="round" />
          <path d="M 60 85 Q 85 110 110 85" fill="#451a03" />
          <!-- Happy wink eyes -->
          <path d="M 70 65 Q 76 60 82 65" stroke="#78350f" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <path d="M 90 65 Q 96 60 102 65" stroke="#78350f" stroke-width="3.5" fill="none" stroke-linecap="round" />
          <!-- Big Smile -->
          <path d="M 74 77 Q 86 92 98 77" stroke="#78350f" stroke-width="3.5" fill="#ffffff" stroke-linecap="round" />
          <!-- Pointing Finger -->
          <g transform="translate(115, 60)">
            <rect x="0" y="0" width="45" height="18" rx="8" fill="#f59e0b" />
            <circle cx="5" cy="9" r="12" fill="#fbbf24" />
          </g>
          <!-- Badge -->
          <rect x="15" y="172" width="140" height="24" rx="6" fill="#10b981" fill-opacity="0.3" stroke="#10b981" />
          <text x="85" y="188" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#6ee7b7" text-anchor="middle">👉 PAGE ${page} TRUTH</text>
        </g>

        <!-- Right: Text Box -->
        <g transform="translate(210, 25)">
          <rect width="535" height="195" rx="12" fill="#000000" fill-opacity="0.45" stroke="#10b981" stroke-opacity="0.3" />
          ${renderSvgLines(botLines, 267, 100 - (botLines.length * 12), 26, '#a7f3d0', 20, 'middle')}
        </g>
      </g>
    </svg>`;
  },

  // 2. THIS IS FINE (Cartoon dog in flames)
  renderThisIsFine(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 55);
    const botLines = wrapText(bot, 55);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="fireBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#450a0a" />
          <stop offset="50%" stop-color="#7c2d12" />
          <stop offset="100%" stop-color="#c2410c" />
        </linearGradient>
      </defs>

      <!-- Background with Fire Flames -->
      <rect width="${w}" height="${h}" fill="url(#fireBg)" />

      <!-- Big Dancing Flames -->
      <path d="M 0 540 L 0 300 Q 70 160 120 330 Q 180 120 240 320 Q 320 180 400 350 Q 480 140 560 320 Q 640 190 720 340 Q 770 210 800 290 L 800 540 Z" fill="#ea580c" fill-opacity="0.8" />
      <path d="M 0 540 L 0 380 Q 90 260 170 390 Q 260 270 340 400 Q 440 240 520 390 Q 640 260 720 400 L 800 380 L 800 540 Z" fill="#facc15" fill-opacity="0.9" />

      <!-- Top Text Box -->
      <g transform="translate(30, 15)">
        <rect width="740" height="75" rx="12" fill="#000000" fill-opacity="0.85" stroke="#f97316" stroke-width="2" />
        ${renderSvgLines(topLines, 370, 42 - (topLines.length * 6), 22, '#ffedd5', 16, 'middle')}
      </g>

      <!-- Center Dog & Coffee Table Scene -->
      <g transform="translate(240, 120)">
        <!-- Table -->
        <rect x="80" y="190" width="180" height="16" rx="4" fill="#78350f" stroke="#451a03" stroke-width="2" />
        <rect x="95" y="206" width="12" height="60" fill="#451a03" />
        <rect x="235" y="206" width="12" height="60" fill="#451a03" />
        <!-- White Coffee Mug with Steam -->
        <rect x="200" y="165" width="24" height="25" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />
        <path d="M 224 172 Q 234 178 224 184" stroke="#ffffff" stroke-width="2.5" fill="none" />
        <path d="M 208 158 Q 212 150 208 142" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round" />
        <!-- Dog Body -->
        <ellipse cx="60" cy="190" rx="38" ry="46" fill="#f59e0b" stroke="#78350f" stroke-width="3" />
        <!-- Dog Head -->
        <circle cx="60" cy="120" r="38" fill="#fbbf24" stroke="#78350f" stroke-width="3" />
        <!-- Dog Ears -->
        <ellipse cx="22" cy="120" rx="12" ry="26" fill="#d97706" stroke="#78350f" stroke-width="2" />
        <ellipse cx="98" cy="120" rx="12" ry="26" fill="#d97706" stroke="#78350f" stroke-width="2" />
        <!-- Bowler Hat -->
        <ellipse cx="60" cy="85" rx="34" ry="8" fill="#1e293b" />
        <path d="M 40 85 C 40 55 80 55 80 85 Z" fill="#1e293b" />
        <!-- Calm Eyes -->
        <circle cx="48" cy="115" r="8" fill="#ffffff" stroke="#000" stroke-width="1.5" />
        <circle cx="50" cy="115" r="3.5" fill="#000000" />
        <circle cx="72" cy="115" r="8" fill="#ffffff" stroke="#000" stroke-width="1.5" />
        <circle cx="74" cy="115" r="3.5" fill="#000000" />
        <!-- Unbothered Smile -->
        <path d="M 52 132 Q 60 140 68 132" stroke="#78350f" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <ellipse cx="60" cy="125" rx="6" ry="4" fill="#451a03" />

        <!-- Speech Bubble: "This is fine." -->
        <g transform="translate(130, 60)">
          <path d="M 0 0 L 170 0 C 180 0 180 48 170 48 L 40 48 L 15 68 L 25 48 L 0 48 Z" fill="#ffffff" stroke="#000000" stroke-width="2.5" />
          <text x="85" y="32" font-family="'Comic Sans MS', system-ui, sans-serif" font-size="20" font-weight="900" fill="#000000" text-anchor="middle">"This is fine."</text>
        </g>
      </g>

      <!-- Bottom Text Box -->
      <g transform="translate(30, 440)">
        <rect width="740" height="85" rx="12" fill="#000000" fill-opacity="0.9" stroke="#facc15" stroke-width="2" />
        ${renderSvgLines(botLines, 370, 46 - (botLines.length * 6), 24, '#fef08a', 17, 'middle')}
      </g>
    </svg>`;
  },

  // 3. SPIDER-MAN POINTING AT SPIDER-MAN (Circular Dependency / Conflict)
  renderSpidermanPointing(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 55);
    const botLines = wrapText(bot, 55);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="alleyBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a192f" />
          <stop offset="100%" stop-color="#020c1b" />
        </linearGradient>
      </defs>

      <rect width="${w}" height="${h}" fill="url(#alleyBg)" />

      <!-- Top Text Box -->
      <g transform="translate(30, 15)">
        <rect width="740" height="75" rx="12" fill="#000000" fill-opacity="0.85" stroke="#38bdf8" stroke-width="2" />
        ${renderSvgLines(topLines, 370, 42 - (topLines.length * 6), 22, '#bae6fd', 16, 'middle')}
      </g>

      <!-- Standoff Arena -->
      <g transform="translate(50, 105)">
        <!-- Perspective ground -->
        <polygon points="0,280 700,280 520,200 180,200" fill="#1e293b" stroke="#334155" stroke-width="2" />
        <!-- Van in background -->
        <rect x="240" y="110" width="220" height="95" rx="8" fill="#475569" stroke="#64748b" stroke-width="2" />
        <rect x="260" y="125" width="55" height="35" fill="#94a3b8" />
        <rect x="345" y="125" width="55" height="35" fill="#94a3b8" />

        <!-- Spider-Man LEFT (Pointing Right) -->
        <g transform="translate(70, 50)">
          <!-- Body -->
          <ellipse cx="80" cy="140" rx="30" ry="44" fill="#ef4444" stroke="#000" stroke-width="2.5" />
          <path d="M 55 125 Q 80 165 105 125" fill="#2563eb" />
          <!-- Head -->
          <ellipse cx="80" cy="75" rx="24" ry="30" fill="#ef4444" stroke="#000" stroke-width="2.5" />
          <polygon points="62,72 75,77 70,65" fill="#ffffff" stroke="#000" stroke-width="1.5" />
          <polygon points="98,72 85,77 90,65" fill="#ffffff" stroke="#000" stroke-width="1.5" />
          <!-- Arm pointing right -->
          <path d="M 100 115 L 195 115" stroke="#ef4444" stroke-width="15" stroke-linecap="round" />
          <polygon points="195,108 220,115 195,122" fill="#ef4444" stroke="#000" stroke-width="1.5" />
          <!-- Label -->
          <rect x="15" y="195" width="130" height="25" rx="5" fill="#ef4444" stroke="#ffffff" stroke-width="1.5" />
          <text x="80" y="212" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">PROCESS A</text>
        </g>

        <!-- Spider-Man RIGHT (Pointing Left) -->
        <g transform="translate(410, 50)">
          <!-- Body -->
          <ellipse cx="120" cy="140" rx="30" ry="44" fill="#ef4444" stroke="#000" stroke-width="2.5" />
          <path d="M 95 125 Q 120 165 145 125" fill="#2563eb" />
          <!-- Head -->
          <ellipse cx="120" cy="75" rx="24" ry="30" fill="#ef4444" stroke="#000" stroke-width="2.5" />
          <polygon points="102,72 115,77 110,65" fill="#ffffff" stroke="#000" stroke-width="1.5" />
          <polygon points="138,72 125,77 130,65" fill="#ffffff" stroke="#000" stroke-width="1.5" />
          <!-- Arm pointing left -->
          <path d="M 100 115 L 5 115" stroke="#ef4444" stroke-width="15" stroke-linecap="round" />
          <polygon points="5,108 -20,115 5,122" fill="#ef4444" stroke="#000" stroke-width="1.5" />
          <!-- Label -->
          <rect x="55" y="195" width="130" height="25" rx="5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
          <text x="120" y="212" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">PROCESS B</text>
        </g>
      </g>

      <!-- Bottom Text Box -->
      <g transform="translate(30, 440)">
        <rect width="740" height="85" rx="12" fill="#000000" fill-opacity="0.9" stroke="#38bdf8" stroke-width="2" />
        ${renderSvgLines(botLines, 370, 46 - (botLines.length * 6), 24, '#67e8f9', 17, 'middle')}
      </g>
    </svg>`;
  },

  // 4. TWO BUTTONS (Sweating Engineer / Student Dilemma)
  renderTwoButtons(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 55);
    const botLines = wrapText(bot, 55);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="dilemmaBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e1b4b" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
      </defs>

      <rect width="${w}" height="${h}" fill="url(#dilemmaBg)" />

      <!-- Top Text Box -->
      <g transform="translate(30, 15)">
        <rect width="740" height="70" rx="12" fill="#000000" fill-opacity="0.8" stroke="#a855f7" stroke-width="2" />
        ${renderSvgLines(topLines, 370, 40 - (topLines.length * 6), 22, '#e9d5ff', 16, 'middle')}
      </g>

      <!-- Console with Two Buttons -->
      <g transform="translate(40, 100)">
        <rect width="720" height="185" rx="14" fill="#1e293b" stroke="#475569" stroke-width="2.5" />
        
        <!-- Button A -->
        <g transform="translate(45, 20)">
          <ellipse cx="130" cy="70" rx="95" ry="48" fill="#dc2626" stroke="#991b1b" stroke-width="3" />
          <ellipse cx="130" cy="62" rx="80" ry="38" fill="#ef4444" />
          <text x="130" y="58" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">BUTTON A</text>
          <text x="130" y="76" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fecaca" text-anchor="middle">The Naive Quick Hack</text>
        </g>

        <!-- Button B -->
        <g transform="translate(415, 20)">
          <ellipse cx="130" cy="70" rx="95" ry="48" fill="#dc2626" stroke="#991b1b" stroke-width="3" />
          <ellipse cx="130" cy="62" rx="80" ry="38" fill="#ef4444" />
          <text x="130" y="58" font-family="system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">BUTTON B</text>
          <text x="130" y="76" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#fecaca" text-anchor="middle">Page ${page} Standard</text>
        </g>
      </g>

      <!-- Sweating Face & Bottom Explanation -->
      <g transform="translate(40, 305)">
        <rect width="720" height="215" rx="14" fill="#020617" stroke="#3b82f6" stroke-width="2" />
        
        <!-- Sweating Face Left -->
        <g transform="translate(30, 25)">
          <circle cx="70" cy="70" r="48" fill="#fcd34d" stroke="#b45309" stroke-width="2.5" />
          <!-- Anxious eyes -->
          <circle cx="55" cy="62" r="11" fill="#ffffff" stroke="#000" stroke-width="1.5" />
          <circle cx="58" cy="60" r="5" fill="#000000" />
          <circle cx="85" cy="62" r="11" fill="#ffffff" stroke="#000" stroke-width="1.5" />
          <circle cx="82" cy="60" r="5" fill="#000000" />
          <!-- Sweat Drop -->
          <path d="M 105 45 Q 115 58 110 68 Q 100 68 105 45 Z" fill="#38bdf8" />
          <!-- Nervous mouth -->
          <path d="M 52 92 Q 70 82 88 92" stroke="#78350f" stroke-width="3" fill="none" stroke-linecap="round" />
          <!-- White Towel wiping forehead -->
          <path d="M 85 25 C 115 25 125 50 105 75" stroke="#f8fafc" stroke-width="14" stroke-linecap="round" fill="none" />
          <text x="70" y="140" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#38bdf8" text-anchor="middle">SWEATING DEV</text>
        </g>

        <!-- Text Right -->
        <g transform="translate(190, 25)">
          <rect width="500" height="165" rx="10" fill="#0f172a" stroke="#ffffff" stroke-opacity="0.1" />
          ${renderSvgLines(botLines, 250, 85 - (botLines.length * 10), 24, '#93c5fd', 17, 'middle')}
        </g>
      </g>
    </svg>`;
  },

  // 5. GALAXY BRAIN (Ascending Cognitive Stages)
  renderGalaxyBrain(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 38);
    const botLines = wrapText(bot, 38);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="cosmicBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#020617" />
          <stop offset="50%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e1b4b" />
        </linearGradient>
        <radialGradient id="glowPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00E5C8" stop-opacity="0.9"/>
          <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="${w}" height="${h}" fill="url(#cosmicBg)" />

      <!-- Top Row: Rookie Brain -->
      <g transform="translate(15, 15)">
        <rect width="770" height="245" rx="16" fill="#0f172a" stroke="#334155" stroke-width="2" />
        
        <!-- Left: Normal Head -->
        <g transform="translate(30, 25)">
          <circle cx="80" cy="75" r="55" fill="#1e293b" stroke="#475569" stroke-width="2" />
          <path d="M 55 80 Q 55 55 80 55 Q 105 55 105 80 Q 95 100 80 100 Q 55 100 55 80 Z" fill="#64748b" />
          <text x="80" y="160" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#94a3b8" text-anchor="middle">LEVEL 1: ROOKIE</text>
        </g>

        <!-- Right: Text Box -->
        <g transform="translate(210, 25)">
          <rect width="535" height="195" rx="12" fill="#020617" fill-opacity="0.6" stroke="#ffffff" stroke-opacity="0.08" />
          ${renderSvgLines(topLines, 267, 100 - (topLines.length * 12), 26, '#cbd5e1', 19, 'middle')}
        </g>
      </g>

      <!-- Bottom Row: Glowing Cosmic Super-Brain -->
      <g transform="translate(15, 280)">
        <rect width="770" height="245" rx="16" fill="#1e1b4b" stroke="#00E5C8" stroke-width="2" />
        
        <!-- Left: Cosmic Brain -->
        <g transform="translate(30, 25)">
          <circle cx="80" cy="75" r="70" fill="url(#glowPulse)" />
          <circle cx="80" cy="75" r="50" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
          <!-- Radiant neural beams -->
          <circle cx="80" cy="65" r="22" fill="#00E5C8" fill-opacity="0.5" />
          <line x1="80" y1="40" x2="80" y2="15" stroke="#00E5C8" stroke-width="3" stroke-linecap="round" />
          <line x1="55" y1="50" x2="35" y2="30" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
          <line x1="105" y1="50" x2="125" y2="30" stroke="#f472b6" stroke-width="2.5" stroke-linecap="round" />
          <!-- Third Eye -->
          <polygon points="80,56 86,66 74,66" fill="#ffffff" />
          <text x="80" y="160" font-family="system-ui, sans-serif" font-size="11" font-weight="900" fill="#00E5C8" text-anchor="middle">LEVEL 99: COSMIC TRUTH</text>
        </g>

        <!-- Right: Text Box -->
        <g transform="translate(210, 25)">
          <rect width="535" height="195" rx="12" fill="#020617" fill-opacity="0.7" stroke="#00E5C8" stroke-opacity="0.4" />
          ${renderSvgLines(botLines, 267, 100 - (botLines.length * 12), 26, '#67e8f9', 20, 'middle')}
        </g>
      </g>
    </svg>`;
  },

  // 6. DISTRACTED BOYFRIEND
  renderDistractedBoyfriend(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 55);
    const botLines = wrapText(bot, 55);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="distractBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#062820" />
          <stop offset="100%" stop-color="#021410" />
        </linearGradient>
      </defs>

      <rect width="${w}" height="${h}" fill="url(#distractBg)" />

      <!-- Top Text Box -->
      <g transform="translate(30, 15)">
        <rect width="740" height="70" rx="12" fill="#000000" fill-opacity="0.85" stroke="#10b981" stroke-width="2" />
        ${renderSvgLines(topLines, 370, 40 - (topLines.length * 6), 22, '#a7f3d0', 16, 'middle')}
      </g>

      <!-- 3-Character Comic Panel -->
      <g transform="translate(40, 100)">
        <!-- Girl in Red (The Hyped New Trick) -->
        <g transform="translate(30, 15)">
          <rect width="180" height="280" rx="12" fill="#dc2626" fill-opacity="0.2" stroke="#ef4444" stroke-width="2" />
          <circle cx="90" cy="65" r="34" fill="#fbcfe8" stroke="#be185d" stroke-width="2" />
          <text x="90" y="130" font-family="system-ui, sans-serif" font-size="28" text-anchor="middle">✨💃</text>
          <text x="90" y="180" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#fca5a5" text-anchor="middle">THE SHINY NEW</text>
          <text x="90" y="200" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#fca5a5" text-anchor="middle">HYPED FRAMEWORK</text>
        </g>

        <!-- Boyfriend Looking Back (Me / Junior Dev) -->
        <g transform="translate(270, 15)">
          <rect width="180" height="280" rx="12" fill="#3b82f6" fill-opacity="0.2" stroke="#60a5fa" stroke-width="2" />
          <circle cx="90" cy="65" r="34" fill="#fcd34d" stroke="#b45309" stroke-width="2" />
          <text x="90" y="130" font-family="system-ui, sans-serif" font-size="28" text-anchor="middle">😍👀</text>
          <text x="90" y="180" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#bfdbfe" text-anchor="middle">ME / JUNIOR DEV</text>
          <text x="90" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#93c5fd" text-anchor="middle">Ignoring Fundamentals</text>
        </g>

        <!-- Girlfriend in Shock (Page Standard) -->
        <g transform="translate(510, 15)">
          <rect width="180" height="280" rx="12" fill="#10b981" fill-opacity="0.2" stroke="#34d399" stroke-width="2" />
          <circle cx="90" cy="65" r="34" fill="#fed7aa" stroke="#c2410c" stroke-width="2" />
          <text x="90" y="130" font-family="system-ui, sans-serif" font-size="28" text-anchor="middle">😡📄</text>
          <text x="90" y="180" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#a7f3d0" text-anchor="middle">PAGE ${page} RULES</text>
          <text x="90" y="200" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#6ee7b7" text-anchor="middle">Already Solved This</text>
        </g>
      </g>

      <!-- Bottom Text Box -->
      <g transform="translate(30, 440)">
        <rect width="740" height="85" rx="12" fill="#000000" fill-opacity="0.9" stroke="#10b981" stroke-width="2" />
        ${renderSvgLines(botLines, 370, 46 - (botLines.length * 6), 24, '#6ee7b7', 17, 'middle')}
      </g>
    </svg>`;
  },

  // 7. EXPECTATION VS REALITY
  renderExpectationVsReality(w: number, h: number, top: string, bot: string, topic: string, page: number): string {
    const topLines = wrapText(top, 34);
    const botLines = wrapText(bot, 34);

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" height="100%">
      <defs>
        <linearGradient id="splitBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B0F19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>

      <rect width="${w}" height="${h}" fill="url(#splitBg)" />

      <!-- Left: Expectation -->
      <g transform="translate(20, 20)">
        <rect width="365" height="500" rx="16" fill="#111827" stroke="#10b981" stroke-width="2" />
        <rect x="20" y="15" width="325" height="32" rx="6" fill="#10b981" fill-opacity="0.2" />
        <text x="182" y="36" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#34d399" text-anchor="middle">✨ EXPECTATION (TEXTBOOK)</text>

        <!-- Illustration -->
        <g transform="translate(42, 65)">
          <rect width="280" height="175" rx="10" fill="#0B0F19" stroke="#00E5C8" stroke-width="2" />
          <circle cx="140" cy="65" r="35" fill="#00E5C8" fill-opacity="0.25" />
          <path d="M 115 65 L 165 65 M 140 40 L 140 90" stroke="#00E5C8" stroke-width="4" stroke-linecap="round" />
          <text x="140" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#6ee7b7" text-anchor="middle">100% PERFECT FLOW</text>
        </g>

        <!-- Text Box -->
        <g transform="translate(20, 260)">
          <rect width="325" height="220" rx="10" fill="#000000" fill-opacity="0.5" stroke="#10b981" stroke-opacity="0.2" />
          ${renderSvgLines(topLines, 162, 110 - (topLines.length * 12), 24, '#a7f3d0', 16, 'middle')}
        </g>
      </g>

      <!-- Right: Reality -->
      <g transform="translate(415, 20)">
        <rect width="365" height="500" rx="16" fill="#1c0707" stroke="#ef4444" stroke-width="2" />
        <rect x="20" y="15" width="325" height="32" rx="6" fill="#ef4444" fill-opacity="0.2" />
        <text x="182" y="36" font-family="system-ui, sans-serif" font-size="13" font-weight="900" fill="#f87171" text-anchor="middle">🔥 REALITY (PRODUCTION / EXAM)</text>

        <!-- Illustration -->
        <g transform="translate(42, 65)">
          <rect width="280" height="175" rx="10" fill="#2a0808" stroke="#ef4444" stroke-width="2" />
          <text x="140" y="75" font-family="system-ui, sans-serif" font-size="38" text-anchor="middle">⚠️💥</text>
          <text x="140" y="135" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#fca5a5" text-anchor="middle">EDGE CASES & TIMEOUTS</text>
        </g>

        <!-- Text Box -->
        <g transform="translate(20, 260)">
          <rect width="325" height="220" rx="10" fill="#000000" fill-opacity="0.5" stroke="#ef4444" stroke-opacity="0.2" />
          ${renderSvgLines(botLines, 162, 110 - (botLines.length * 12), 24, '#fecaca', 16, 'middle')}
        </g>
      </g>
    </svg>`;
  }
};

/**
 * Cleanly renders multi-line SVG <text> with <tspan> elements.
 */
function renderSvgLines(
  lines: string[],
  x: number,
  startY: number,
  lineHeight: number,
  fill: string,
  fontSize: number,
  anchor = 'middle'
): string {
  if (!lines || lines.length === 0) return '';
  return `<text x="${x}" y="${startY}" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="800" fill="${fill}" text-anchor="${anchor}">
    ${lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(l)}</tspan>`).join('')}
  </text>`;
}

/**
 * Wraps text into lines based on approximate character width.
 */
function wrapText(text: string, maxCharsPerLine = 35): string[] {
  if (!text) return [];
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxCharsPerLine) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
