import { Injectable } from '@angular/core';
import { Topic } from '../interfaces/Topic.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  private baseUrl = 'http://localhost:3002/api/topic';

  constructor(private httpClient: HttpClient) {}

  getAllTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(this.baseUrl);
  }

  suscribeTopic(id: number): void {
    this.httpClient
      .post(`${this.baseUrl}/${id}/subscribe`, {
        responseType: 'text',
      })
      .pipe(take(1))
      .subscribe();
  }

  unsuscribeTopic(id: number): void {
    this.httpClient
      .delete(`${this.baseUrl}/${id}/subscribe`, { responseType: 'text' })
      .pipe(take(1))
      .subscribe();
  }
}
