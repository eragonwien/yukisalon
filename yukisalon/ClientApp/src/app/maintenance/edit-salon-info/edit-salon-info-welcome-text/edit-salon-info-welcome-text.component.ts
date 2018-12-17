import { Component, OnInit, Input } from '@angular/core';
import { MaintenanceBaseEditFormComponent } from '../../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Salon } from '../../../models/Salon';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-salon-info-welcome-text',
  templateUrl: './edit-salon-info-welcome-text.component.html',
  styleUrls: ['./edit-salon-info-welcome-text.component.css']
})
export class EditSalonInfoWelcomeTextComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  @Input() salon: Salon;

  constructor(public salonService: SalonService, public route: ActivatedRoute) {
    super(salonService, route);
  }

  ngOnInit() {
    this.formDivId = 'edit-salon-welcome-text-form';
    this.routeId = this.infoRoute;
  }
}
