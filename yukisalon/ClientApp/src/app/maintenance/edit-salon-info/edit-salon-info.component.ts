import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MaintenanceBaseFormComponent } from "../../shared/maintenance-base-form/maintenance-base-form.component";
import { SalonService } from "../../services/salon.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-salon-info",
  templateUrl: "./edit-salon-info.component.html",
  styleUrls: ["./edit-salon-info.component.css"]
})
export class EditSalonInfoComponent extends MaintenanceBaseFormComponent
  implements OnInit {
  oneAtATime: boolean = true;

  constructor(
    public salonService: SalonService,
    public formBuilder: FormBuilder
  ) {
    super(salonService, formBuilder);
  }

  ngOnInit() {
    this.loadSalonInfo();
  }
}
