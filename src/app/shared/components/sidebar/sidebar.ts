import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
import {
  homeOutline,
  personOutline,
  settingsOutline,
  informationCircleOutline,
  mailOutline,
  documentTextOutline,
} from 'ionicons/icons';

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
  contentId = input<string>('main-content');
  menuTitle = input<string>('Menu');

  navItems: NavItem[] = [
    { title: 'Home', url: '/', icon: 'home-outline' },
    { title: 'About', url: '/about', icon: 'information-circle-outline' },
    { title: 'Profile', url: '/profile', icon: 'person-outline' },
    { title: 'Contact', url: '/contact', icon: 'mail-outline' },
    { title: 'Documents', url: '/documents', icon: 'document-text-outline' },
    { title: 'Settings', url: '/settings', icon: 'settings-outline' },
  ];

  constructor() {
    addIcons({
      homeOutline,
      personOutline,
      settingsOutline,
      informationCircleOutline,
      mailOutline,
      documentTextOutline,
    });
  }
}
