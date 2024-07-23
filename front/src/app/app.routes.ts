import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { NewPostComponent } from './pages/new-post/new-post.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'topics', component: TopicsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-post', component: NewPostComponent },
];
