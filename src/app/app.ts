import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { HeaderComponent, FooterComponent } from './shared/components';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // Inject ThemeService to ensure it initializes on app startup
  private themeService = inject(ThemeService);
}
