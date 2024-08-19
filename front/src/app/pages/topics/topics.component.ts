import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { Topic } from '../../../interfaces/Topic';
import { TopicsService } from '../../services/topics.service';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    NavLayoutComponent,
    GridLayoutComponent,
    TopicCardComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {
  topics: Topic[] = [];
  topicsService: TopicsService;

  constructor(topicsService: TopicsService) {
    this.topicsService = topicsService;
  }

  getAllTopics() {
    this.topics = this.topicsService.getAllTopics();
  }

  ngOnInit(): void {
    this.getAllTopics();
  }
}
