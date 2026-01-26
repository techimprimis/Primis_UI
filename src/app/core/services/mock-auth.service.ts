import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
  role: 'user' | 'admin';
  fullName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  constructor() {}

  private users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin', fullName: 'Admin User' },
    { email: 'user@example.com', password: 'user123', role: 'user', fullName: 'Regular User' }
  ];

  login(email: string, password: string): Observable<AuthResponse> {
    return of(null).pipe(
      delay(500), // simulate network delay
      map(() => {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid email or password');
        const token = btoa(`${email}:${password}`); // fake token
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_role', user.role);
        localStorage.setItem('auth_name', user.fullName);
        return { token, role: user.role as 'user' | 'admin', fullName: user.fullName, email };
      })
    );
  }

  signup(fullName: string, email: string, password: string): Observable<AuthResponse> {
    return of(null).pipe(
      delay(500),
      map(() => {
        // For demo, assign all new signups as 'user'
        const token = btoa(`${email}:${password}`);
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_role', 'user');
        localStorage.setItem('auth_name', fullName);
        this.users.push({ email, password, role: 'user', fullName });
        return { token, role: 'user', fullName, email };
      })
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_name');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRole(): 'user' | 'admin' | null {
    return localStorage.getItem('auth_role') as 'user' | 'admin' | null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}