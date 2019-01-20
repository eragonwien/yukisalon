import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SalonService } from './salon.service';

@Injectable()
export class UnauthorizedHttpInterceptorService implements HttpInterceptor {

  constructor(private salonService: SalonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse) => this.handleError(err)));
  }

  handleError(error: HttpErrorResponse) {
    this.salonService.handleHttpError(error);
    return throwError(error);
  }
}
