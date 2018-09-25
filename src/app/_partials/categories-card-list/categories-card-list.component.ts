import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../../models/category';
import { MainService } from '../../main.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-categories-card-list',
  templateUrl: './categories-card-list.component.html',
  styleUrls: ['./categories-card-list.component.css']
})
export class CategoriesCardListComponent implements OnInit {

  @Input() categories: Category[];
  @Input() title: string;
  
  imagePathPrefix: string;
  defaultImage: string = "banner.jpg";

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit() {
    this.title = this.title ? this.title : "Behandlungen";
    this.imagePathPrefix = this.mainService.getImagePathPrefix();
  }

  navigateToPriceList(target?: string) {
    this.router.navigate(['products'], {fragment: target});
  }
}
