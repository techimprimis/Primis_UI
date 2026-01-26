import { Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';
import { Router } from '@angular/router';
import { MockAuthService } from '../../../core/services/mock-auth.service';

declare global {
  interface Window {
    handleGoogleLogin: (response: any) => void;
  }
}

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  public themeService = inject(ThemeService);
  private zone = inject(NgZone);

  authMode: 'login' | 'signup' = 'login';

  constructor(private router: Router,private authService: MockAuthService) {
    window.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin(response: any) {
    this.zone.run(() => {
      console.log('Google ID Token:', response.credential);
      alert('Google authentication successful!');
      this.router.navigate(['/dashboard']);
    });
  }

  loginForm: FormGroup = this.fb.group(
    {
      fullName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['']
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    if (!confirm) return null;
    return password === confirm ? null : { passwordMismatch: true };
  }

  toggleAuthMode() {
    this.authMode = this.authMode === 'login' ? 'signup' : 'login';

     this.renderGoogleButton();

    if (this.authMode === 'login') {
      this.loginForm.get('fullName')?.clearValidators();
      this.loginForm.get('confirmPassword')?.clearValidators();
    } else {
      this.loginForm.get('fullName')?.setValidators([Validators.required]);
      this.loginForm.get('confirmPassword')?.setValidators([Validators.required]);
    }

    this.loginForm.get('fullName')?.updateValueAndValidity();
    this.loginForm.get('confirmPassword')?.updateValueAndValidity();
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.value;

    if (this.authMode === 'login') {
      console.log('Login Attempt:', formValue);
      this.authService.login(formValue.email, formValue.password).subscribe({
        next: (res) => {
          console.log('Login Success:', res);
          this.navigateAfterLogin(res.role);
        },
        error: (err) => alert(err.message)
      });
    } else {
      console.log('Signup Attempt:', formValue);
      this.authService.signup(formValue.fullName, formValue.email, formValue.password).subscribe({
        next: (res) => {
          console.log('Signup Success:', res);
          this.navigateAfterLogin(res.role);
        },
        error: (err) => alert(err.message)
      });
    }
  }

  // Reusable functions/methods

  ngAfterViewInit() {
  // Initialize the Google Identity Services SDK
  google.accounts.id.initialize({
      client_id: 'YOUR_CLIENT_ID', // replace with your actual client ID
      callback: this.handleGoogleLogin.bind(this)
    });
    this.renderGoogleButton();
  }

  renderGoogleButton() {
    google.accounts.id.renderButton(
      document.querySelector('.g_id_signin') as HTMLElement,
      {
        theme: 'outline',
        size: 'large',
        text: this.authMode === 'login' ? 'login_with' : 'signup_with',
      }
    );
  }

  navigateAfterLogin(role: 'user' | 'admin') {
    if (role === 'admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/dashboard']);
  }

}