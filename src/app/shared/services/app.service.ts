import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginResponse } from '../interfaces/login.interface';
import { TruckData, TruckResponse } from '../interfaces/trucks.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public isLoading = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<LoginResponse>(`${environment.apiUrl}`, { email, password }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getTruckStands(): Observable<TruckData[]> {
    return this.httpClient.get<TruckResponse>(`${environment.truckUrl}`).pipe(
      map((res: TruckResponse) =>
        res.data.filter((truck: TruckData) => truck.latitude != null && truck.longitude != null))
      , catchError(this.handleError));
  }



  private handleError(errorResponse: HttpErrorResponse) {
    console.error(errorResponse);
    return throwError(() => new Error('Error from app service'));
  }
}
