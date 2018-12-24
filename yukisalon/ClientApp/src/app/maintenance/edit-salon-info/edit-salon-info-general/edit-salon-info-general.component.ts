import { Component, OnInit, Input } from "@angular/core";
import { MaintenanceBaseFormComponent } from "../../../shared/maintenance-base-form/maintenance-base-form.component";
import { SalonService } from "../../../services/salon.service";
import { ActivatedRoute } from "@angular/router";
import { Salon } from "../../../models/Salon";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-edit-salon-info-general",
  templateUrl: "./edit-salon-info-general.component.html",
  styleUrls: ["./edit-salon-info-general.component.css"]
})
export class EditSalonInfoGeneralComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  @Input() salon: Salon;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder
  ) {
    super(salonService, formBuilder);
  }

  ngOnInit() {
    this.formDivId = "edit-salon-general-form";
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: [this.salon.name, [Validators.required]],
      description: [this.salon.description, [Validators.required]],
      extraInfo: [this.salon.extraInfo, [Validators.required]],
      formType: "general"
    });
  }
}
