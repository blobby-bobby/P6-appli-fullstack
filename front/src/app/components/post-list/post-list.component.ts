import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Post } from '../../../types/Post';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent {
  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  getAllPosts() {
    this.posts = this.postsService.getAllPosts();
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getPostById(id: number): void {
    const post = this.postsService.getPostById(id);

    if (post) this.router.navigate(['/posts', id]);
  }
}
