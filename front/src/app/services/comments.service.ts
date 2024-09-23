import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseUrl = 'http://localhost:3002/api/posts';

  constructor(private httpClient: HttpClient) {}

  createComment(
    postId: number,
    messageRequest: string
  ): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${this.baseUrl}/${postId}/comments`,
      messageRequest
    );
  }
}
