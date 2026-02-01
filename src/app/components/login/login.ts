import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import {
  IonContent,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { cubeOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    IonText,
    IonSpinner,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  googleSignIn = output<void>();
  isGoogleLoading = signal(false);

  constructor() {
    addIcons({ cubeOutline, mailOutline });
  }

  onGoogleSignIn(): void {
    this.isGoogleLoading.set(true);
    this.googleSignIn.emit();
  }
}
