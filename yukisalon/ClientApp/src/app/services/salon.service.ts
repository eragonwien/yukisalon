import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { Salon, EditSalonInfoModel } from '../models/Salon';

@Injectable()
export class SalonService {

  pickedSalonId: number;

  constructor(private http: HttpClient, private router: Router) { }

  get BaseUrl() { return window.location.origin; }
  get imagePath() { return this.BaseUrl + "/assets/images/"; }
  get ImagePathPrefix() { return "assets/images/"; }
  get Salon() { return this.getSalonById(0) }
  get SalonList() { return this.http.get(this.BaseUrl + "/api/Salon") }

  getSalonById(id: number) {
    return this.http.get(this.BaseUrl + "/api/Salon/" + id);
  }

  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.handle401Error();
    }
  }

  handle401Error() {
    this.router.navigate(['maintenance/login'], { queryParams: { returnUrl: this.router.url }});
  }

  editSalonInfo(salon: Salon) {
    let url = this.BaseUrl + "/api/Salon/" + salon.id;
    let model = new EditSalonInfoModel(salon);
    return this.http.put(url, model, { observe: 'response' });
  }
}
