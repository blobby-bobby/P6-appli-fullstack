import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TopicsService } from '../../services/topics.service';
import { Topic } from '../../../types/Topic';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../topic-card/topic-card.component';

@Component({
  selector: 'app-topics-list',
  standalone: true,
  imports: [NgIf, NgFor, GridLayoutComponent, TopicCardComponent],
  templateUrl: './topics-list.component.html',
  styleUrl: './topics-list.component.css',
})
export class TopicsListComponent {
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
