import { Injectable } from '@angular/core';
import { Post } from '../../types/Post';
import { POSTS } from '../../data/posts-mock';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  getAllPosts(): Post[] {
    return POSTS;
  }

  getPostById(id: number): Post | undefined {
    return POSTS.find((post) => post.id === id);
  }
}
