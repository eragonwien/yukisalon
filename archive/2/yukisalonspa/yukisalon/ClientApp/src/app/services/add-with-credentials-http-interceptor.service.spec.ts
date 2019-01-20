import { TestBed, inject } from '@angular/core/testing';

import { AddWithCredentialsHttpInterceptorService } from './add-with-credentials-http-interceptor.service';

describe('AddWithCredentialsHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddWithCredentialsHttpInterceptorService]
    });
  });

  it('should be created', inject([AddWithCredentialsHttpInterceptorService], (service: AddWithCredentialsHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
