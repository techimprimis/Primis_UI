import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  IonRadioGroup,
  IonRadio,
  IonRange,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  colorPaletteOutline,
  textOutline,
  chevronForwardOutline,
  checkmarkOutline,
} from 'ionicons/icons';

type MenuView = 'main' | 'appearance' | 'text-size';

interface ThemeOption {
  value: string;
  label: string;
}

interface TextSizeOption {
  value: number;
  label: string;
}

@Component({
  selector: 'app-menu',
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
    IonRadioGroup,
    IonRadio,
    IonRange,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  currentView = signal<MenuView>('main');
  
  // Appearance options
  selectedTheme = signal<string>('system');
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

  navigateTo(view: MenuView): void {
    this.currentView.set(view);
  }

  goBack(): void {
    this.currentView.set('main');
  }

  onThemeChange(theme: string): void {
    this.selectedTheme.set(theme);
    this.applyTheme(theme);
  }

  onTextSizeChange(size: number): void {
    this.selectedTextSize.set(size);
    this.applyTextSize(size);
  }

  private applyTheme(theme: string): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else if (theme === 'light') {
      document.body.classList.remove('dark');
    } else {
      // System default
      if (prefersDark.matches) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
    
    // Save preference to localStorage
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
