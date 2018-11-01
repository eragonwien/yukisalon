import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/Product';
import { SalonService } from '../../../services/salon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() categories: Category[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToPriceList(target?: string) {
    target = "price-list-" + target;
    this.router.navigate(['dienstleistung'], {fragment: target});
  }
}
