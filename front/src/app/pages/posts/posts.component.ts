import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { Post } from '../../interfaces/Post.interface';
import { PostsService } from '../../services/posts.service';
import { RouterLink } from '@angular/router';
import { User } from '../../interfaces/User.interface';
import { NgFor, NgIf } from '@angular/common';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    MatMenuModule,
    NavLayoutComponent,
    RouterLink,
    NgFor,
    NgIf,
    PostCardComponent,
    GridLayoutComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  user?: User;

  constructor(
    private postsService: PostsService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.user;

    this.postsService.getAllPosts(this.user!.id).subscribe((posts) => {
      this.posts = posts;
    });
  }

  sortPosts(sortBy: string) {
    if (this.posts) {
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
}
