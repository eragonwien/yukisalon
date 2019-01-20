import { Component, OnInit } from "@angular/core";
import { AccountService } from "../services/account.service";
import { SalonService } from '../services/salon.service';

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.css"]
})
export class LogoutComponent implements OnInit {
  constructor(private accountService: AccountService, private salonService: SalonService) { }

  ngOnInit() {
    this.accountService
      .logout()
      .subscribe()
      .add(() => this.salonService.currentSalonId = null)
      .add(() => this.accountService.redirectToLogin());
  }
}
