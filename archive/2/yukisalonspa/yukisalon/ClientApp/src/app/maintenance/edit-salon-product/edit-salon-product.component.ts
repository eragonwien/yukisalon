import { AlertMessage } from "./../../models/AlertMessage";
import {
  faPen,
  faChevronDown,
  faChevronUp
} from "@fortawesome/free-solid-svg-icons";
import { MaintenanceBaseFormComponent } from "../../shared/maintenance-base-form/maintenance-base-form.component";
import { SalonService } from "./../../services/salon.service";
import { Category, Product } from "./../../models/Product";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { EditSalonCategoryModalComponent } from "./edit-salon-category-modal/edit-salon-category-modal.component";

@Component({
  selector: "app-edit-salon-product",
  templateUrl: "./edit-salon-product.component.html",
  styleUrls: ["./edit-salon-product.component.css"]
})
export class EditSalonProductComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  categories: Category[];
  products: Product[];

  editIcon = faPen;
  moreIcon = faChevronDown;
  lessIcon = faChevronUp;

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

  openEditCategory(category: Category) {
    const modalRef = this.modalService.open(EditSalonCategoryModalComponent);
    modalRef.componentInstance.category = category;
    modalRef.componentInstance.form = this.form;
    modalRef.componentInstance.alertEmitter.subscribe((alert: AlertMessage) =>
      this.alertThenReloadInfo(alert)
    );
  }
}
