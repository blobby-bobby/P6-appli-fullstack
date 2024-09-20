import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/Post.interface';
import { User } from '../../interfaces/User.interface';
import { PostsService } from '../../services/posts.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: Post;

  constructor(private postService: PostsService) {}

  getPostById(postId: number) {
    return this.postService.getPostById(postId);
  }
}
