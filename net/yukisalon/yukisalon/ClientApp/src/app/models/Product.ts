export interface Product {
  id: number,
  name: string,
  description: string,
  price: string,
  isFixPrice: boolean,
  currency: string,
  image: string,
  isFeatured: string
}

export interface Category {
  id: number,
  name: string,
  image: string,
  product: Product[]
}