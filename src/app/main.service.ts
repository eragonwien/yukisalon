import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Salon } from "./models/salon";
import { Category, Subcategory } from "./models/category";
import { Product } from "./models/product";

@Injectable({
  providedIn: "root"
})
export class MainService {
  dataPathPrefix: string = "../../assets/data/";
  imagePathPrefix: string = "assets/images/";

  constructor(private http: HttpClient) {}

  getSalonData() {
    return this.http.get<Salon>(this.dataPathPrefix + "data.json");
  }

  getFeatures(categories: Category[], maxFeaturesCount: number): Product[] {
    let products: Product[] = this.getProducts(categories);
    return this.getFeaturedProducts(products, maxFeaturesCount);
  }

  getProducts(categories: Category[]): Product[] {
    let products: Product[] = [];

    for (const category of categories) {
      let catProducts: Product[] = this.getProductsOfCategory(category);
      for (const product of catProducts) {
        products.push(product);
      }
    }
    return products;
  }

  getProductsOfCategory(category: Category): Product[] {
    let products: Product[] = [];

    if (!category.subcategories) {
      return products;
    }

    for (const subCategory of category.subcategories) {
      let subCatProducts: Product[] = this.getProductsOfSubCategory(subCategory);
      for (const product of subCatProducts) {
        products.push(product);
      }
    }
    return products;
  }

  getProductsOfSubCategory(subCategory: Subcategory): Product[] {
    let products: Product[] = [];

    if (!subCategory.products) {
      return products;
    }

    for (const product of subCategory.products) {
      products.push(product);
    }
    return products;
  }

  getFeaturedProducts(products: Product[], maxFeaturesCount: number): Product[] {
    let features: Product[] = [];
    let currentCount: number = 0;
    for (let i = 0; i < products.length && maxFeaturesCount > currentCount; i++) {
      features.push(products[i]);
      currentCount++;
    }
    return features;
  }
}
