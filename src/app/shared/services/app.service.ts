import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = environment.apiUrl;

  loginUser(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json').append('Accept', 'application/json');

    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl + 'auth/adminLogIn'}`, { email, password }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }



  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Error', errorResponse.error);
    } else {
      console.error('Server Error', errorResponse);
    }
    return throwError(() => new Error('Error from login service'));
  }
}
