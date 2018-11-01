import { Component, OnInit, Input } from "@angular/core";
import { Category } from "../../models/category";
import { MainService } from "../main.service";
import { Salon } from "../../models/salon";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  title: string;
  categories: Category[];
  fragment: string;

  constructor(private mainService: MainService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.title = "Unsere Service";
    this.fetchData();
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    this.route.fragment.subscribe((fragment: string) => this.fragment = fragment);
    if (this.fragment) {
      this.fragment = this.mainService.priceListItemIdPrefix + this.fragment;
      try {
        document.getElementById(this.fragment).scrollIntoView({behavior: "smooth", block: "start"});
      } catch (error) {}
    }
  }

  fetchData() {
    this.mainService.getSalonData()
      .subscribe((salon: Salon) => {
        this.categories = salon.categories;
      });
  }
}
