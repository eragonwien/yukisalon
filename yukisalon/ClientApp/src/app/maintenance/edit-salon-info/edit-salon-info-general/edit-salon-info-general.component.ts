import { Component, OnInit, Input } from '@angular/core';
import { MaintenanceBaseEditFormComponent } from '../../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { Salon } from '../../../models/Salon';

@Component({
  selector: 'app-edit-salon-info-general',
  templateUrl: './edit-salon-info-general.component.html',
  styleUrls: ['./edit-salon-info-general.component.css']
})
export class EditSalonInfoGeneralComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  @Input() salon: Salon;

  constructor(public salonService: SalonService, public route: ActivatedRoute) {
    super(salonService, route);
  }

  ngOnInit() {
    this.formDivId = 'edit-salon-general-form';
    this.routeId = this.infoRoute;
  }
}
