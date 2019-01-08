import { Category } from "./../../models/Product";
import { Contact } from "./../../models/Contact";
import { User } from "./../../models/User";
import { Component } from "@angular/core";
import { Salon } from "../../models/Salon";
import { AlertMessage } from "../../models/alertMessage";
import { SalonService } from "../../services/salon.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-maintenance-base-form",
  templateUrl: "./maintenance-base-form.component.html",
  styleUrls: ["./maintenance-base-form.component.css"]
})
export class MaintenanceBaseFormComponent {
  salon: Salon;
  contacts: Contact[];
  categories: Category[];
  users: User[];

  formDivId: string;
  form: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  alerts: AlertMessage[] = [];

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder
  ) {}

  loadSalonInfo() {
    let salonId = this.salonService.currentSalonId;
    this.salonService.getSalonById(salonId).subscribe((salon: Salon) => {
      this.salon = salon;
      this.contacts = this.salon.contact;
      this.categories = this.salon.category;
      this.users = this.salon.user;
    }, this.handleError);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.enableLoading();
      this.mergeSalon();
      this.salonService
        .editSalonInfo(this.salon)
        .subscribe(() => this.handleSuccess(), error => this.handleError(error))
        .add(() => this.disableLoading());
    }
  }

  onClose() {
    this.resetFields();
  }

  showAlertMessage(message: string, isSuccess: boolean) {
    let alert = new AlertMessage(
      isSuccess ? "success" : "danger",
      message,
      this.salonService.alertDefaultTimeout,
      isSuccess
        ? this.salonService.alertDefaultSuccessHeader
        : this.salonService.alertDefaultErrorHeader
    );
    this.showAlertMsg(alert);
  }

  showAlertMsg(alert: AlertMessage) {
    this.alerts.push(alert);
    setTimeout(
      () => this.alerts.splice(this.alerts.indexOf(alert), 1),
      alert.timeout
    ); // removes after a specific time
    this.salonService.scrollToViewById(this.formDivId);
  }

  handleSuccess() {
    this.showAlertMessage(null, true);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return this.salonService.returnToMaintenanceIndex();
    }
    this.displayErrors(error.error);
  }

  displayErrors(error: any) {
    switch (typeof error) {
      case "string":
        this.showAlertMessage(error, false);
        break;
      default:
        Object.keys(error).forEach(key => {
          let errorText = key + ": " + error[key];
          this.showAlertMessage(errorText, false);
        });
        break;
    }
  }

  resetFields() {
    this.loadSalonInfo();
  }

  resetForm() {
    this.form.reset();
  }

  mergeSalon() {
    switch (this.form.value.formType) {
      case "welcome":
        this.salon.welcome = Object.assign(
          {},
          this.salon.welcome,
          this.form.value
        );
        break;
      default:
        this.salon = Object.assign({}, this.salon, this.form.value);
    }
  }

  get fields() {
    return this.form.controls;
  }

  alertThenReloadInfo(alert: AlertMessage) {
    this.showAlertMsg(alert);
    this.loadSalonInfo();
  }

  enableLoading() {
    this.loading = true;
  }

  disableLoading() {
    this.loading = false;
  }
}
