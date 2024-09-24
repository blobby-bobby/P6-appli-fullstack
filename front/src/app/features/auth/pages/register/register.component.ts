import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../../../layouts/auth-layout/auth-layout.component';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { RegisterRequest } from '../../interfaces/RegisterRequest.interface';
import { AuthSuccess } from '../../interfaces/AuthSuccess.interface';
import { User } from '../../../user/interfaces/User.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    MatFormFieldModule,
    MatButtonModule,
    MatIcon,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public showPassword: boolean = false;
  public showPasswordConfirmation: boolean = false;
  public onErrorSubmit: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  //--- FORM VALIDATORS ---
  matchingPasswordsValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('passwordConfirm');
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { notMatching: true }
      : null;
  };

  //--- FORM CONTROLS ---
  registerForm = new FormGroup(
    {
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
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,60}$'),
      ]),
    },
    { validators: this.matchingPasswordsValidator }
  );

  // -- SUBMIT --
  public onSubmit(): void {
    let temp = this.registerForm.value;
    delete temp.passwordConfirm;
    const registerRequest = temp as RegisterRequest;

    this.authService.register(registerRequest).subscribe({
      next: (response: AuthSuccess) => {
        localStorage.setItem('token', response.token);
        this.authService.me().subscribe((user: User) => {
          this.sessionService.logIn(user);
          this.router.navigate(['/feed']);
        });
      },
      error: () => {
        this.onErrorSubmit = true;
      },
    });
  }
}
