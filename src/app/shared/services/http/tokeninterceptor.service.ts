import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { AppService } from '../app.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TokenInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private authService: AuthService, private appService: AppService) { }

  setTokenInHeader(request: HttpRequest<any>) {
    const token = this.authService.getTokenFromSession();
    if (!token) {
      return request;
    }
    // If you are calling google maps request then do not add the token.
    if (!request.url.includes("qa2.gim.com.bd")) {
      return request;
    }
    return request.clone({
      setHeaders: {
        authtoken: token,
      }
    });
  }

  handleResponseError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    // Invalid token error
    this.appService.isLoading.next(false);
    if (error.status === 401) {
      this.authService.logoutUser();
    }
    return throwError(() => new Error(error.message));
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.appService.isLoading.next(true);
    if (!request.headers.has('Accept')) {
      request = request.clone({
        setHeaders: { 'Accept': 'application/json' }
      });
    }

    // Handle request
    request = this.setTokenInHeader(request);

    // Handle response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleResponseError(error);
      })
    );
  }
}