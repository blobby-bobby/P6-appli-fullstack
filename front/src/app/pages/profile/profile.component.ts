import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../interfaces/Topic.interface';
import { TopicsService } from '../../services/topics.service';
import { NgFor, NgIf } from '@angular/common';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavLayoutComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
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

  showPassword: boolean = false;

  constructor(
    private topicsService: TopicsService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.router = router;
    this.topicsService = topicsService;
    this.sessionService = sessionService;
  }

  // getAllTopics() {
  // this.topics = this.topicsService.getAllTopics();
  // }

  // ngOnInit(): void {
  //   this.getAllTopics();
  // }

  logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }
}
