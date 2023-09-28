import { ICard } from './card';
import { IPage } from './page';

export interface IProdcutCategory {
  key: string;
  title: string;
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
  price: string;
  originalPrice: string;
  cover: string;
  banner: string;
  cards: ICard[];
}

export type TProduct = Partial<IProduct>;

export type TProductCategoryQuery = {
  [key: string]: {
    __typename: 'Query', code: number, message: string, data: IProdcutCategory[]
  }
};

export type TProductQuery = {
  [key: string]: {
    __typename: 'Query', code: number, message: string, data: IProduct
  }
};

export type TProductsQuery = {
  [key: string]: {
    __typename: 'Query', code: number, message: string, data: IProduct[], page: IPage
  }
};

export type TProductMutation = {
  [key: string]: {
    __typename: 'Mutation', code: number, message: string,
  }
};
