import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, logOutOutline } from 'ionicons/icons';

export interface NavItem {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
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
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private router = inject(Router);

  contentId = input<string>('main-content');
  menuTitle = input<string>('Menu');

  constructor() {
    addIcons({
      settingsOutline,
      logOutOutline,
    });
  }

  signOut(): void {
    // Clear any stored auth data here
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
