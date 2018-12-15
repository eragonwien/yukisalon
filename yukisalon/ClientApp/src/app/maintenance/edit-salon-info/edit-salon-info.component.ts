import { Component, OnInit } from '@angular/core';
import { MaintenanceBaseEditFormComponent } from '../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-salon-info',
  templateUrl: './edit-salon-info.component.html',
  styleUrls: ['./edit-salon-info.component.css']
})
export class EditSalonInfoComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  oneAtATime: boolean = true;
  constructor(public salonService: SalonService, public route: ActivatedRoute) {
    super(salonService, route);
  }

  ngOnInit() {
    this.loadSalonInfo();
  }
}
