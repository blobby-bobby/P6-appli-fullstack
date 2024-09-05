import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/RegisterRequest.interface';
import { AuthSuccess } from '../interfaces/AuthSuccess.interface';
import { User } from '../interfaces/User.interface';
import { LoginRequest } from '../interfaces/LoginRequest.unterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3002/api';

  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(
      `${this.baseUrl}/auth/login`,
      loginRequest
    );
  }

  register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(
      `${this.baseUrl}/auth/register`,
      registerRequest
    );
  }

  public update(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    console.log(registerRequest);
    return this.httpClient.patch<AuthSuccess>(
      `${this.baseUrl}/me`,
      registerRequest
    );
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/auth/me`);
  }
}
