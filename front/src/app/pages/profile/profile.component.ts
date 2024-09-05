import { Component, OnInit } from '@angular/core';
import { NavLayoutComponent } from '../../layouts/nav-layout/nav-layout.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Topic } from '../../interfaces/Topic.interface';
import { TopicsService } from '../../services/topics.service';
import { NgFor, NgIf } from '@angular/common';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavLayoutComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    NgFor,
    NgIf,
    GridLayoutComponent,
    TopicCardComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  public topics: Topic[] = [];
  public showPassword: boolean = false;
  public onErrorSubmit: boolean = false;

  constructor(
    // private topicsService: TopicsService,
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router = router;
    // this.topicsService = topicsService;
    this.sessionService = sessionService;
    this.authService = authService;
  }

  // --- FORM CONTROLS ---

  public profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$'),
    ]),
  });

  public ngOnInit(): void {
    this.authService
      .me()
      .pipe(take(1))
      .subscribe((user: User) => {
        // this.user = user;
        // this.userSubscriptions = user.subscriptions;

        this.profileForm.setValue({
          email: user.email,
          name: user.name,
          password: '',
        });
      });
  }

  logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    // TO DO
  }
}
