import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/Post.interface';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input() post!: Post;
}
