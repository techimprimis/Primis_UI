import { Injectable,inject,signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'user';

export interface AuthResponse {
  token: string;
  role: 'user' | 'admin';
  fullName: string;
  email: string;
}

export interface AuthUser {
  name: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root',
})

export class MockAuthService {
  constructor() {}
  
  private router = inject(Router);
  
  private _user = signal<AuthUser | null>(this.loadUser());
  user = this._user.asReadonly();

  private users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin', fullName: 'Admin User' },
    { email: 'user@example.com', password: 'user123', role: 'user', fullName: 'Regular User' }
  ];

  private loadUser(): AuthUser | null {
    const name = localStorage.getItem('auth_name');
    const role = localStorage.getItem('auth_role') as UserRole | null;

    if (!name || !role) return null;
    return { name, role };
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return of(null).pipe(
      delay(500),
      map(() => {
        const user = this.users.find(
          u => u.email === email && u.password === password
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const token = btoa(`${email}:${password}`);

        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_role', user.role);
        localStorage.setItem('auth_name', user.fullName);

        // 🔥 THIS WAS THE MISSING PART
        this._user.set({
          name: user.fullName,
          role: user.role as 'user' | 'admin'
        });

        return {
          token,
          role: user.role as 'user' | 'admin',
          fullName: user.fullName,
          email
        };
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
    //localStorage.clear();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_role');
    localStorage.removeItem('auth_name');
    this._user.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getRole(): 'user' | 'admin' | null {
    return localStorage.getItem('auth_role') as 'user' | 'admin' | null;
  }

  isLoggedIn(): boolean {
    return this._user() !== null;
  }
}