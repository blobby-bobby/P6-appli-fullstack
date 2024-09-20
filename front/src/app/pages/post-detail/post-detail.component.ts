import { Component, OnInit } from '@angular/core';
import { Post } from '../../interfaces/Post.interface';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { NgFor, NgIf } from '@angular/common';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigateBackArrowComponent } from '../../components/navigate-back-arrow/navigate-back-arrow.component';

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
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css',
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   const postId = Number(params.get('id'));
    //   this.post = this.postsService.getPostById(postId);
    // });
  }
}
