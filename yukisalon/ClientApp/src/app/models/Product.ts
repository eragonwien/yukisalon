export class Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: string;
  isFixPrice: boolean;
  currency: string;
  image: string;
  isFeatured: string;
  isActive: boolean;
}

export class Category {
  id: number;
  salonId: number;
  parentId: number;
  name: string;
  image: string;
  product: Product[];
  subCategory: Category[];
  isActive: boolean;
}
