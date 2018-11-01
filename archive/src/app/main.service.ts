import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Salon } from "../models/salon";
import { Category, Subcategory } from "../models/category";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root"
})
export class MainService {
  imagePathPrefix: string = "assets/images/";
  priceListItemIdPrefix: string = "price-list-";

  constructor(private http: HttpClient) {}

  getSalonData() {
    return this.http.get<Salon>("assets/data/data.json");
  }

  getImagePathPrefix() {
    return this.imagePathPrefix;
  }
}
