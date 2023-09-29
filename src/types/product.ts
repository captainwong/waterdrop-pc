import { TCard } from './card';
import { TGraphqlQuery } from './graphql';

export interface IProdcutCategory {
  key: string;
  name: string;
}

export const PRODUCT_STATUS = {
  // 上架
  ON_SAIL: 'on_sail',
  // 未上架
  NOT_FOR_SAIL: 'not_for_sail',
};

export interface IProduct {
  id: string;
  name: string;
  desc: string;
  category: string;
  status: string;
  stock: number;
  sales: number;
  limit: number;
  price: string;
  originalPrice: string;
  cover: string;
  banner: string;
  cards: TCard[];
}

export type TProduct = Partial<IProduct>;
export type TProductCategoryQuery = TGraphqlQuery<IProdcutCategory[]>;
export type TProductQuery = TGraphqlQuery<IProduct>;
export type TProductsQuery = TGraphqlQuery<IProduct[]>;

export interface IBatchOnSale {
  products: string[];
  onSale: boolean;
}
