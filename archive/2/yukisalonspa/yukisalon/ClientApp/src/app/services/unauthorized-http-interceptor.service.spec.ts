import { TestBed, inject } from '@angular/core/testing';

import { UnauthorizedHttpInterceptorService } from './unauthorized-http-interceptor.service';

describe('UnauthorizedHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthorizedHttpInterceptorService]
    });
  });

  it('should be created', inject([UnauthorizedHttpInterceptorService], (service: UnauthorizedHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
