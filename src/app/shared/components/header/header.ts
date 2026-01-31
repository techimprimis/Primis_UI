import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunnyOutline, moonOutline, documentTextOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { ThemeService } from '../../../core/services/theme.service';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonMenuButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  title = input<string>('TechImprimis');
  showMenu = input<boolean>(true);

  protected themeService = inject(ThemeService);
  protected platformService = inject(PlatformService);

  constructor() {
    addIcons({ sunnyOutline, moonOutline, documentTextOutline, shieldCheckmarkOutline });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
