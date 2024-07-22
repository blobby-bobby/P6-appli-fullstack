import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import { PostListComponent } from '../../components/post-list/post-list.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    MatMenuModule,
    NavLayoutComponent,
    PostListComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {}
