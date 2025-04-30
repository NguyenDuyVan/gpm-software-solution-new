/* eslint-disable no-unused-vars */

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DRAFT = 'DRAFT',
}

export type ProductImages = {
  id?: number;
  url: string;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductVariants = {
  id: number;
  name: string;
  price: number;
  stock: number;
  productId: number;
};

export type Product = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  status: ProductStatus.ACTIVE | ProductStatus.INACTIVE | ProductStatus.DRAFT;
  images: ProductImages[];
  variants: ProductVariants[];
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Locale = 'vi' | 'en';
