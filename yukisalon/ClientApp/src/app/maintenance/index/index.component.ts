import { Component, OnInit } from '@angular/core';
import { Salon } from '../../models/Salon';
import { SalonService } from '../../services/salon.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-maintenance-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class MaintenanceIndexComponent implements OnInit {

  salonList: Salon[];

  constructor(private salonService: SalonService, private router: Router) { }

  ngOnInit() {
    this.loadSalonList();
  }

  loadSalonList() {
    this.salonService.SalonList.subscribe((results: Salon[]) => {
      this.salonList = results;
    });
  }

  onSalonPicked(salon: Salon) {
    let navExtras: NavigationExtras = {
      queryParams: { 'id' : salon.id }
    };
    this.router.navigate(['/maintenance/menu'], navExtras);
  }
}
