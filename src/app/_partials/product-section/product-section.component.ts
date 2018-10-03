import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrls: ['./product-section.component.css']
})
export class ProductSectionComponent implements OnInit {

  @Input() product: Product;
  imagePathPrefix: string = "assets/images/";
  imageAlt: string = "jpeg/banner.jpeg";

  constructor() { }

  ngOnInit() {
    this.product.image = this.product.image ? this.product.image : this.imageAlt;
    this.product.image = this.imagePathPrefix + this.product.image;
  }

}
