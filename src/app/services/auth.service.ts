import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  

  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string) {
    let body = {
      email: email,
      password: password,
    };
    return this.httpClient.post('http://localhost:8080/api/auth/login', body);
  }

  public register(
    firstName: string,
    email: string,
    password: string,
    // retypePassword: string
  ) {
    let body = {
      firstName: firstName,
      email: email,
      password: password,
      // retypePassword: retypePassword,
    };
    return this.httpClient.post('http://localhost:8080/api/auth/register', body);
  }
}
