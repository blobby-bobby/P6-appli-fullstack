import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Post.interface';
import { POSTS } from '../../data/posts-mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private baseUrl = 'http://localhost:3002/api/auth';

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Post[] {
    // TO DO with an API
    return POSTS;
  }

  getPostById(id: number): Post | undefined {
    // TO DO with an API
    return POSTS.find((post) => post.id === id);
  }

  createPost(post: Post, topic_id: number) {
    return this.httpClient.post<{ message: string }>(
      `${this.baseUrl}/topic/${topic_id}/post`,
      post
    );
  }

  getComments(id: number): void {
    // TODO
  }
}
