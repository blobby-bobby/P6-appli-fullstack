import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../interfaces/RegisterRequest.interface';
import { AuthSuccess } from '../interfaces/AuthSuccess.interface';
import { User } from '../interfaces/User.interface';
import { LoginRequest } from '../interfaces/LoginRequest.unterface';
import { UpdateRequest } from '../interfaces/UpdateRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3002/api/auth';

  constructor(private httpClient: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(
      `${this.baseUrl}/login`,
      loginRequest
    );
  }

  register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(
      `${this.baseUrl}/register`,
      registerRequest
    );
  }

  update(updateRequest: UpdateRequest): Observable<AuthSuccess> {
    console.log(updateRequest);
    return this.httpClient.put<AuthSuccess>(
      `${this.baseUrl}/me`,
      updateRequest
    );
  }

  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/me`);
  }
}
