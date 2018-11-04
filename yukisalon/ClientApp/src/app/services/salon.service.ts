import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class SalonService {

  constructor(private http: HttpClient) { }

  get BaseUrl() { return window.location.origin; }
  get imagePath() { return this.BaseUrl + "/assets/images/"; }
  get ImagePathPrefix() { return "assets/images/"; }
  get Salon() { return this.http.get(this.BaseUrl + "/api/Salon/0") }
}
