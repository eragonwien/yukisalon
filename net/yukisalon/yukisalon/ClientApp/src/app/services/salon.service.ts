import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getBaseUrl } from '../../main';

@Injectable()
export class SalonService {

  baseUrl: string = window.location.origin;
  imagePath: string = this.baseUrl + "/assets/images/"

  constructor(private http: HttpClient) { }

  getSalon() {
    return this.http.get(this.baseUrl + "/api/Salon");
  }

}
