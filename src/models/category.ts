import { Product } from "./product";

export interface Category {
  name: string,
  subcategories: Subcategory[],
  products: Product[]
}

export interface Subcategory {
  name: string,
  products: Product[]
}
