import { Component, OnInit } from '@angular/core';
import { Salon } from '../../models/Salon';
import { AlertMessage } from '../../models/alertMessage';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-maintenance-base-edit-form',
  templateUrl: './maintenance-base-edit-form.component.html',
  styleUrls: ['./maintenance-base-edit-form.component.css']
})
export class MaintenanceBaseEditFormComponent{

  salon: Salon;
  
  formDivId: string;
  alerts: AlertMessage[] = [];
  alertTimeout: number = 10 * 1000;
  alertDismissible : boolean = true;
  successMessage: string = 'Änderung gespeichert';
  errorMessage: string = 'Fehler';

  routeId: string;
  infoRoute: string = 'Info';
  contactRoute: string = 'Contact';
  userRoute: string = 'User';
  welcomeRoute: string = 'Welcome';

  constructor(public salonService: SalonService, public route: ActivatedRoute) { }

  loadSalonInfo() {
    let salonId = this.salonService.currentSalonId;
    this.salonService.getSalonById(salonId).subscribe((salon: Salon) => {
      this.salon = salon;
    }, this.handleError);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return this.salonService.returnToMaintenanceIndex();
    }
    let errorText = error.status + ' : ' + error.statusText;
    this.showAlertMessage(errorText, false);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.salonService.editSalonInfo(this.salon, this.routeId).subscribe((response) => {
        this.showAlertMessage(null, true);
      }, this.handleError);
    }
  }

  showAlertMessage(message: string, isSuccess: boolean) {
    this.alerts.push({
      type: isSuccess ? 'success' : 'danger',
      header: isSuccess ? this.successMessage : this.errorMessage,
      message: message,
      timeout: this.alertTimeout
    });
    this.salonService.scrollToViewById(this.formDivId);
  }
}
