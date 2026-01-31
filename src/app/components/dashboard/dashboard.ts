import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonNote,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  statsChartOutline,
  documentTextOutline,
  walletOutline,
  sunnyOutline,
  moonOutline,
  personOutline,
  notificationsOutline,
} from 'ionicons/icons';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButtons,
    IonButton,
    IonCard,
    IonCardContent,
    IonNote,
    IonMenuButton,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private router = inject(Router);
  protected themeService = inject(ThemeService);

  currentUser = signal({
    name: 'Admin User',
    email: 'admin',
    role: 'Administrator',
  });

  constructor() {
    addIcons({
      peopleOutline,
      statsChartOutline,
      documentTextOutline,
      walletOutline,
      sunnyOutline,
      moonOutline,
      personOutline,
      notificationsOutline,
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  logout(): void {
    // Clear any stored auth data here
    this.router.navigate(['/login']);
  }
}
