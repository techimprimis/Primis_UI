import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonToggle,
  IonRadioGroup,
  IonRadio,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-appearance',
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonToggle,
    IonRadioGroup,
    IonRadio,
  ],
  templateUrl: './appearance.html',
  styleUrl: './appearance.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceComponent {
  selectedTheme = 'system';

  themes = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
  ];

  onThemeChange(event: CustomEvent) {
    this.selectedTheme = event.detail.value;
    // Theme change logic can be implemented here
    console.log('Theme changed to:', this.selectedTheme);
  }
}
