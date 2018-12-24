import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { Salon } from "../../../models/Salon";
import { MaintenanceBaseFormComponent } from "../../../shared/maintenance-base-form/maintenance-base-form.component";
import { SalonService } from "../../../services/salon.service";
import { Contact, OpenHour } from "../../../models/Contact";
import { Validators, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-edit-salon-info-contact",
  templateUrl: "./edit-salon-info-contact.component.html",
  styleUrls: ["./edit-salon-info-contact.component.css"]
})
export class EditSalonInfoContactComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  @Input() salon: Salon;

  isTabOpen: boolean;
  pickedContact: Contact;
  createContact: boolean = false;

  openText: string = this.salonService.openingHourOpenText;
  closedText: string = this.salonService.openingHourClosedText;
  removeText: string = this.salonService.removeText;
  plusIcon = faPlusCircle;
  removeIcon = faTrash;

  constructor(
    public salonService: SalonService,
    private changeDetector: ChangeDetectorRef,
    public formBuilder: FormBuilder
  ) {
    super(salonService, formBuilder);
  }

  ngOnInit() {
    this.formDivId = "edit-salon-contact-form";
  }

  canRemove() {
    return !this.createContact && this.salon.contact.length > 1;
  }

  createOpenHourForm(openHour: OpenHour): FormGroup {
    return this.formBuilder.group({
      id: [openHour.id],
      day: [openHour.day, [Validators.required]],
      isOpen: [openHour.isOpen, [Validators.required]],
      open: openHour.open,
      close: openHour.close
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      address1: [this.pickedContact.address1, Validators.required],
      plz: [this.pickedContact.plz, Validators.required],
      city: [this.pickedContact.city, Validators.required],
      phone: [this.pickedContact.phone, Validators.required],
      facebook: [this.pickedContact.facebook],
      email: [this.pickedContact.email],
      openHour: this.formBuilder.array(
        this.pickedContact.openHour.map(hour => this.createOpenHourForm(hour))
      ),
      formType: "contact"
    });
  }

  mergeContacts() {
    this.pickedContact = Object.assign({}, this.pickedContact, this.form.value);
  }

  onClose() {
    this.resetContacts();
  }

  onContactPicked(contact: Contact) {
    this.pickedContact = contact;
    this.initForm();
  }

  onRemove() {
    this.salonService
      .removeSalonContact(this.pickedContact)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.resetContacts());
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.mergeContacts();
      if (this.createContact) {
        // creates new contact
        this.salonService
          .createSalonContact(this.pickedContact)
          .subscribe(
            () => this.handleSuccess(),
            error => this.handleError(error)
          )
          .add(() => this.resetContacts());
      } else {
        // edit existing contact
        this.salonService
          .editSalonContact(this.pickedContact)
          .subscribe(
            () => this.handleSuccess(),
            error => this.handleError(error)
          )
          .add(() => this.resetContacts());
      }
    }
  }

  openCreateNewContact() {
    this.createContact = true;
    this.pickedContact = new Contact(this.salon.id);
    this.initForm();
  }

  resetContacts() {
    this.loadSalonInfo();
    this.changeDetector.detectChanges();
    this.pickedContact = null;
    this.createContact = false;
    this.submitted = false;
  }

  /* Opening Hour */

  get openHourGroup(): FormArray {
    return this.form.get("openHour") as FormArray;
  }

  addOpenHour() {
    this.openHourGroup.push(this.createOpenHourForm(new OpenHour()));
  }

  removeOpenHour(openHour: OpenHour, index: number) {
    this.openHourGroup.removeAt(index);
    this.pickedContact.openHour.splice(
      this.pickedContact.openHour.findIndex(h => h.id === openHour.id),
      1
    );
  }

  toggleOpeningHour(openHour: OpenHour) {
    this.pickedContact.openHour = this.pickedContact.openHour.map(hour => {
      hour.isOpen = hour.id === openHour.id ? !openHour.isOpen : hour.isOpen;
      return hour;
    });
  }
}
