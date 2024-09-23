import { Injectable } from '@angular/core';
import { Post } from '../interfaces/Post.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDto } from '../interfaces/MessageDto.interface';

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

  getComments(id: number): Observable<Array<MessageDto>> {
    return this.httpClient.get<Array<MessageDto>>(
      `${this.baseUrl}/posts/${id}/comments`
    );
  }
}
