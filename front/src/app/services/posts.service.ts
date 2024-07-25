import { Injectable } from '@angular/core';
import { Post } from '../../types/Post';
import { POSTS } from '../../data/posts-mock';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  getAllPosts(): Post[] {
    // TO DO with an API
    return POSTS;
  }

  getPostById(id: number): Post | undefined {
    // TO DO with an API
    return POSTS.find((post) => post.id === id);
  }

  createPost(post: Post): void {
    // TO DO with an API
    POSTS.push(post);
  }

  getComments(id: number): void {
    // TODO
  }
}
