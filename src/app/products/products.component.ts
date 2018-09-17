import { Component, OnInit } from "@angular/core";
import { Category } from "../models/category";
import { MainService } from "../main.service";
import { Salon } from "../models/salon";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  title: string;
  categories: Category[];

  constructor(private mainService: MainService) {}

  ngOnInit() {
    this.title = "Unsere Service";
    this.fetchData();
  }

  fetchData() {
    this.mainService.getSalonData()
      .subscribe((salon: Salon) => {
        this.categories = salon.categories;
      });
  }
}
