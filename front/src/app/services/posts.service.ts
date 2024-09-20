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

  getAllPosts(userId: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/user/${userId}/posts`);
  }

  getPostDetail(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseUrl}/posts/${postId}`);
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
