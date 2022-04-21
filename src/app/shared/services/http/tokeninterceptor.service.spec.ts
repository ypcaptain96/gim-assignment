import { TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './tokeninterceptor.service';

describe('TokeninterceptorService', () => {
  let service: TokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
