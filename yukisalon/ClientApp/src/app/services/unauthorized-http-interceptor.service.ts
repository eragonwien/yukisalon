import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { SalonService } from './salon.service';

@Injectable()
export class UnauthorizedHttpInterceptorService implements HttpInterceptor {

  constructor(private salonService: SalonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch(err => {
      if (err instanceof HttpErrorResponse) {
        this.salonService.handleHttpError(err);
      }
      return Observable.throw(err);
    });
  }
}
