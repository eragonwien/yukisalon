import { Component, OnInit, Input } from '@angular/core';
import { Salon } from '../../../models/Salon';
import { MaintenanceBaseEditFormComponent } from '../../maintenance-base-edit-form/maintenance-base-edit-form.component';
import { SalonService } from '../../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../../models/Contact';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-salon-info-contact',
  templateUrl: './edit-salon-info-contact.component.html',
  styleUrls: ['./edit-salon-info-contact.component.css']
})
export class EditSalonInfoContactComponent extends MaintenanceBaseEditFormComponent implements OnInit {

  @Input() salon: Salon;
  pickedContact: Contact;

  constructor(public salonService: SalonService, public route: ActivatedRoute) {
    super(salonService, route);
  }

  ngOnInit() {
    this.formDivId = 'edit-salon-contact-form';
    this.routeId = this.contactRoute;
  }

  onContactPicked(contact: Contact) {
    this.pickedContact = contact;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.salonService.editSalonContact(this.pickedContact).subscribe((response) => {
        this.showAlertMessage(null, true);
      }, this.handleError);
    }
  }
}
