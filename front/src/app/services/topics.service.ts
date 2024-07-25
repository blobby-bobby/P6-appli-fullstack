import { Injectable } from '@angular/core';
import { Topic } from '../../types/Topic';
import { TOPICS } from '../../data/topics-mock';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor() {}

  getAllTopics(): Topic[] {
    return TOPICS;
  }

  suscribeTopic(id: number): void {
    // TO DO
  }

  unsuscribeTopic(id: number): void {
    // TO DO
  }
}
