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
  IonCard,
  IonCardContent,
  IonNote,
  IonMenuButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  statsChartOutline,
  documentTextOutline,
  walletOutline,
  personOutline,
  notificationsOutline,
} from 'ionicons/icons';

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
    IonCard,
    IonCardContent,
    IonNote,
    IonMenuButton,
    IonButtons,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private router = inject(Router);

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
      personOutline,
      notificationsOutline,
    });
  }

  logout(): void {
    // Clear any stored auth data here
    this.router.navigate(['/login']);
  }
}
