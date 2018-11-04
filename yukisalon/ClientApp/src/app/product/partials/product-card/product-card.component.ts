import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/Product';
import { SalonService } from '../../../services/salon.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() category: Category;
  imagePathPrefix: string;
  defaultImage: string = "default.jpeg";

  constructor(private salonService: SalonService) { }

  ngOnInit() {
    this.imagePathPrefix = this.salonService.ImagePathPrefix;
  }

}
