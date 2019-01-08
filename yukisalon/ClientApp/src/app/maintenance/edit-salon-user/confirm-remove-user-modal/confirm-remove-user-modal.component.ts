import { AlertMessage } from "../../../models/AlertMessage";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SalonService } from "./../../../services/salon.service";
import { User } from "./../../../models/User";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder } from "@angular/forms";
import { MaintenanceBaseFormModalComponent } from "../../../shared/maintenance-base-form-modal/maintenance-base-form-modal.component";

@Component({
  selector: "app-confirm-remove-user-modal",
  templateUrl: "./confirm-remove-user-modal.component.html",
  styleUrls: ["./confirm-remove-user-modal.component.css"]
})
export class ConfirmRemoveUserModalComponent
  extends MaintenanceBaseFormModalComponent
  implements OnInit {
  @Input() user: User;
  @Output() alertEmitter: EventEmitter<AlertMessage> = new EventEmitter();

  removeIcon = faTrash;
  removeText = this.salonService.removeText;
  cancelText = this.salonService.cancelText;
  removeUserText = this.salonService.removeUserText;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder, activeModal);
  }

  ngOnInit() {}

  onConfirmed() {
    this.enableLoading();
    this.salonService
      .removeSalonUser(this.user)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.emitAlert())
      .add(() => this.disableLoading());
  }
}
