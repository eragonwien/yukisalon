import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable()
export class SalonService {

  constructor(private http: HttpClient, private router: Router) { }

  get BaseUrl() { return window.location.origin; }
  get imagePath() { return this.BaseUrl + "/assets/images/"; }
  get ImagePathPrefix() { return "assets/images/"; }
  get Salon() { return this.http.get(this.BaseUrl + "/api/Salon/0") }
  get SalonList() { return this.http.get(this.BaseUrl + "/api/Salon") }

  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.handle401Error();
    }
  }

  handle401Error() {
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url }});
  }
}
