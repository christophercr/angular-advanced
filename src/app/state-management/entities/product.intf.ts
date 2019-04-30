export interface Product {
  id: string;
  name: string;
  description: string;
  link: string;
  sizes: string[],
  variants: ProductVariant[];
  details: string[];
}

export interface ProductVariant {
  id: string;
  color: string;
  image: string;
  quantity: number;
}
