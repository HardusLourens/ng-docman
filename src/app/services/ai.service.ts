import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private apiUrl = 'http://localhost:5000';
  private chatHistory = new BehaviorSubject<AIChatMessage[]>([]);
  
  public chatHistory$ = this.chatHistory.asObservable();

  constructor(private http: HttpClient) {}

  getWritingSuggestions(text: string, context?: string): Observable<WritingSuggestion[]> {
    return this.http.post<any>(`${this.apiUrl}/ai/suggestions`, {
      text,
      context
    }).pipe(
      map(response => response.suggestions)
    );
  }

  generateContent(prompt: string, type: 'introduction' | 'conclusion' | 'paragraph' | 'outline' = 'paragraph'): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/ai/generate`, {
      prompt,
      type
    }).pipe(
      map(response => response.content)
    );
  }

  chatWithDocument(message: string, documentContent: string): Observable<string> {
    const chatHistory = this.chatHistory.value;
    
    return this.http.post<any>(`${this.apiUrl}/ai/chat`, {
      message,
      documentContent,
      chatHistory
    }).pipe(
      map(response => {
        // Add messages to chat history
        const userMessage: AIChatMessage = {
          role: 'user',
          content: message,
          timestamp: new Date()
        };
        
        const assistantMessage: AIChatMessage = {
          role: 'assistant',
          content: response.response,
          timestamp: new Date()
        };
        
        this.chatHistory.next([...chatHistory, userMessage, assistantMessage]);
        return response.response;
      })
    );
  }

  analyzeDocument(content: string): Observable<DocumentAnalysis> {
    return this.http.post<DocumentAnalysis>(`${this.apiUrl}/ai/analyze`, {
      content
    });
  }

  clearChatHistory(): void {
    this.chatHistory.next([]);
  }

  getChatHistory(): AIChatMessage[] {
    return this.chatHistory.value;
  }
}

