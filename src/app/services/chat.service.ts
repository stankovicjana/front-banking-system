import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CandidateAnswer {
  model: string;
  answer: string;
  latencySec: number;
}
export interface ChatResponse {
  question: string;
  azure: CandidateAnswer;
}
export interface SourceItem {
  content: string;
  source: string;
}

export interface ChatResponseWithSources {
  question: string;
  azure: CandidateAnswer;      // ako kasnije dodaš gemini/winner, proširi ovde
  sources: SourceItem[];
}
@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private http: HttpClient) {}
  ask(question: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>('http://localhost:8081/api/chat', {
      question,
    });
  }
  /*askWithContext(question: string): Observable<ChatResponseWithSources> {
    return this.http.post<ChatResponseWithSources>('http://localhost:8081/api/chat/askWithContext', {
      question,
    });
  }*/
  askWithContext(question: string): Observable<ChatResponseWithSources> {
    return this.http.post<ChatResponseWithSources>('http://localhost:8081/api/chat/askBest', {
      question,
    });
  }
}
