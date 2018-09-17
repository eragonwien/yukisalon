import { Component, OnInit, Input } from '@angular/core';
import { Subcategory } from '../../models/category';

@Component({
  selector: 'app-sub-category-section',
  templateUrl: './sub-category-section.component.html',
  styleUrls: ['./sub-category-section.component.css']
})
export class SubCategorySectionComponent implements OnInit {

  @Input() subcategory: Subcategory;

  constructor() { }

  ngOnInit() {
  }

}
