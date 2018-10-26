import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/Product';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  @Input() categories: Category[];
  @Input() title: string;

  constructor() { }

  ngOnInit() {
    console.log(this.categories);
  }

}
