import OpenAI from 'openai';

// Initialize OpenAI client (only if API key is available)
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

// Helper function to strip markdown code fences from JSON responses
function stripMarkdownCodeFences(text: string): string {
  // Remove markdown code fences like ```json ... ``` or ``` ... ```
  return text.replace(/^```(?:json)?\s*\n?/gm, '').replace(/\n?```\s*$/gm, '').trim();
}

export interface WritingSuggestion {
  original: string;
  suggestion: string;
  reason: string;
  type: 'grammar' | 'style' | 'clarity' | 'tone';
}

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface DocumentAnalysis {
  summary: string;
  keyPoints: string[];
  suggestions: string[];
  readability: string;
  wordCount: number;
  estimatedReadTime: number;
}

export class AIService {
  static async getWritingSuggestions(text: string, context?: string): Promise<WritingSuggestion[]> {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    
    try {
      const prompt = `
        You are a professional writing assistant. Analyze the following text and provide specific, actionable suggestions for improvement.
        
        ${context ? `Context: ${context}` : ''}
        
        Text to analyze: "${text}"
        
        Please provide 2-3 specific suggestions in the following JSON format:
        [
          {
            "original": "exact text from the original",
            "suggestion": "improved version",
            "reason": "brief explanation of why this improves the text",
            "type": "grammar|style|clarity|tone"
          }
        ]
        
        Focus on:
        - Grammar and punctuation
        - Sentence structure and flow
        - Clarity and conciseness
        - Tone and voice consistency
        - Word choice and vocabulary
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const suggestionsText = response.choices[0]?.message?.content || '[]';
      const cleanedText = stripMarkdownCodeFences(suggestionsText);
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Error getting writing suggestions:', error);
      throw new Error('Failed to get writing suggestions');
    }
  }

  static async generateContent(prompt: string, type: 'introduction' | 'conclusion' | 'paragraph' | 'outline' = 'paragraph'): Promise<string> {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    
    try {
      const systemPrompt = `
        You are a professional writing assistant. Generate high-quality content based on the user's prompt.
        
        Type: ${type}
        
        Guidelines:
        - Write in a clear, engaging, and professional tone
        - Ensure content is well-structured and flows naturally
        - Use appropriate vocabulary for the context
        - Be concise but comprehensive
        - Maintain consistency in style and voice
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content');
    }
  }

  static async chatWithDocument(message: string, documentContent: string, chatHistory: AIChatMessage[] = []): Promise<string> {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    
    try {
      const systemPrompt = `
        You are an AI writing assistant helping with document analysis and improvement. 
        You have access to the current document content and can help with:
        - Answering questions about the document
        - Suggesting improvements
        - Explaining concepts
        - Brainstorming ideas
        - Providing writing guidance
        
        Current document content:
        "${documentContent}"
        
        Be helpful, specific, and maintain context of the conversation and document.
      `;

      const messages = [
        { role: "system" as const, content: systemPrompt },
        ...chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
        { role: "user" as const, content: message }
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.6,
        max_tokens: 1000,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error in AI chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  static async analyzeDocument(content: string): Promise<DocumentAnalysis> {
    if (!openai) {
      throw new Error('OpenAI API key not configured');
    }
    
    try {
      const prompt = `
        Analyze the following document and provide a comprehensive analysis:
        
        Document content: "${content}"
        
        Please provide analysis in the following JSON format:
        {
          "summary": "2-3 sentence summary of the document",
          "keyPoints": ["key point 1", "key point 2", "key point 3"],
          "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
          "readability": "assessment of readability (e.g., 'Clear and accessible', 'Somewhat complex')",
          "wordCount": number_of_words,
          "estimatedReadTime": estimated_minutes_to_read
        }
        
        Focus on:
        - Main themes and arguments
        - Structure and organization
        - Writing quality and clarity
        - Areas for improvement
        - Overall readability
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1200,
      });

      const analysisText = response.choices[0]?.message?.content || '{}';
      const cleanedText = stripMarkdownCodeFences(analysisText);
      return JSON.parse(cleanedText);
    } catch (error) {
      console.error('Error analyzing document:', error);
      throw new Error('Failed to analyze document');
    }
  }
}

