import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavigateBackArrowComponent } from '../../components/navigate-back-arrow/navigate-back-arrow.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterLink, MatIconModule, NavigateBackArrowComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  @Input() title: string = '';
}
