import { Component } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [NavLayoutComponent],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css',
})
export class TopicsComponent {}
