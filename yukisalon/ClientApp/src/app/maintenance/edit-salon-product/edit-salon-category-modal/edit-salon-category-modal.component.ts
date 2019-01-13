import { Salon } from "../../../models/Salon";
import { MaintenanceBaseFormModalComponent } from "./../../../shared/maintenance-base-form-modal/maintenance-base-form-modal.component";
import { Category, Product } from "./../../../models/Product";
import { SalonService } from "./../../../services/salon.service";
import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
  isCreateSubcategory: boolean = false;
  subcategories: Category[];

  createCategoryText = this.salonService.createCategoryText;
  editCategoryText = this.salonService.editCategoryText;
  removeCategoryText = this.salonService.removeCategoryText;
  createSubcategoryText = this.salonService.createSubcategoryText;
  chooseSubcategoryText = this.salonService.chooseSubcategoryText;
  cancelText = this.salonService.cancelText;
  chooseText = this.salonService.chooseText;
  createText = this.salonService.createText;
  plusIcon = faPlus;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    super(salonService, formBuilder, activeModal);
  }

  ngOnInit() {
    this.loadSalonList();
    this.loadSubcategories();
    this.isCreate = this.category == null;
    this.initForm();
  }

  get values() {
    return this.form.value;
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [this.category.id],
      salonId: [this.category.salonId],
      parentId: [this.category.parentId],
      name: [this.category.name, [Validators.required]],
      image: [this.category.name],
      subCategory: this.formBuilder.array(
        this.category.subCategory.map(s => this.initSubCategoryForm(s))
      ),
      product: this.formBuilder.array(
        this.category.product.map(p => this.initProductForm(p))
      )
    });
  }

  initSubCategoryForm(subcategory: Category) {
    return this.formBuilder.group({
      id: [subcategory.id],
      salonId: [subcategory.salonId, [Validators.required]],
      parentId: [subcategory.parentId, [Validators.required]],
      name: [subcategory.name, [Validators.required]],
      image: [subcategory.image],
      isActive: [subcategory.isActive],
      product: this.formBuilder.array(
        subcategory.product.map(p => this.initProductForm(p))
      )
    });
  }

  initProductForm(product: Product) {
    return this.formBuilder.group({
      id: [product.id],
      categoryId: [product.categoryId, [Validators.required]],
      name: [product.name, [Validators.required]],
      description: [product.description],
      price: [product.price],
      prisFixPriceice: [product.isFixPrice],
      currency: [product.currency],
      image: [product.image],
      isFeatured: [product.isFeatured],
      isActive: [product.isActive]
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

  loadSubcategories() {
    this.salonService
      .getSubcategories(this.category.salonId)
      .subscribe((subs: Category[]) => {
        this.subcategories = subs;
      });
  }

  onAddingSubcategory(subcategory: Category) {
    let subsExist = this.isSubcategoryExist(subcategory.id);
    let subsAdded = this.isSubcategoryAdded(subcategory.id);

    console.log(subsExist + " " + subsAdded);
    if (subsExist && !subsAdded) {
      this.subCategoryGroup.push(
        this.initSubCategoryForm(
          this.subcategories.find(s => s.id == subcategory.id)
        )
      );
    }
  }

  get subCategoryGroup(): FormArray {
    return this.form.get("subCategory") as FormArray;
  }

  get subProductGroup(): FormArray {
    return this.form.get("product") as FormArray;
  }

  onRemoveSubCategory(category: Category) {}

  isSubcategoryExist(subcategoryId: number) {
    return this.subcategories.some((s: Category) => s.id == subcategoryId);
  }

  isSubcategoryAdded(subcategoryId: number) {
    return this.subCategoryGroup.value.some(
      (s: Category) => s.id == subcategoryId
    );
  }

  toggleCreateSubcategory() {
    this.isCreateSubcategory = !this.isCreateSubcategory;
  }
}
