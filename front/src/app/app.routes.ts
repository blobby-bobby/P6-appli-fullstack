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
  { path: 'login', title: 'Se connecter', component: LoginComponent },
  { path: 'register', title: "S'inscrire", component: RegisterComponent },
  { path: 'posts', title: 'Bienvenue sur MDD', component: PostsComponent },
  { path: 'posts/:id', title: 'Bonne lecture', component: PostDetailComponent },
  { path: 'topics', title: 'Les thèmes', component: TopicsComponent },
  { path: 'profile', title: 'Mon profil', component: ProfileComponent },
  {
    path: 'create-post',
    title: 'Créer un article',
    component: NewPostComponent,
  },
];
