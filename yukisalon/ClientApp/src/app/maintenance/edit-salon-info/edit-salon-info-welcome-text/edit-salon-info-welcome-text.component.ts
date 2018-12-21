import { Component, OnInit, Input } from '@angular/core';
import { MaintenanceBaseEditFormComponent } from '../../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../../services/salon.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Salon } from '../../../models/Salon';

@Component({
  selector: 'app-edit-salon-info-welcome-text',
  templateUrl: './edit-salon-info-welcome-text.component.html',
  styleUrls: ['./edit-salon-info-welcome-text.component.css']
})
export class EditSalonInfoWelcomeTextComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  @Input() salon: Salon;

  constructor(public salonService: SalonService) {
    super(salonService);
  }

  ngOnInit() {
    this.formDivId = 'edit-salon-welcome-text-form';
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({ 
      'title': new FormControl(this.salon.welcome.title, [Validators.required]),
      'text1': new FormControl(this.salon.welcome.text1),
      'formType': new FormControl()
    });
    this.form.get('formType').setValue('welcome');
  }
}
