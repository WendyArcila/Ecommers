import { Category } from './category.models';

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  createdAt: string;
}
