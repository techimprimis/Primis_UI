import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { shieldCheckmarkOutline } from 'ionicons/icons';

export interface AdminCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-admin',
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
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  adminSubmit = output<AdminCredentials>();

  adminForm: FormGroup;
  isLoading = signal(false);

  constructor(private fb: FormBuilder) {
    addIcons({ shieldCheckmarkOutline });

    this.adminForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      this.isLoading.set(true);
      this.adminSubmit.emit(this.adminForm.value as AdminCredentials);
    } else {
      this.adminForm.markAllAsTouched();
    }
  }

  get emailControl() {
    return this.adminForm.get('email');
  }

  get passwordControl() {
    return this.adminForm.get('password');
  }
}
