import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { TopicsListComponent } from '../../components/topics-list/topics-list.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [NavLayoutComponent, TopicsListComponent],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {}
