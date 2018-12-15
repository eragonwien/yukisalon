import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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

  isTabOpen: boolean;
  pickedContact: Contact;
  createContact: boolean = false;

  constructor(public salonService: SalonService, public route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
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
      if (this.createContact) { // creates new contact
        this.salonService.createSalonContact(this.pickedContact).subscribe((response) => {
          this.showAlertMessage(null, true);
        }, this.handleError);
      } else { // edit existing contact
        this.salonService.editSalonContact(this.pickedContact).subscribe((response) => {
          this.showAlertMessage(null, true);
        }, this.handleError);
      }
    }
    this.resetContacts();
  }

  resetContacts() {
    this.loadSalonInfo();
    this.changeDetector.detectChanges();
    this.pickedContact = null;
    this.createContact = false;
  }
  
  onClose() {
    this.resetContacts();
  }

  onRemove() {
    this.salonService.removeSalonContact(this.pickedContact).subscribe((response) => {
      this.showAlertMessage(null, true);
      this.resetContacts();
    }, this.handleError);
  }

  openCreateNewContact() {
    this.createContact = true;
    this.pickedContact = new Contact();
    this.pickedContact.salonId = this.salon.id;
  }
}
