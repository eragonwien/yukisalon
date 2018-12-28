import { SalonService } from "./../../../services/salon.service";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { MaintenanceBaseFormComponent } from "./../../../shared/maintenance-base-form/maintenance-base-form.component";
import { User } from "./../../../models/User";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertMessage } from "./../../../models/AlertMessage";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-edit-salon-user-modal",
  templateUrl: "./edit-salon-user-modal.component.html",
  styleUrls: ["./edit-salon-user-modal.component.css"]
})
export class EditSalonUserModalComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  @Input() user: User;
  @Output() alertEmitter: EventEmitter<AlertMessage> = new EventEmitter();

  activeText: string = this.salonService.activeText;
  inactiveText: string = this.salonService.inactiveText;
  displayedText: string = this.salonService.displayedText;
  createUserText: string = this.salonService.createUserText;
  editUserText: string = this.salonService.editUserText;
  isCreate: boolean = false;
  showPassword: boolean = false;
  showPasswordIcon = faEye;
  hidePasswordIcon = faEyeSlash;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder);
  }

  get values() {
    return this.form.value;
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
    console.log(this.form);
    if (this.form.valid) {
      this.loading = true;
      if (this.isCreate) {
        this.sendCreateForm();
      } else {
        this.sendEditForm();
      }
    }
    this.loading = false;
  }

  sendEditForm() {
    this.salonService
      .editSalonUser(this.form.value)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.emitAlert())
      .add(() => (this.loading = false));
  }

  sendCreateForm() {
    this.salonService
      .createSalonUser(this.form.value)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.emitAlert())
      .add(() => (this.loading = false));
  }

  onModalClosed() {
    this.activeModal.close();
  }

  emitAlert() {
    this.alertEmitter.emit(this.alerts[this.alerts.length - 1]);
    this.onModalClosed();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
