import { Topic } from './Topic.interface';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: string;
  subscriptions: Topic[];
}
