import { Component, OnInit } from '@angular/core';
import { MaintenanceMenuOption } from '../../models/maintenance.menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-menu',
  templateUrl: './maintenance-menu.component.html',
  styleUrls: ['./maintenance-menu.component.css']
})
export class MaintenanceMenuComponent implements OnInit {

  maintenanceMenu: MaintenanceMenuOption[] = [
    { name: 'Allgemein', url: '/maintenance/salon' },
    { name: 'Produkte', url: '/maintenance/product' },
    { name: 'Benutzer', url: '/maintenance/user' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onMenuOptionPicked(option: MaintenanceMenuOption) {
    this.router.navigate([option.url]);
  }
}
