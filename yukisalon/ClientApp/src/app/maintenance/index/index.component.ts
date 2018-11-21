import { Component, OnInit } from '@angular/core';
import { Salon } from '../../models/Salon';
import { SalonService } from '../../services/salon.service';
import { Router, NavigationExtras } from '@angular/router';
import { MaintenanceMenu } from '../../models/maintenance.menu';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-maintenance-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class MaintenanceIndexComponent implements OnInit {

  salonList: Salon[];
  salon: Salon;
  menus: MaintenanceMenu[];

  constructor(private salonService: SalonService, private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.loadSalonList();
    this.loadMenuList();
    this.resetPickedSalon();
  }

  loadSalonList() {
    this.salonService.SalonList.subscribe((results: Salon[]) => {
      this.salonList = results;
    });
  }

  onSalonPicked(salon: Salon) {
    this.salon = salon;
    this.salonService.currentSalonId = salon.id;
  }

  loadMenuList() {
    this.menus = [
      { name: 'Allgemein', url: '/maintenance/salon' },
      { name: 'Kontakt', url: '/maintenance/contact' },
      { name: 'Benutzer', url: '/maintenance/user' },
    ]
  }

  onMenuPicked(menu: MaintenanceMenu) {
    this.router.navigate([menu.url]);
  }

  resetPickedSalon() {
    this.salonService.currentSalonId = undefined;
  }
}
