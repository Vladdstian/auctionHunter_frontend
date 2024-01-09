import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthResponse } from './auth-response.interface';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string) {
    let body = { email, password };
    return this.httpClient.post('http://localhost:8080/api/auth/login', body);
  }
  
  public register(firstName: string, email: string, password: string, confirmPassword:string) {
    let body = { firstName, email, password , confirmPassword};
    return this.httpClient.post('http://localhost:8080/api/auth/register', body);
  }

  getUserInfo() {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
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
}
