import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/User';
import { AccountService } from '../services/account.service';
import { SalonService } from '../services/salon.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AccountService, SalonService]
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.loginUser = new LoginUser();
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.accountService.login(this.loginUser).subscribe((response) => {
        this.handleLogin(response);
      });
    } else {
      alert("Invalid");
    }
  }

  handleLogin(response) {
    this.accountService.Test.subscribe((res) => {
      console.log(res);
    });
  }
}
