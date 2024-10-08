import { Component, OnInit } from '@angular/core';
import { NavLayoutComponent } from '../../../../layouts/nav-layout/nav-layout.component';
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
import { Topic } from '../../../topics/interfaces/Topic.interface';
import { NgFor, NgIf } from '@angular/common';
import { GridLayoutComponent } from '../../../../layouts/grid-layout/grid-layout.component';
import { TopicCardComponent } from '../../../topics/components/topic-card/topic-card.component';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { SessionService } from '../../../auth/services/session.service';
import { AuthService } from '../../../auth/services/auth.service';
import { take } from 'rxjs';
import { User } from '../../interfaces/User.interface';
import { UpdateRequest } from '../../interfaces/UpdateRequest.interface';
import { AuthSuccess } from '../../../auth/interfaces/AuthSuccess.interface';

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
  public showOldPassword: boolean = false;
  public showPassword: boolean = false;
  public showPasswordConfirmation: boolean = false;
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

  /**
   * Fetch the current user's subscriptions and the update profile's form values.
   *
   * @return {void}
   */
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

  // --- SUBMIT ---
  onSubmit(): void {
    const updateProfileRequest = this.profileForm.value as UpdateRequest;
    this.authService.update(updateProfileRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.sessionService.logIn(user);
        });
        this.profileForm.patchValue({
          oldPassword: '',
          password: '',
          password2: '',
        });
      },
      error: (_) => {
        this.onErrorSubmit = true;
      },
    });
  }
}
