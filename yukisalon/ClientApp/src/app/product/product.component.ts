import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Product';
import { SalonService } from '../services/salon.service';
import { Salon } from '../models/Salon';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [SalonService]
})
export class ProductComponent implements OnInit {

  categories: Category[];

  constructor(private salonService: SalonService) { }

  ngOnInit() {
    this.salonService.getSalon().subscribe((salon: Salon) => {
      this.categories = salon.category;
    });
  }
}
