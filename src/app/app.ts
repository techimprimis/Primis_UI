import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { MockAuthService } from './core/services/mock-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected theme = inject(ThemeService);
  protected authService = inject(MockAuthService);
  private router = inject(Router);

  menuOpen = false;

  // userName = localStorage.getItem('auth_name') ?? 'User';
  // userRole = (localStorage.getItem('auth_role') ?? 'user').toUpperCase();

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.menuOpen = false;
    this.router.navigate(['/auth/login']);
  }

  userName() {
    return this.authService.user()?.name ?? '';
  }

  userRole() {
    return this.authService.user()?.role.toUpperCase() ?? '';
  } 
}
