import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonIcon,
  IonInputPasswordToggle,
  IonText,
  IonSpinner,
  ToastController,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline } from 'ionicons/icons';

export interface LoginCredentials {
  email: string;
  password: string;
}

// Dummy admin credentials for testing
const ADMIN_CREDENTIALS = {
  email: 'admin',
  password: 'admin',
};

@Component({
  selector: 'app-email-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonIcon,
    IonInputPasswordToggle,
    IonText,
    IonSpinner,
  ],
  templateUrl: './email-login.html',
  styleUrl: './email-login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailLoginComponent {
  private router = inject(Router);
  private toastController = inject(ToastController);

  loginSubmit = output<LoginCredentials>();

  loginForm: FormGroup;
  isLoading = signal(false);

  constructor(private fb: FormBuilder) {
    addIcons({ mailOutline });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const credentials = this.loginForm.value as LoginCredentials;

      // Check for admin credentials
      if (credentials.email === ADMIN_CREDENTIALS.email &&
          credentials.password === ADMIN_CREDENTIALS.password) {
        // Simulate API delay
        setTimeout(() => {
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        }, 1000);
      } else {
        // Show error toast for invalid credentials
        setTimeout(async () => {
          this.isLoading.set(false);
          const toast = await this.toastController.create({
            message: 'Invalid credentials. Try admin / admin',
            duration: 4000,
            position: 'top',
            color: 'danger',
          });
          await toast.present();
        }, 1000);
      }

      this.loginSubmit.emit(credentials);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }
}
