import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../interfaces/Topic.interface';
import { User } from '../../interfaces/User.interface';
import { TopicsService } from '../../services/topics.service';
import { SessionService } from '../../features/auth/services/session.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-topic-card',
  standalone: true,
  imports: [MatButtonModule, NgIf],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCardComponent {
  @Input() topic!: Topic;
  @Input() user!: User | undefined;

  constructor(
    private topicsService: TopicsService,
    private sessionService: SessionService
  ) {}

  hasSubscribed(topic: Topic): boolean | undefined {
    return this.user?.subscriptions.some((sub) => sub.id === topic.id);
  }

  ngOnInit(): void {
    this.user = this.sessionService.user;
  }

  subscribeToTopic(topic: Topic): void {
    this.topicsService
      .subscribeTopic(topic.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.user?.subscriptions.push(topic);
        },
      });
  }

  unsubscribeFromTopic(topic: Topic): void {
    this.topicsService
      .unsubscribeTopic(topic.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.user!.subscriptions = this.user!.subscriptions.filter(
            (sub) => sub.id !== topic.id
          );
        },
      });
  }
}
