import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {
  IonContent,
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
import { arrowBackOutline, cubeOutline, personAddOutline } from 'ionicons/icons';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  fullName: string;
  email: string;
  password: string;
}

// Dummy admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@techimprimis.com',
  password: 'Admin@123',
};

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    IonContent,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonIcon,
    IonInputPasswordToggle,
    IonText,
    IonSpinner,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private router = inject(Router);
  private toastController = inject(ToastController);

  loginSubmit = output<LoginCredentials>();
  signupSubmit = output<SignupCredentials>();
  googleSignIn = output<void>();

  loginForm: FormGroup;
  signupForm: FormGroup;
  isLoading = signal(false);
  isGoogleLoading = signal(false);
  isSignupLoading = signal(false);
  showSignup = signal(false);

  constructor(private fb: FormBuilder) {
    addIcons({ cubeOutline, personAddOutline, arrowBackOutline });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

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
            message: 'Invalid email or password. Try admin@techimprimis.com / Admin@123',
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

  onGoogleSignIn(): void {
    this.isGoogleLoading.set(true);
    this.googleSignIn.emit();
  }

  onSignupSubmit(): void {
    if (this.signupForm.valid) {
      this.isSignupLoading.set(true);
      const { confirmPassword, ...credentials } = this.signupForm.value;
      this.signupSubmit.emit(credentials as SignupCredentials);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  toggleSignup(): void {
    this.showSignup.update(v => !v);
    this.signupForm.reset();
    this.loginForm.reset();
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get signupFullNameControl() {
    return this.signupForm.get('fullName');
  }

  get signupEmailControl() {
    return this.signupForm.get('email');
  }

  get signupPasswordControl() {
    return this.signupForm.get('password');
  }

  get signupConfirmPasswordControl() {
    return this.signupForm.get('confirmPassword');
  }
}
