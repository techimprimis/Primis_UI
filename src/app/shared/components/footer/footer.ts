import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { IonFooter, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { PlatformService } from '../../../core/services/platform.service';

@Component({
  selector: 'app-footer',
  imports: [IonFooter, IonToolbar, IonTitle],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  copyrightText = input<string>('© 2026 TechImprimis. All rights reserved.');
  protected platformService = inject(PlatformService);
}
