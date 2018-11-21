import { Component, OnInit } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Salon } from '../../models/Salon';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-salon-info',
  templateUrl: './salon-info.component.html',
  styleUrls: ['./salon-info.component.css']
})
export class SalonInfoComponent implements OnInit {

  salon: Salon;

  constructor(private salonService: SalonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadSalonInfo();
  }

  loadSalonInfo() {
    let salonId = this.salonService.currentSalonId;
    this.salonService.getSalonById(salonId).subscribe((salon: Salon) => {
      this.salon = salon;
    }, this.handleError);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.salonService.editSalonInfo(this.salon).subscribe((response) => {
        console.log(response);
      });
    }
  }

  returnToIndex() {
    this.router.navigate(['maintenance']);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return this.returnToIndex();
    }
    alert(error.message);
  }
}
