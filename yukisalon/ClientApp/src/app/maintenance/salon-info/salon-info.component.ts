import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute } from '@angular/router';
import { Salon } from '../../models/Salon';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salon-info',
  templateUrl: './salon-info.component.html',
  styleUrls: ['./salon-info.component.css']
})
export class SalonInfoComponent implements OnInit {

  salon: Salon;

  constructor(private salonService: SalonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadSalonInfo();
  }

  loadSalonInfo() {
    let salonId = Number(this.route.snapshot.paramMap.get('id'));
    this.salonService.getSalonById(salonId).subscribe((salon: Salon) => {
      this.salon = salon;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.salonService.editSalonInfo(this.salon).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
