export class Product {
  id: number;
  name: string;
  description: string;
  price: string;
  isFixPrice: boolean;
  currency: string;
  image: string;
  isFeatured: string
}

export class Category {
  id: number;
  name: string;
  image: string;
  product: Product[];
  subCategory: Category[]
}
