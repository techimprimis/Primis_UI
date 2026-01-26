import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { Router } from '@angular/router';
import { MockAuthService } from '../../core/services/mock-auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  public themeService = inject(ThemeService);
  private router = inject(Router);
  private authService = inject(MockAuthService);

  userName = localStorage.getItem('auth_name') || 'Admin';

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // Mock list of users
  users = [
    { name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { name: 'Regular User', email: 'user@example.com', role: 'user' }
  ];
}