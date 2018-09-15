import { Product } from "./product";

export interface Category {
  name: string,
  subcategories: Subcategory[]
}

export interface Subcategory {
  name: string,
  products: Product[]
}
