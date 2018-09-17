import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-categorie-section',
  templateUrl: './categorie-section.component.html',
  styleUrls: ['./categorie-section.component.css']
})
export class CategorieSectionComponent implements OnInit {

  @Input() category: Category;

  constructor() { }

  ngOnInit() {
  }

}
