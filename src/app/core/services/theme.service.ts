import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly THEME_KEY = 'theme-preference';
  private readonly DARK_CLASS = 'ion-palette-dark'; // Ionic's standard dark palette class
  private readonly DARK_THEME: Theme = 'dark';
  private readonly LIGHT_THEME: Theme = 'light';

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let initialTheme: Theme;

    if (savedTheme === 'dark') {
      initialTheme = this.DARK_THEME;
    } else if (savedTheme === 'light') {
      initialTheme = this.LIGHT_THEME;
    } else {
      // 'system' or no preference - use system preference
      initialTheme = prefersDark ? this.DARK_THEME : this.LIGHT_THEME;
    }

    this.setTheme(initialTheme, false);

    // Listen for system theme changes (only if preference is 'system' or not set)
    if (!savedTheme || savedTheme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const currentPref = localStorage.getItem(this.THEME_KEY);
        if (!currentPref || currentPref === 'system') {
          this.setTheme(e.matches ? this.DARK_THEME : this.LIGHT_THEME, false);
        }
      });
    }
  }

  get currentTheme(): Theme {
    return this.document.documentElement.classList.contains(this.DARK_CLASS)
      ? this.DARK_THEME
      : this.LIGHT_THEME;
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === this.DARK_THEME ? this.LIGHT_THEME : this.DARK_THEME);
  }

  setTheme(theme: Theme, savePreference: boolean = true): void {
    const html = this.document.documentElement;
    const body = this.document.body;
    const themeColorMeta = this.document.querySelector('meta[name="theme-color"]');

    // Toggle the Ionic dark palette class on the html element
    if (theme === this.DARK_THEME) {
      html.classList.add(this.DARK_CLASS);
      body.classList.add(this.DARK_CLASS);
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', '#121212');
      }
    } else {
      html.classList.remove(this.DARK_CLASS);
      body.classList.remove(this.DARK_CLASS);
      if (themeColorMeta) {
        themeColorMeta.setAttribute('content', '#ffffff');
      }
    }

    // Save preference if explicitly set by user
    if (savePreference) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }

  isDarkMode(): boolean {
    return this.currentTheme === this.DARK_THEME;
  }
}
