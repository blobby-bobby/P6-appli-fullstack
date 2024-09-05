import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginRequest } from '../../interfaces/LoginRequest.unterface';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { AuthSuccess } from '../../interfaces/AuthSuccess.interface';
import { User } from '../../interfaces/User.interface';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    MatButtonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIcon,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public showPassword: boolean = false;
  public onErrorSubmit: boolean = false;

  constructor(
    private AuthService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  //--- FORM CONTROLS ---
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$'),
    ]),
  });

  // --- SUBMIT ---
  public onSubmit(): void {
    let temp = this.loginForm.value;
    const loginRequest = temp as LoginRequest;

    this.AuthService.login(loginRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.AuthService.me().subscribe((user: User) => {
          this.sessionService.logIn(user);
          this.router.navigate(['/posts']);
        });
      },
      error: () => {
        this.onErrorSubmit = true;
      },
    });
  }
}
