import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { SalonService } from '../services/salon.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AlertMessage } from '../models/alertMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;
  alerts: AlertMessage[] = [];

  constructor(private accountService: AccountService, private salonService: SalonService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.accountService.isUserLoggedIn = false;
    
    this.loginForm = new FormGroup({ 
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.accountService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(res => this.handleLogin(), error => this.handleError(error));
    }
  }

  handleLogin() {
    this.accountService.isUserLoggedIn = true;
    //let returnUrl = this.route.snapshot.paramMap.get('returnUrl');
    this.router.navigate(['maintenance']); 
  }

  handleError(error: HttpErrorResponse) {
    let alert = new AlertMessage('danger', 'Falsche Email oder Passwort');
    this.alerts.push(alert);
    setTimeout(() => this.alerts.splice(this.alerts.indexOf(alert), 1), alert.timeout); // removes after a specific time
    this.loading = false;
  }

  get fields() { return this.loginForm.controls };
}
