import { Component, OnInit } from '@angular/core';
import { SalonService } from '../services/salon.service';
import { Salon } from '../models/Salon';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css'],
})
export class MaintenanceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
