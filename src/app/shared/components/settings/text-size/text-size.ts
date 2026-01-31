import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonRange,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-text-size',
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonRange,
  ],
  templateUrl: './text-size.html',
  styleUrl: './text-size.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextSizeComponent {
  textSize = 16;

  textSizeOptions = [
    { value: 12, label: 'Small' },
    { value: 16, label: 'Medium' },
    { value: 20, label: 'Large' },
    { value: 24, label: 'Extra Large' },
  ];

  onTextSizeChange(event: CustomEvent) {
    this.textSize = event.detail.value;
    // Text size change logic can be implemented here
    console.log('Text size changed to:', this.textSize);
  }
}
