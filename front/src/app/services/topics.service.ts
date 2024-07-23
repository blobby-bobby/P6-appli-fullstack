import { Injectable } from '@angular/core';
import { TOPICS } from '../../types/topics-mock';
import { Topic } from '../../types/Topic';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor() {}

  getAllTopics(): Topic[] {
    return TOPICS;
  }
}
