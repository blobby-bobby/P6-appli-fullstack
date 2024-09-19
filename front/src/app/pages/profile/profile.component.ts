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
import { NgFor, NgIf } from '@angular/common';
import { GridLayoutComponent } from '../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../components/topic-card/topic-card.component';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';
import { User } from '../../interfaces/User.interface';
import { UpdateRequest } from '../../interfaces/UpdateRequest.interface';
import { AuthSuccess } from '../../interfaces/AuthSuccess.interface';

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
  userSubscriptions: Topic[] = [];

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router = router;
    this.sessionService = sessionService;
    this.authService = authService;
  }

  // --- FORM CONTROLS ---

  public profileForm = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.email]),
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(60),
    ]),
    password: new FormControl('', [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$'),
    ]),
    password2: new FormControl('', [
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$'),
    ]),
  });

  public ngOnInit(): void {
    this.authService
      .me()
      .pipe(take(1))
      .subscribe((user: User) => {
        this.userSubscriptions = user.subscriptions;

        this.profileForm.setValue({
          email: user.email,
          name: user.name,
          oldPassword: '',
          password: '',
          password2: '',
        });
      });
  }

  logout(): void {
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    const updateProfileRequest = this.profileForm.value as UpdateRequest;
    this.authService.update(updateProfileRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.sessionService.logIn(user);
        });
      },
      error: (_) => {
        this.onErrorSubmit = true;
      },
    });
  }
}
