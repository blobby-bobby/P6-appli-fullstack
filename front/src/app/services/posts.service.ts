import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Post.interface';
import { POSTS } from '../../data/posts-mock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'http://localhost:3002/api';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Post[] {
    // TO DO with an API
    return POSTS;
  }

  getPostById(id: number): Post | undefined {
    // TO DO with an API
    return POSTS.find((post) => post.id === id);
  }

  createPost(post: Post, topic: string): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${this.baseUrl}/topic/${topic}/post`,
      post
    );
  }

  getComments(id: number): void {
    // TODO
  }
}
