import { Component, OnInit, Input } from "@angular/core";
import { MaintenanceBaseFormComponent } from "../../../shared/maintenance-base-form/maintenance-base-form.component";
import { SalonService } from "../../../services/salon.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Salon } from "../../../models/Salon";

@Component({
  selector: "app-edit-salon-info-welcome-text",
  templateUrl: "./edit-salon-info-welcome-text.component.html",
  styleUrls: ["./edit-salon-info-welcome-text.component.css"]
})
export class EditSalonInfoWelcomeTextComponent
  extends MaintenanceBaseFormComponent
  implements OnInit {
  @Input() salon: Salon;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder
  ) {
    super(salonService, formBuilder);
  }

  ngOnInit() {
    this.formDivId = "edit-salon-welcome-text-form";
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: [this.salon.welcome.title, [Validators.required]],
      text1: [this.salon.welcome.text1, [Validators.required]],
      formType: "welcome"
    });
  }
}
