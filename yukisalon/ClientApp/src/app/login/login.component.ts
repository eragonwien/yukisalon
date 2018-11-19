import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/User';
import { AccountService } from '../services/account.service';
import { SalonService } from '../services/salon.service';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginUser: LoginUser;

  constructor(private accountService: AccountService, private salonService: SalonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.accountService.isUserLoggedIn = false;
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
    this.accountService.isUserLoggedIn = true;
    let returnUrl = this.route.snapshot.paramMap.get('returnUrl');
    this.router.navigate(['maintenance']); 
  }
}
