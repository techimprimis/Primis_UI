import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { colorPaletteOutline, textOutline } from 'ionicons/icons';
import { AppearanceComponent } from './appearance/appearance';
import { TextSizeComponent } from './text-size/text-size';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    AppearanceComponent,
    TextSizeComponent,
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor() {
    addIcons({
      colorPaletteOutline,
      textOutline,
    });
  }
}
