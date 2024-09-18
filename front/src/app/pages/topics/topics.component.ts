import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { TopicsService } from '../../services/topics.service';
import { TopicListComponent } from '../../components/topic-list/topic-list.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [TopicListComponent, NavLayoutComponent],
  providers: [TopicsService],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {}
