export interface Category {
  categoryId?: number;
  name: string;
  parentCategoryId?: number | null;
}
export interface Product {
  productId?: number;
  productName: string;
  price: number;
  description?: string;
  categoryId?: number;
}
