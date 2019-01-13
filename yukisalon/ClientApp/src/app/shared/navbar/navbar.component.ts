import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { SalonService } from '../../services/salon.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isSalonPicked: boolean = false;  
  isUserLoggedIn: boolean = false;
  isMaintenance: boolean = false;

  constructor(private router:Router, private accountService: AccountService, private salonService: SalonService) { }

  ngOnInit() {
    this.subscribeRouteChange();
  }

  checkSalonPicked() {
    this.isSalonPicked = this.salonService.currentSalonId != null && !isNaN(this.salonService.currentSalonId);
  }

  checkUserLoggedIn() {
    this.isUserLoggedIn = (this.accountService.isUserLoggedIn);
  }

  checkInMaintenance() {
    this.isMaintenance = (this.router.url.startsWith('/maintenance'));
  }

  subscribeRouteChange() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.checkSalonPicked();
        this.checkUserLoggedIn();
        this.checkInMaintenance();
      }
    });
  }
}
