import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginUser } from '../models/User';
import { SalonService } from './salon.service';

@Injectable()
export class AccountService {

  private isLoggedIn: boolean;

  constructor(private salonService: SalonService, private http: HttpClient) { }

  login(user: LoginUser) {
    let data = {
      Email: user.email,
      Password: user.password
    };
    let url = this.salonService.BaseUrl + "/Account/Login";
    return this.http.post(url, data, { observe: 'response' });
  }

  get isUserLoggedIn() { 
    if (this.isLoggedIn == undefined || this.isLoggedIn == null) {
      this.isLoggedIn = localStorage.getItem('isUserLoggedIn') == 'true';
    }
    return this.isLoggedIn;
  }

  set isUserLoggedIn(loggedIn: boolean) {
    this.isLoggedIn = loggedIn;
    localStorage.setItem('isUserLoggedIn', this.isLoggedIn.toString());
  }
}
