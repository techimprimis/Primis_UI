import { Component, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';

declare global {
  interface Window {
    handleGoogleLogin: (response: any) => void;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  public themeService = inject(ThemeService); // Injecting your original service
  private zone = inject(NgZone);

  constructor() {
    // Assign the global callback function to a method within our Angular Zone
    window.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin(response: any) {
    // Wrap this in NgZone.run to ensure Angular detects changes properly
    this.zone.run(() => {
      console.log("Google ID Token:", response.credential);
      // You must send this JWT credential to your backend server for verification
      alert("Successfully received Google credential! Check the console.");
    });
  }

  // Initialize the form group
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onLogin() {
    // Correct usage of .valid property
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      console.log('Login Attempt:', { email, password });
      
      // Add your authentication API call here
    }
  }
}