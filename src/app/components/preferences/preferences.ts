import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  colorPaletteOutline,
  textOutline,
  chevronForwardOutline,
  checkmarkOutline,
} from 'ionicons/icons';
import { ThemeService } from '../../core/services/theme.service';

type PreferencesView = 'main' | 'appearance' | 'text-size';

interface ThemeOption {
  value: 'light' | 'dark' | 'system';
  label: string;
}

interface TextSizeOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButtons,
    IonBackButton,
  ],
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent implements OnInit {
  private themeService = inject(ThemeService);

  currentView = signal<PreferencesView>('main');

  // Appearance options
  selectedTheme = signal<'light' | 'dark' | 'system'>('system');
  themes: ThemeOption[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
  ];

  // Text size options
  selectedTextSize = signal<number>(16);
  textSizeOptions: TextSizeOption[] = [
    { value: 12, label: 'Small' },
    { value: 16, label: 'Medium' },
    { value: 20, label: 'Large' },
    { value: 24, label: 'Extra Large' },
  ];

  constructor() {
    addIcons({
      colorPaletteOutline,
      textOutline,
      chevronForwardOutline,
      checkmarkOutline,
    });
  }

  ngOnInit(): void {
    // Load saved preferences
    this.loadSavedPreferences();
  }

  private loadSavedPreferences(): void {
    // Load theme preference
    const savedTheme = localStorage.getItem('theme-preference') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      this.selectedTheme.set(savedTheme);
    } else {
      // Determine current theme based on ThemeService
      this.selectedTheme.set(this.themeService.isDarkMode() ? 'dark' : 'light');
    }

    // Load text size preference
    const savedTextSize = localStorage.getItem('text-size-preference');
    if (savedTextSize) {
      this.selectedTextSize.set(parseInt(savedTextSize, 10));
    }
  }

  navigateTo(view: PreferencesView): void {
    this.currentView.set(view);
  }

  goBack(): void {
    this.currentView.set('main');
  }

  onThemeChange(theme: 'light' | 'dark' | 'system'): void {
    this.selectedTheme.set(theme);
    this.applyTheme(theme);
  }

  onTextSizeChange(size: number): void {
    this.selectedTextSize.set(size);
    this.applyTextSize(size);
  }

  private applyTheme(theme: 'light' | 'dark' | 'system'): void {
    if (theme === 'system') {
      // Let system decide
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.themeService.setTheme(prefersDark ? 'dark' : 'light', false);
    } else {
      this.themeService.setTheme(theme, false);
    }

    // Save the user's choice (system, light, or dark) - we handle storage ourselves
    localStorage.setItem('theme-preference', theme);
  }

  private applyTextSize(size: number): void {
    document.documentElement.style.setProperty('--app-font-size', `${size}px`);
    // Save preference to localStorage
    localStorage.setItem('text-size-preference', size.toString());
  }

  getTextSizeLabel(): string {
    const option = this.textSizeOptions.find(opt => opt.value === this.selectedTextSize());
    return option ? option.label : 'Medium';
  }

  getThemeLabel(): string {
    const option = this.themes.find(opt => opt.value === this.selectedTheme());
    return option ? option.label : 'System Default';
  }
}
