import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { User } from './features/user/interfaces/User.interface';
import { Observable } from 'rxjs';
import { SessionService } from './features/auth/services/session.service';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  public ngOnInit(): void {
    this.autoLog();
  }

  public $isLogged(): Observable<boolean> {
    return this.sessionService.$isLogged();
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['']);
  }

  public autoLog(): void {
    this.authService.me().subscribe({
      next: (user: User) => {
        this.sessionService.logIn(user);
      },
      error: (_) => {
        this.sessionService.logOut();
      },
    });
  }
}
