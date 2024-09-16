import { Component, OnInit } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { Topic } from '../../interfaces/Topic.interface';
import { TopicsService } from '../../services/topics.service';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { SessionService } from '../../services/session.service';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    NavLayoutComponent,
    GridLayoutComponent,
    TopicCardComponent,
    NgFor,
    NgIf,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [TopicsService],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  allTopics: Topic[] | null = [];
  userSubscriptions: Topic[] = [];
  user: User | undefined;

  constructor(
    private topicsService: TopicsService,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  hasSubscribed(topic: Topic): boolean | undefined {
    return this.user?.subscriptions.some((sub) => sub.id === topic.id);
  }

  ngOnInit(): void {
    this.topicsService.getAllTopics().subscribe((topics) => {
      this.allTopics = topics;
    });

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
