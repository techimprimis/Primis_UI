import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonButtons,
  IonButton,
  IonAvatar,
  IonChip,
  IonBadge,
  MenuController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  peopleOutline,
  statsChartOutline,
  settingsOutline,
  documentTextOutline,
  notificationsOutline,
  calendarOutline,
  walletOutline,
  logOutOutline,
  menuOutline,
  sunnyOutline,
  moonOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { ThemeService } from '../../core/services/theme.service';

export interface DashboardNavItem {
  title: string;
  url: string;
  icon: string;
  badge?: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
    IonButtons,
    IonButton,
    IonAvatar,
    IonChip,
    IonBadge,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private router = inject(Router);
  private menuController = inject(MenuController);
  protected themeService = inject(ThemeService);

  currentUser = signal({
    name: 'Admin User',
    email: 'admin@techimprimis.com',
    avatar: '',
    role: 'Administrator',
  });

  navItems: DashboardNavItem[] = [
    { title: 'Overview', url: '/dashboard', icon: 'home-outline' },
    { title: 'Analytics', url: '/dashboard/analytics', icon: 'stats-chart-outline' },
    { title: 'Users', url: '/dashboard/users', icon: 'people-outline', badge: 12 },
    { title: 'Calendar', url: '/dashboard/calendar', icon: 'calendar-outline' },
    { title: 'Documents', url: '/dashboard/documents', icon: 'document-text-outline', badge: 3 },
    { title: 'Billing', url: '/dashboard/billing', icon: 'wallet-outline' },
    { title: 'Notifications', url: '/dashboard/notifications', icon: 'notifications-outline', badge: 5 },
    { title: 'Settings', url: '/dashboard/settings', icon: 'settings-outline' },
  ];

  constructor() {
    addIcons({
      homeOutline,
      peopleOutline,
      statsChartOutline,
      settingsOutline,
      documentTextOutline,
      notificationsOutline,
      calendarOutline,
      walletOutline,
      logOutOutline,
      menuOutline,
      sunnyOutline,
      moonOutline,
      personCircleOutline,
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  async toggleMenu(): Promise<void> {
    await this.menuController.toggle('dashboard-menu');
  }

  logout(): void {
    // Clear any stored auth data here
    this.router.navigate(['/login']);
  }
}
