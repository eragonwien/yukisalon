import { MaintenanceBaseFormModalComponent } from "./../../../shared/maintenance-base-form-modal/maintenance-base-form-modal.component";
import { SalonService } from "./../../../services/salon.service";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { User } from "./../../../models/User";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertMessage } from "./../../../models/AlertMessage";
import { faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-edit-salon-user-modal",
  templateUrl: "./edit-salon-user-modal.component.html",
  styleUrls: ["./edit-salon-user-modal.component.css"]
})
export class EditSalonUserModalComponent
  extends MaintenanceBaseFormModalComponent
  implements OnInit {
  @Input() user: User;

  isCreate: boolean = false;
  showPassword: boolean = false;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder, activeModal);
  }

  ngOnInit() {
    this.isCreate = this.user.id == null;
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.user.id, [Validators.required]],
      salonId: [this.user.salonId, [Validators.required]],
      roleId: [this.user.roleId, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      description: [this.user.description, [Validators.required]],
      isActive: [this.user.isActive, [Validators.required]],
      isDisplayed: [this.user.isDisplayed, [Validators.required]],
      extraInfo: [this.user.extraInfo]
    });

    if (this.isCreate) {
      this.form.addControl(
        "password",
        new FormControl(this.user.password, [Validators.required])
      );
      this.form.removeControl("id");
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.enableLoading();
      if (this.isCreate) {
        this.sendCreateForm();
      } else {
        this.sendEditForm();
      }
    }
  }

  sendEditForm() {
    this.salonService
      .editSalonUser(this.form.value)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.emitAlert())
      .add(() => this.disableLoading());
  }

  sendCreateForm() {
    this.salonService
      .createSalonUser(this.form.value)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.emitAlert())
      .add(() => this.disableLoading());
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
