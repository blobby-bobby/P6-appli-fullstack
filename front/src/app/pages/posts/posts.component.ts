import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { Post } from '../../interfaces/Post';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    MatMenuModule,
    NavLayoutComponent,
    PostListComponent,
    RouterLink,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts: Post[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.postsService.getAllPosts();
  }

  sortPosts(sortBy: string) {
    if (sortBy === 'date') {
      this.posts = this.posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === 'title') {
      this.posts = this.posts.sort((a, b) => a.title.localeCompare(b.title));
    }
  }
}
