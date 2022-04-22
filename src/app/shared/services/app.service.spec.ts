import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { LoginData, LoginResponse } from '../interfaces/login.interface';
import { TruckData } from '../interfaces/trucks.interface';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('App service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to retrieve truck data from the API via GET', () => {

    const dummyTruckData: TruckData[] = [{
      id: 1,
      latitude: 23.8423489,
      longitude: 90.3590594,
      name: "Dhaka,Mirpur Kalshi",
      nameBn: "ঢাকা, মিরপুর কালশি",
      truckCounts: [{
        count: 1,
        truckType: "Refrigerated Van"
      }, {
        count: 2,
        truckType: "Open Truck"
      }]
    }, {
      id: 2,
      latitude: 23.7278357,
      longitude: 90.4082142,
      name: "Dhaka,Noya Bazar",
      nameBn: "ঢাকা, নয়াবাজার",
      truckCounts: [{
        count: 1,
        truckType: "Dump Truck/Tipper"
      }]
    }];

    service.getTruckStands().subscribe(truckStands => {
      expect(truckStands.length).toBe(2);
      expect(truckStands).toEqual(dummyTruckData);
    });

    const request = httpMock.expectOne(`${environment.truckUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyTruckData);

  });

  it(
    'should perform login correctly', () => {

      const responseObject = {
        success: true,
        message: 'You have successfully signed in.',
      };

      const user: LoginData = {
        email: "assignmentuser@gmail.com",
        password: "qwerty123"
      };

      let response: any = null;

      service.loginUser(user.email, user.password).subscribe({
        next: (receivedResponse: LoginResponse) => {
          response = receivedResponse;
        },
        error: (error: any) => {
        }
      });

      const requestWrapper = httpMock.expectOne({ url: environment.apiUrl });
      requestWrapper.flush(responseObject);


      expect(requestWrapper.request.method).toEqual('POST');
      expect(response?.success).toEqual(responseObject.success);
      expect(response?.message).toEqual(responseObject.message);
    });


});
