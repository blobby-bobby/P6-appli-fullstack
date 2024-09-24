import { Component, OnInit } from '@angular/core';
import { NavLayoutComponent } from '../../../../layouts/nav-layout/nav-layout.component';
import { TopicsService } from '../../services/topics.service';
import { Topic } from '../../interfaces/Topic.interface';
import { GridLayoutComponent } from '../../../../layouts/grid-layout/grid-layout.component';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [
    NavLayoutComponent,
    GridLayoutComponent,
    NgFor,
    MatButtonModule,
    TopicCardComponent,
  ],
  providers: [TopicsService],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent implements OnInit {
  allTopics: Topic[] | null = [];

  constructor(private topicsService: TopicsService) {}

  ngOnInit(): void {
    this.topicsService.getAllTopics().subscribe({
      next: (topics) => {
        this.allTopics = topics;
      },
    });
  }
}
