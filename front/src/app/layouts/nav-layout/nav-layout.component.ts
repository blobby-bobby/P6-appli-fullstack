import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-nav-layout',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './nav-layout.component.html',
  styleUrl: './nav-layout.component.css',
})
export class NavLayoutComponent {
  /**
   * This component is used to display the layout of a loggedIn page, with a responsive navbar
   */
}
