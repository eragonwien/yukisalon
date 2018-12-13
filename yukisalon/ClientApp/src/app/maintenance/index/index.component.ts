import { Component, OnInit } from '@angular/core';
import { Salon } from '../../models/Salon';
import { SalonService } from '../../services/salon.service';
import { Router } from '@angular/router';
import { MaintenanceMenuOption as MaintenanceMenuOption } from '../../models/maintenance.menu';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-maintenance-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class MaintenanceIndexComponent implements OnInit {

  salonList: Salon[];
  salon: Salon;
  quickMenu: boolean = false; // if true, then pick a salon if it is the only one

  constructor(private salonService: SalonService, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.resetPickedSalon();
    this.loadSalonList();
  }

  loadSalonList() {
    this.salonService.SalonList.subscribe((results: Salon[]) => {
      this.salonList = results;
        if (this.quickMenu && this.salonList && this.salonList.length === 1) {
        return this.onSalonPicked(this.salonList[0]);
      }
    });
  }

  onSalonPicked(salon: Salon) {
    this.salonService.currentSalonId = salon.id;
    this.router.navigate(['maintenance/menu']);
  }

  resetPickedSalon() {
    this.salonService.currentSalonId = undefined;
  }
}
