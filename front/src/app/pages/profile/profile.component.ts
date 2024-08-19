import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../../interfaces/Topic';
import { TopicsService } from '../../services/topics.service';
import { NgFor, NgIf } from '@angular/common';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavLayoutComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgFor,
    NgIf,
    GridLayoutComponent,
    TopicCardComponent,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
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
