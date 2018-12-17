import { Component, OnInit, Input } from '@angular/core';
import { Salon } from '../../../models/Salon';
import { MaintenanceBaseEditFormComponent } from '../../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-salon-info-opening-hours',
  templateUrl: './edit-salon-info-opening-hours.component.html',
  styleUrls: ['./edit-salon-info-opening-hours.component.css']
})
export class EditSalonInfoOpeningHoursComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  @Input() salon: Salon;

  weekdays: string[] = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

  constructor(public salonService: SalonService, public route: ActivatedRoute) {
    super(salonService, route);
  }

  ngOnInit() {
    this.formDivId = 'edit-salon-opening-hours-form';
  }
}
