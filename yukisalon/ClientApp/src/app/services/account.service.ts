import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginUser } from '../models/User';
import { SalonService } from './salon.service';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {

  private isLoggedIn: boolean;

  constructor(private salonService: SalonService, private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    let data = {
      Email: email,
      Password: password
    };
    let url = this.salonService.BaseUrl + "/Account/Login";
    return this.http.post(url, data, { observe: 'response' });
  }

  logout() {

  }

  redirectToLogin() {
    this.router.navigate(['maintenance/login']);
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
