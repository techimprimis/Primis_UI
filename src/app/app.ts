import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent, FooterComponent, SidebarComponent } from './shared/components';
import { ThemeService } from './core/services/theme.service';
import { PlatformService } from './core/services/platform.service';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  // Inject ThemeService to ensure it initializes on app startup
  private themeService = inject(ThemeService);
  // Inject PlatformService for platform detection
  protected platformService = inject(PlatformService);

  ngOnInit(): void {
    // Initialize text size from localStorage
    const savedTextSize = localStorage.getItem('text-size-preference');
    if (savedTextSize) {
      document.documentElement.style.setProperty('--app-font-size', `${savedTextSize}px`);
    }
  }
}
