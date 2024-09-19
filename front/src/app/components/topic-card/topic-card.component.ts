import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../interfaces/Topic.interface';
import { User } from '../../interfaces/User.interface';
import { TopicsService } from '../../services/topics.service';
import { SessionService } from '../../services/session.service';

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
    this.topicsService.suscribeTopic(topic.id);
    this.user?.subscriptions.push(topic);
  }

  unsubscribeFromTopic(topic: Topic): void {
    this.topicsService.unsuscribeTopic(topic.id);
    this.user!.subscriptions = this.user!.subscriptions.filter(
      (sub) => sub.id !== topic.id
    );
  }
}
