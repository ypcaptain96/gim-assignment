import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/login.interface';
import { TruckResponse } from '../interfaces/trucks.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}`, { email, password }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getTruckStands(): Observable<TruckResponse> {
    return this.httpClient.get<TruckResponse>(`${environment.truckUrl}`).pipe(catchError(this.handleError));
  }



  private handleError(errorResponse: HttpErrorResponse) {
    console.error(errorResponse);
    return throwError(() => new Error('Error from app service'));
  }
}
