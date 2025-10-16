import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly uri: string = 'http://localhost:5000';

  constructor() {
    this.socket = io(this.uri, { transports: ['websocket'] });
    
    // Add connection event listeners for debugging
    this.socket.on('connect', () => {
      console.log('🔌 Socket connected:', this.socket.id);
    });
    
    this.socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
    });
    
    this.socket.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error);
    });

    // Test if we can receive any events
    this.socket.onAny((eventName, ...args) => {
      console.log('🔌 Socket received event:', eventName, args);
    });
  }

  joinDocument(docId: string): void {
    console.log(`🔌 Joining document room: ${docId}`);
    this.socket.emit('join-document', docId);
  }

  sendEdit(docId: string, content: string): void {
    console.log(`🔌 Sending edit to document: ${docId}`, content.substring(0, 50) + '...');
    this.socket.emit('edit-document', { docId, content });
  }

  onDocumentUpdate(): Observable<string> {
    return new Observable(observer => {
      this.socket.on('document-updated', (content: string) => {
        console.log('🔌 Received document update:', content.substring(0, 50) + '...');
        observer.next(content);
      });
    });
  }

  onFileCreated(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('file-created', (file: any) => {
        observer.next(file);
      });
    });
  }

  onFileDeleted(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('file-deleted', (deletionInfo: any) => {
        console.log('🔌 Socket received file-deleted event:', deletionInfo);
        observer.next(deletionInfo);
      });
    });
  }

}
