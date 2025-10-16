import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface FileData {
  id?: string;
  name: string;
  content: string;
  ownerId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getAllFiles(): Observable<FileData[]> {
    return this.http.get<FileData[]>(`${this.apiUrl}/files`);
  }

  createFile(file: FileData): Observable<FileData> {
    return this.http.post<FileData>(`${this.apiUrl}/files`, file);
  }

  getFilesByUser(ownerId: string): Observable<FileData[]> {
    return this.http.get<FileData[]>(`${this.apiUrl}/files/${ownerId}`);
  }

  getFileById(fileId: string): Observable<FileData> {
    return this.http.get<FileData>(`${this.apiUrl}/file/${fileId}`);
  }

  updateFile(fileId: string, file: Partial<FileData>): Observable<FileData> {
    return this.http.put<FileData>(`${this.apiUrl}/file/${fileId}`, file);
  }

  deleteFile(fileId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/file/${fileId}`);
  }

}
