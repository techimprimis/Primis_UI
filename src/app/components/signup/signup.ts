import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import { personAddOutline } from 'ionicons/icons';

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private router = inject(Router);
  private toastController = inject(ToastController);

  signupSubmit = output<SignupCredentials>();
  googleSignIn = output<void>();

  signupForm: FormGroup;
  isLoading = signal(false);
  isGoogleLoading = signal(false);

  constructor(private fb: FormBuilder) {
    addIcons({ personAddOutline });

    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);

      const valid = hasUpperCase && hasLowerCase && hasNumeric;
      return valid ? null : { passwordStrength: true };
    };
  }

  private passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  async onSubmit(): Promise<void> {
    if (this.signupForm.valid) {
      this.isLoading.set(true);
      const { confirmPassword, ...credentials } = this.signupForm.value;

      // Simulate API call
      setTimeout(async () => {
        this.isLoading.set(false);
        const toast = await this.toastController.create({
          message: 'Account created successfully! Please sign in.',
          duration: 3000,
          position: 'top',
          color: 'success',
        });
        await toast.present();
        this.router.navigate(['/login']);
      }, 1500);

      this.signupSubmit.emit(credentials as SignupCredentials);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  onGoogleSignIn(): void {
    this.isGoogleLoading.set(true);
    this.googleSignIn.emit();
  }

  get fullNameControl() {
    return this.signupForm.get('fullName');
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get passwordControl() {
    return this.signupForm.get('password');
  }

  get confirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }
}
