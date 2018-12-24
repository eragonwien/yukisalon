import { SalonService } from "./../../../services/salon.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MaintenanceBaseFormComponent } from "./../../../shared/maintenance-base-form/maintenance-base-form.component";
import { User } from "./../../../models/User";
import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-edit-salon-user-modal",
  templateUrl: "./edit-salon-user-modal.component.html",
  styleUrls: ["./edit-salon-user-modal.component.css"]
})
export class EditSalonUserModalComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  user: User;

  activeText: string = this.salonService.activeText;
  inactiveText: string = this.salonService.inactiveText;
  displayedText: string = this.salonService.displayedText;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder);
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      roleId: [this.user.roleId, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      description: [this.user.description, [Validators.required]],
      isActive: [this.user.isActive, [Validators.required]],
      isDisplayed: [this.user.isDisplayed, [Validators.required]],
      extraInfo: [this.user.extraInfo, [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.salonService
        .editSalonUser(this.form.value)
        .subscribe(() => this.handleSuccess(), error => this.handleError(error))
        .add(() => (this.loading = false));
    }
    this.loading = false;
  }

  get values() {
    return this.form.value;
  }
}
