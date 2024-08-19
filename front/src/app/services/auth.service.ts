import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../interfaces/RegisterRequest.interface';
import { AuthSuccess } from '../../interfaces/AuthSuccess.interface';

const baseUrl = 'http://localhost:3002/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(): void {
    // TO DO
  }

  register(registerRequest: RegisterRequest): Observable<AuthSuccess> {
    return this.http.post<AuthSuccess>(
      `${baseUrl}/auth/register`,
      registerRequest
    );
  }

  update(): void {
    // TO DO
  }

  me(): void {
    // TO DO
  }

  logOut(): void {
    // TO DO
  }
}
