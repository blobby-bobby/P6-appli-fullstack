import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/Post.interface';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigateBackArrowComponent } from '../../components/navigate-back-arrow/navigate-back-arrow.component';
import { CommentsService } from '../../services/comments.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageDto } from '../../interfaces/MessageDto.interface';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    NavLayoutComponent,
    NgIf,
    NgFor,
    MatFormField,
    MatInput,
    MatButtonModule,
    MatIconModule,
    NavigateBackArrowComponent,
    ReactiveFormsModule,
    DatePipe,
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  post!: Post;
  comments!: MessageDto[];

  // --- FORM CONTROLS ---
  commentForm = new FormGroup({
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postsService.getPostDetail(id).subscribe({
      next: (post) => (this.post = post),
    });

    this.postsService.getComments(id).subscribe({
      next: (comments: MessageDto[]) => (this.comments = comments),
    });
  }

  // --- SUBMIT COMMENT ---
  onSubmit() {
    let temp = this.commentForm.value;
    const commentRequest = temp as { message: string };

    this.commentsService
      .createComment(this.post.id, commentRequest.message)
      .subscribe({
        next: (comment) => {
          this.commentForm.reset();
        },
      });
  }
}
