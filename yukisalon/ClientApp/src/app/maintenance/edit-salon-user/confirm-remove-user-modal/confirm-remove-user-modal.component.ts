import { AlertMessage } from "../../../models/AlertMessage";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SalonService } from "./../../../services/salon.service";
import { User } from "./../../../models/User";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { EditSalonUserModalComponent } from "../edit-salon-user-modal/edit-salon-user-modal.component";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-confirm-remove-user-modal",
  templateUrl: "./confirm-remove-user-modal.component.html",
  styleUrls: ["./confirm-remove-user-modal.component.css"]
})
export class ConfirmRemoveUserModalComponent extends EditSalonUserModalComponent
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
    this.loading = true;
    this.salonService
      .removeSalonUser(this.user)
      .subscribe(() => this.handleSuccess(), error => this.handleError(error))
      .add(() => this.emitAlert())
      .add(() => (this.loading = false));
  }
}
