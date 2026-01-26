import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { Router } from '@angular/router';
import { MockAuthService } from '../../core/services/mock-auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  public themeService = inject(ThemeService);
  private router = inject(Router);
  private authService = inject(MockAuthService);

  userName = localStorage.getItem('auth_name') || 'User';
}