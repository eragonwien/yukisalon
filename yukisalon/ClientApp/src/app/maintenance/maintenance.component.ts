import { Component, OnInit } from '@angular/core';
import { SalonService } from '../services/salon.service';
import { Salon } from '../models/Salon';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
  providers: [SalonService]
})
export class MaintenanceComponent implements OnInit {

  salonList: Salon[];

  constructor(private salonService: SalonService) { }

  ngOnInit() {
    this.loadSalonList();
  }

  loadSalonList() {
    this.salonService.SalonList.subscribe((results: Salon[]) => {
      this.salonList = results;
    });
  }

}
