import { SalonService } from "./../../services/salon.service";
import { AlertMessage } from "./../../models/AlertMessage";
import { MaintenanceBaseFormComponent } from "../maintenance-base-form/maintenance-base-form.component";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  faEye,
  faEyeSlash,
  faTrash,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-maintenance-base-form-modal",
  templateUrl: "./maintenance-base-form-modal.component.html",
  styleUrls: ["./maintenance-base-form-modal.component.css"]
})
export class MaintenanceBaseFormModalComponent extends MaintenanceBaseFormComponent {
  @Output() alertEmitter: EventEmitter<AlertMessage> = new EventEmitter();

  activeText: string = this.salonService.activeText;
  inactiveText: string = this.salonService.inactiveText;
  displayedText: string = this.salonService.displayedText;
  createUserText: string = this.salonService.createUserText;
  editUserText: string = this.salonService.editUserText;
  closeText: string = this.salonService.closeText;
  removeText: string = this.salonService.removeText;
  saveText: string = this.salonService.saveText;
  showPasswordIcon = faEye;
  hidePasswordIcon = faEyeSlash;
  removeIcon = faTrash;
  closeIcon = faTimesCircle;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder);
  }

  get values() {
    return this.form.value;
  }

  onModalClosed() {
    this.activeModal.close();
  }

  emitAlert() {
    this.alertEmitter.emit(this.alerts[this.alerts.length - 1]);
    this.onModalClosed();
  }
}
