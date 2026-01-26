import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { MockAuthService } from './core/services/mock-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header class="header">
      <div class="container">
        <h1>TechImprimis</h1>

        <div class="header-actions">
          <button class="theme-toggle" (click)="theme.toggleTheme()">
            {{ theme.isDarkMode() ? '☀️' : '🌙' }}
          </button>

           <!-- Logout button, only visible if logged in -->
          @if (authService.isLoggedIn()) {
          <button
            class="logout-btn"
            (click)="logout()">
            Logout
          </button>
        }
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .header {
      background: var(--color-surface);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;

      .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
    }

    .header-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg);

      &:hover {
        background: var(--color-border);
      }
    }

    .logout-btn {
      padding: 0.5rem 1rem;
      background-color: #ef4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #dc2626;
      }
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
  `]
})
export class App {
  protected theme = inject(ThemeService);
  protected authService = inject(MockAuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
