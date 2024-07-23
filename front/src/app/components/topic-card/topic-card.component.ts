import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCardComponent {
  @Input() hasSuscribed: boolean = false;
  @Input() name: string = '';
  @Input() description: string = '';
}
