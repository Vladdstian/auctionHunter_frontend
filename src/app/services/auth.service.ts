import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { IAuthResponse } from './auth-response.interface';
import { tap, catchError } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { IUserToken } from './user-token.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string) {
    let body = { email, password };
    return this.httpClient
      .post<IAuthResponse>('http://localhost:8080/api/auth/login', body)
      .pipe(
        tap((response: IAuthResponse) => {
          localStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  public register(
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    let body = { firstName, email, password, confirmPassword };
    return this.httpClient
      .post<IAuthResponse>('http://localhost:8080/api/auth/register', body)
      .pipe(
        tap((response: IAuthResponse) => {
          localStorage.setItem('token', response.token);
        }),
        catchError(this.handleError)
      );
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<IUserToken>(token); // Replace IUserToken with your interface
        return decodedToken.user;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    // Redirect to home or other actions
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleError(error: any) {
    // Handle the error appropriately
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
