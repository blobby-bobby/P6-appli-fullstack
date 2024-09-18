import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { NavigateBackArrowComponent } from '../../components/navigate-back-arrow/navigate-back-arrow.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TopicsService } from '../../services/topics.service';
import { Topic } from '../../interfaces/Topic.interface';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    NavLayoutComponent,
    NavigateBackArrowComponent,
    MatFormFieldModule,
    FormsModule,
    MatInput,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  topicOptions: { value: string; viewValue: string }[] = [];

  constructor(private topicsService: TopicsService) {
    this.getTopicNames().subscribe((names: string[]) => {
      this.topicOptions = names.map((name: string) => ({
        value: name,
        viewValue: name,
      }));
    });
  }

  getTopicNames(): Observable<string[]> {
    return this.topicsService
      .getAllTopics()
      .pipe(map((topics: Topic[]) => topics.map((topic: Topic) => topic.name)));
  }
}
