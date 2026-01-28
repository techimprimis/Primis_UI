import { ChangeDetectionStrategy, Component, OnInit, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { lockClosedOutline, checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordSubmit = output<ResetPasswordRequest>();

  resetPasswordForm: FormGroup;
  isLoading = signal(false);
  resetSuccess = signal(false);
  tokenValid = signal(true);
  token = signal('');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    addIcons({ lockClosedOutline, checkmarkCircleOutline, alertCircleOutline });

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Get token from URL query params
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.token.set(token);
        this.tokenValid.set(true);
      } else {
        this.tokenValid.set(false);
      }
    });
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
    if (this.resetPasswordForm.valid && this.tokenValid()) {
      this.isLoading.set(true);
      this.resetPasswordSubmit.emit({
        token: this.token(),
        password: this.resetPasswordForm.value.password,
      });

      // Simulate password reset (in real app, this would be handled by parent component)
      setTimeout(() => {
        this.isLoading.set(false);
        this.resetSuccess.set(true);
      }, 1500);
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  get passwordControl() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPasswordControl() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  getPasswordStrength(): { label: string; color: string; width: string } {
    const password = this.passwordControl?.value || '';

    if (!password) {
      return { label: '', color: '', width: '0%' };
    }

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      return { label: 'Weak', color: 'danger', width: '33%' };
    } else if (strength <= 4) {
      return { label: 'Medium', color: 'warning', width: '66%' };
    } else {
      return { label: 'Strong', color: 'success', width: '100%' };
    }
  }
}
