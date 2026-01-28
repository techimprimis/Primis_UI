import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
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
} from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
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
      this.loginSubmit.emit(this.loginForm.value as LoginCredentials);
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
