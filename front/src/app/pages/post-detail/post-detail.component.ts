import { Component, OnInit } from '@angular/core';
import { Post } from '../../../types/Post';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { NgFor, NgIf } from '@angular/common';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NavLayoutComponent, NgIf, NgFor],
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
    this.route.paramMap.subscribe((params) => {
      const postId = Number(params.get('id'));
      this.post = this.postsService.getPostById(postId);
    });
  }
}
