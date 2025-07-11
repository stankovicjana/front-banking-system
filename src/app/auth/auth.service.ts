import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
   
    var resp = this.http.post(`${this.apiUrl}/login`, credentials);
    return resp;
    
  }
  getCurrentUser(): Observable<User> {
  return this.http.get<User>('http://localhost:8081/me', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token') 
    }
  });
  }


  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
