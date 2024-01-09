import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const jwtToken = this.authService.getToken();

    if (jwtToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${jwtToken}`),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
