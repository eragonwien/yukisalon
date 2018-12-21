import { Component, OnInit, Input } from '@angular/core';
import { MaintenanceBaseEditFormComponent } from '../../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { Salon } from '../../../models/Salon';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-salon-info-general',
  templateUrl: './edit-salon-info-general.component.html',
  styleUrls: ['./edit-salon-info-general.component.css']
})
export class EditSalonInfoGeneralComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  @Input() salon: Salon;

  constructor(public salonService: SalonService) {
    super(salonService);
  }

  ngOnInit() {
    this.formDivId = 'edit-salon-general-form';
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({ 
      'name': new FormControl(this.salon.name, [Validators.required]),
      'description': new FormControl(this.salon.description, [Validators.required]),
      'extraInfo': new FormControl(this.salon.extraInfo),
      'formType': new FormControl()
    });
    this.form.get('formType').setValue('general');
  }
}
