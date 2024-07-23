import { Component } from '@angular/core';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AuthLayoutComponent,
    RouterLink,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
