import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from '../../models/Salon';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertMessage } from '../../models/alertMessage';

@Component({
  selector: 'app-salon-info',
  templateUrl: './salon-info.component.html',
  styleUrls: ['./salon-info.component.css']
})
export class SalonInfoComponent implements OnInit {

  salon: Salon;
  
  formDivId: string = 'edit-salon-form';
  alerts: AlertMessage[] = [];
  alertTimeout: number = 10 * 1000;
  alertDismissible : boolean = true;
  successMessage: string = 'Änderung gespeichert';
  errorMessage: string = 'Fehler';

  constructor(private salonService: SalonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadSalonInfo();
  }

  loadSalonInfo() {
    let salonId = this.salonService.currentSalonId;
    this.salonService.getSalonById(salonId).subscribe((salon: Salon) => {
      this.salon = salon;
    }, this.handleError);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.salonService.editSalonInfo(this.salon).subscribe((response) => {
        this.showAlertMessage(null, true);
      }, this.handleError);
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return this.salonService.returnToMaintenanceIndex();
    }
    let errorText = error.status + ' : ' + error.statusText;
    this.showAlertMessage(errorText, false);
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
