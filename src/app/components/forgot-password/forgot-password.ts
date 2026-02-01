import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
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
  IonText,
  IonSpinner,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, checkmarkCircleOutline, arrowBackOutline } from 'ionicons/icons';

export interface ForgotPasswordRequest {
  email: string;
}

@Component({
  selector: 'app-forgot-password',
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
    IonText,
    IonSpinner,
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  forgotPasswordSubmit = output<ForgotPasswordRequest>();

  forgotPasswordForm: FormGroup;
  isLoading = signal(false);
  emailSent = signal(false);
  submittedEmail = signal('');

  constructor(private fb: FormBuilder) {
    addIcons({ arrowBackOutline, mailOutline, checkmarkCircleOutline });

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading.set(true);
      this.submittedEmail.set(this.forgotPasswordForm.value.email);
      this.forgotPasswordSubmit.emit(this.forgotPasswordForm.value as ForgotPasswordRequest);

      // Simulate email sent (in real app, this would be handled by parent component)
      setTimeout(() => {
        this.isLoading.set(false);
        this.emailSent.set(true);
      }, 1500);
    } else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.emailSent.set(false);
    this.forgotPasswordForm.reset();
  }

  get emailControl() {
    return this.forgotPasswordForm.get('email');
  }
}
