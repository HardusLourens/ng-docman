import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AIService, WritingSuggestion, AIChatMessage, DocumentAnalysis } from '../../services/ai.service';

@Component({
  selector: 'app-ai-assistant',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss']
})
export class AIAssistantComponent implements OnInit {
  @Input() documentContent: string = '';
  @Output() suggestionApplied = new EventEmitter<{original: string, suggestion: string}>();
  @Output() contentInserted = new EventEmitter<string>();

  selectedTabIndex = 0;
  
  // Suggestions
  suggestions: WritingSuggestion[] = [];
  suggestionsLoading = false;
  selectedText = '';
  
  // Generate
  generatePrompt = '';
  generateType: 'introduction' | 'conclusion' | 'paragraph' | 'outline' = 'paragraph';
  generatedContent = '';
  generateLoading = false;
  
  // Chat
  chatMessage = '';
  chatHistory: AIChatMessage[] = [];
  chatLoading = false;
  
  // Analysis
  analysis: DocumentAnalysis | null = null;
  analysisLoading = false;

  constructor(
    private aiService: AIService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.aiService.chatHistory$.subscribe(history => {
      this.chatHistory = history;
    });
  }

  // Suggestions Tab
  getSuggestions() {
    if (!this.selectedText.trim()) {
      this.snackBar.open('Please select some text to get suggestions', 'Close', { duration: 3000 });
      return;
    }

    this.suggestionsLoading = true;
    this.aiService.getWritingSuggestions(this.selectedText, this.documentContent).subscribe({
      next: (suggestions) => {
        this.suggestions = suggestions;
        this.suggestionsLoading = false;
      },
      error: (error) => {
        console.error('Error getting suggestions:', error);
        this.suggestionsLoading = false;
        this.snackBar.open('Error getting suggestions', 'Close', { duration: 3000 });
      }
    });
  }

  applySuggestion(suggestion: WritingSuggestion) {
    this.suggestionApplied.emit({
      original: suggestion.original,
      suggestion: suggestion.suggestion
    });
    this.suggestions = [];
    this.selectedText = '';
  }

  // Generate Tab
  generateContent() {
    if (!this.generatePrompt.trim()) {
      this.snackBar.open('Please enter a prompt', 'Close', { duration: 3000 });
      return;
    }

    this.generateLoading = true;
    this.aiService.generateContent(this.generatePrompt, this.generateType).subscribe({
      next: (content) => {
        this.generatedContent = content;
        this.generateLoading = false;
      },
      error: (error) => {
        console.error('Error generating content:', error);
        this.generateLoading = false;
        this.snackBar.open('Error generating content', 'Close', { duration: 3000 });
      }
    });
  }

  insertGeneratedContent() {
    this.contentInserted.emit(this.generatedContent);
    this.generatedContent = '';
    this.generatePrompt = '';
  }

  // Chat Tab
  sendChatMessage() {
    if (!this.chatMessage.trim() || !this.documentContent.trim()) {
      this.snackBar.open('Please enter a message and have document content', 'Close', { duration: 3000 });
      return;
    }

    this.chatLoading = true;
    this.aiService.chatWithDocument(this.chatMessage, this.documentContent).subscribe({
      next: (response) => {
        this.chatMessage = '';
        this.chatLoading = false;
      },
      error: (error) => {
        console.error('Error in chat:', error);
        this.chatLoading = false;
        this.snackBar.open('Error processing message', 'Close', { duration: 3000 });
      }
    });
  }

  clearChat() {
    this.aiService.clearChatHistory();
  }

  // Analysis Tab
  analyzeDocument() {
    if (!this.documentContent.trim()) {
      this.snackBar.open('Please add content to analyze', 'Close', { duration: 3000 });
      return;
    }

    this.analysisLoading = true;
    this.aiService.analyzeDocument(this.documentContent).subscribe({
      next: (analysis) => {
        this.analysis = analysis;
        this.analysisLoading = false;
      },
      error: (error) => {
        console.error('Error analyzing document:', error);
        this.analysisLoading = false;
        this.snackBar.open('Error analyzing document', 'Close', { duration: 3000 });
      }
    });
  }

  // Utility methods
  getSuggestionTypeColor(type: string): string {
    switch (type) {
      case 'grammar': return 'primary';
      case 'style': return 'accent';
      case 'clarity': return 'warn';
      case 'tone': return 'basic';
      default: return 'basic';
    }
  }

  formatTimestamp(date: Date): string {
    return new Date(date).toLocaleTimeString();
  }
}

