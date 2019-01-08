import { MaintenanceBaseFormModalComponent } from "./../../../shared/maintenance-base-form-modal/maintenance-base-form-modal.component";
import { Category } from "./../../../models/Product";
import { SalonService } from "./../../../services/salon.service";
import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Salon } from "src/app/models/Salon";

@Component({
  selector: "app-edit-salon-category-modal",
  templateUrl: "./edit-salon-category-modal.component.html",
  styleUrls: ["./edit-salon-category-modal.component.css"]
})
export class EditSalonCategoryModalComponent
  extends MaintenanceBaseFormModalComponent
  implements OnInit {
  @Input() category: Category;
  salonList: Salon[];
  isCreate: boolean;
  removeSubCategory: Category;

  createCategoryText = this.salonService.createCategoryText;
  editCategoryText = this.salonService.editCategoryText;
  removeCategoryText = this.salonService.removeCategoryText;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder, activeModal);
  }

  ngOnInit() {
    this.loadSalonList();
    this.isCreate = this.category == null;
    this.initForm();
  }

  get values() {
    return this.form.value;
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.category.id, [Validators.required]],
      salonId: [this.category.salonId],
      name: [this.category.name, [Validators.required]],
      image: [this.category.name],
      subCategory: [this.category.subCategory],
      product: [this.category.product]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.enableLoading();
      this.salonService
        .editSalonCategory(this.form.value)
        .subscribe(() => this.handleSuccess(), error => this.handleError(error))
        .add(() => this.emitAlert())
        .add(() => this.disableLoading());
    }
  }

  loadSalonList() {
    this.salonService.SalonList.subscribe((salons: Salon[]) => {
      this.salonList = salons;
    });
  }

  onRemoveSubCategory(category: Category) {}

  confirmRemoveSubCategory() {}

  cancelRemoveSubCategory() {
    this.removeSubCategory = null;
  }
}
