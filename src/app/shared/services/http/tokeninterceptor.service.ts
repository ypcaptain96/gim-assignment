import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private session_token_key = 'gim-token';

  constructor(private router: Router) { }

  getTokenFromSession() {
    return sessionStorage.getItem(this.session_token_key)
  }

  setTokenInHeader(request: HttpRequest<any>) {
    const token = this.getTokenFromSession();
    if (!token) {
      return request;
    }
    // If you are calling google maps request then do not add the token.
    if (!request.url.includes("qa2.gim.com.bd/ejogajog/api/v1")) {
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
    if (error.status === 401) {
      console.log('Log out the user out of the system');
      this.router.navigate(['']);
    }
    return throwError(() => new Error(error.message));
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json')
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