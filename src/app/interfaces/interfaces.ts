export interface Category {
  categoryId?: number;
  name: string;
  parentCategoryId?: number | null;
}
export class Product {
  productName: string;
  price: number;
  description: string;
  categoryId: number;
  images: File[];
}

export interface ProductRequest {
  product: Product;
  images: string[];
}
