// =========================================================================
// StudyBuddy AI — AI Tutor ("Ask Your Notes") Service
// Strictly grounded in source PDF notes with page citations and out-of-scope alerts
// =========================================================================

import { DocumentNote, AiChatMessage } from '../types';

export interface AskNotesResult {
  answer: string;
  pageCitations: { pageNumber: number; quote?: string }[];
  isOutOfScope: boolean;
}

/**
 * Answers student questions strictly grounded in the document content.
 */
export async function askNotesTutor(
  question: string,
  document: DocumentNote,
  apiKey?: string
): Promise<AskNotesResult> {
  const qClean = question.trim().toLowerCase();
  
  // If user configured a Gemini API Key, try live LLM grounding call
  if (apiKey && apiKey.length > 10) {
    try {
      return await askGeminiTutor(question, document, apiKey);
    } catch (err: any) {
      console.warn('Gemini Tutor failed, falling back to local grounded tutor:', err);
    }
  }

  // Native Source-Grounded Matching Engine
  const matchedPages: { pageNum: number; score: number; snippet: string }[] = [];
  const questionWords = qClean.split(/[\s,?.!]+/).filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'explain', 'tell', 'about', 'your', 'with', 'from', 'this', 'that', 'have', 'does'].includes(w));

  document.rawPages.forEach(page => {
    const pageTextLower = page.text.toLowerCase();
    let score = 0;
    const matchingSentences: string[] = [];

    const sentences = page.text.split(/(?<=[.!?])\s+/);
    sentences.forEach(sentence => {
      const sLower = sentence.toLowerCase();
      let sentenceScore = 0;
      questionWords.forEach(word => {
        if (sLower.includes(word)) sentenceScore += 2;
      });
      if (sentenceScore > 0) {
        score += sentenceScore;
        matchingSentences.push(sentence.trim());
      }
    });

    if (score > 0) {
      matchedPages.push({
        pageNum: page.pageNumber,
        score,
        snippet: matchingSentences.slice(0, 2).join(' ')
      });
    }
  });

  // Sort by relevance score
  matchedPages.sort((a, b) => b.score - a.score);

  // If no pages match or score is negligible, declare out-of-scope to prevent hallucination
  if (matchedPages.length === 0 || matchedPages[0].score < 2) {
    return {
      answer: `⚠️ Based on your uploaded notes for "${document.title}", there is not enough information to answer this specific question. To protect your study accuracy and prevent exam confusion, I do not generate unverified answers. Please check if this concept is covered in a different section of your syllabus!`,
      pageCitations: [],
      isOutOfScope: true
    };
  }

  const bestPage = matchedPages[0];
  const citations = matchedPages.slice(0, 2).map(p => ({
    pageNumber: p.pageNum,
    quote: p.snippet.length > 140 ? p.snippet.slice(0, 140) + '...' : p.snippet
  }));

  const answer = `Based on **Page ${bestPage.pageNum}** of your notes:

${bestPage.snippet}

💡 **Key Takeaway for Exam Revision:**
Review the full context on Page ${bestPage.pageNum}. This concept directly relates to your curriculum learning objectives.`;

  return {
    answer,
    pageCitations: citations,
    isOutOfScope: false
  };
}

async function askGeminiTutor(
  question: string,
  document: DocumentNote,
  apiKey: string
): Promise<AskNotesResult> {
  const context = document.rawPages.map(p => `[PAGE ${p.pageNumber}]\n${p.text}`).join('\n\n').slice(0, 7000);

  const prompt = `You are the StudyBuddy AI Tutor. A student is asking a question about their uploaded notes.
CRITICAL INSTRUCTIONS:
1. Ground your answer EXCLUSIVELY in the provided notes below.
2. If the notes DO NOT contain enough information to answer, you MUST clearly state: "The uploaded notes do not contain enough information to answer this question." Do not make up facts.
3. Cite the exact page number where the information is found.
4. Keep the explanation clear, educational, and encouraging.

Notes Content:
${context}

Student Question: "${question}"`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.1
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini status ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const isOutOfScope = text.toLowerCase().includes('do not contain enough information') || text.toLowerCase().includes('not mentioned in the notes');

  // Extract page numbers mentioned
  const pageMatches = text.match(/page\s+(\d+)/gi) || [];
  const parsedNums: number[] = pageMatches.map((m: string) => parseInt(m.replace(/\D/g, ''), 10));
  const pageNumbers = Array.from(new Set(parsedNums)).filter((n: number) => !isNaN(n) && n >= 1 && n <= document.pageCount);

  return {
    answer: text,
    pageCitations: pageNumbers.map((n: number) => ({ pageNumber: n })),
    isOutOfScope
  };
}
