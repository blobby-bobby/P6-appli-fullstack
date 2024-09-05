import { Component, OnInit } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { Topic } from '../../interfaces/Topic.interface';
import { TopicsService } from '../../services/topics.service';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    NavLayoutComponent,
    GridLayoutComponent,
    TopicCardComponent,
    NgIf,
    NgFor,
    HttpClientModule,
  ],
  providers: [TopicsService],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  topics: Topic[] = [];

  constructor(private topicsService: TopicsService) {}

  ngOnInit(): void {
    this.topicsService
      .getAllTopics()
      .subscribe((topics) => (this.topics = topics));
  }
}
