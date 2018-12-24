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
    }, this.handleError);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.mergeSalon();
      this.salonService
        .editSalonInfo(this.salon)
        .subscribe(() => this.handleSuccess(), error => this.handleError(error))
        .add(() => (this.loading = false));
    }
    this.loading = false;
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
    let errorText = error.error;
    this.showAlertMessage(errorText, false);
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
}
