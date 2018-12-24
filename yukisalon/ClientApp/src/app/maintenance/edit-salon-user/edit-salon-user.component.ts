import { Component, OnInit } from "@angular/core";
import { SalonService } from "../../services/salon.service";
import { MaintenanceBaseFormComponent } from "../../shared/maintenance-base-form/maintenance-base-form.component";
import { User } from "../../models/User";
import { Validators, FormBuilder } from "@angular/forms";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditSalonUserModalComponent } from "./edit-salon-user-modal/edit-salon-user-modal.component";

@Component({
  selector: "app-edit-salon-user",
  templateUrl: "./edit-salon-user.component.html",
  styleUrls: ["./edit-salon-user.component.css"]
})
export class EditSalonUserComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  isCreateUser: boolean = false;
  editIcon = faPen;
  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    super(salonService, formBuilder);
  }

  ngOnInit() {
    this.loadSalonInfo();
  }

  openEditUser(user: User) {
    const modalRef = this.modalService.open(EditSalonUserModalComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.form = this.form;
  }
}
