import { Component, OnInit } from '@angular/core';
import { NavLayoutComponent } from '../../../../layouts/nav-layout/nav-layout.component';
import { NavigateBackArrowComponent } from '../../../../components/navigate-back-arrow/navigate-back-arrow.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TopicsService } from '../../../topics/services/topics.service';
import { Topic } from '../../../topics/interfaces/Topic.interface';
import { map, Observable, take } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/Post.interface';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    NavLayoutComponent,
    NavigateBackArrowComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatSelectModule,
    MatButtonModule,
    NgFor,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent implements OnInit {
  allTopics: Topic[] | null = [];

  constructor(
    private topicsService: TopicsService,
    private postService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topicsService.getAllTopics().subscribe((topics) => {
      this.allTopics = topics;
    });
  }

  // --- FORM CONTROLS ---
  public newPostForm = new FormGroup({
    topic: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  /**
   * Retrieves all topic names to be rendered in the select input of the create post form.
   *
   * @return {Observable<string[]>} An observable array of topic names.
   */
  getTopicNames(): Observable<string[]> {
    return this.topicsService
      .getAllTopics()
      .pipe(map((topics: Topic[]) => topics.map((topic: Topic) => topic.name)));
  }

  // --- SUBMIT FORM ---
  public onSubmit(): void {
    const postSubmit = this.newPostForm.value as Post;

    if (this.newPostForm.value.topic) {
      this.postService
        .createPost(postSubmit, this.newPostForm.value.topic)
        .pipe(take(1))
        .subscribe(() => this.router.navigate(['feed']));
    }
  }
}
