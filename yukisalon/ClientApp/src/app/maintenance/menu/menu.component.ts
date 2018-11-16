import { Component, OnInit } from '@angular/core';
import { Salon } from '../../models/Salon';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { MaintenanceMenu } from '../../models/maintenance.menu';

@Component({
  selector: 'app-maintenance-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MaintenanceMenuComponent implements OnInit {

  salon: Salon;
  menus: MaintenanceMenu[];

  constructor(private salonService: SalonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadSalonInfo();
    this.loadMenuList();
  }

  loadSalonInfo() {
    let salonId = Number(this.route.snapshot.paramMap.get('id'));
    this.salonService.getSalonById(salonId).subscribe((salon: Salon) => {
      this.salon = salon;
    });
  }

  loadMenuList() {
    this.menus = [
      { name: 'Allgemein', url: '/maintenance/salon' },
      { name: 'Kontakt', url: '/maintenance/contact' },
      { name: 'Benutzer', url: '/maintenance/user' },
    ]
  }

  onMenuPicked(menu: MaintenanceMenu) {
    let navExtras: NavigationExtras = {
      queryParams: { 'id' : this.salon.id }
    };
    this.router.navigate([menu.url], navExtras);
  }
}
