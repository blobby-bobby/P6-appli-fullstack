import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/RegisterRequest.interface';
import { AuthSuccess } from '../interfaces/AuthSuccess.interface';
import { User } from '../interfaces/User.interface';
import { LoginRequest } from '../interfaces/LoginRequest.unterface';

const baseUrl = 'http://localhost:3002/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(
      `${baseUrl}/auth/login`,
      loginRequest
    );
  }

  register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(
      `${baseUrl}/auth/register`,
      registerRequest
    );
  }

  update(): void {
    // TO DO
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${baseUrl}/auth/me`);
  }

  logOut(): void {
    // TO DO
  }
}
