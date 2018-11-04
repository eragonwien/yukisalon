import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginUser } from '../models/User';
import { SalonService } from './salon.service';

@Injectable()
export class AccountService {

  constructor(private salonService: SalonService, private http: HttpClient) { }

  login(user: LoginUser) {
    let data = {
      Email: user.email,
      Password: user.password
    };
    let url = this.salonService.BaseUrl + "/Account/Login";
    return this.http.post(url, data, { observe: 'response' });
  }

  get Test() { return this.http.post(this.salonService.BaseUrl + "/Account/Test", null) }
}
