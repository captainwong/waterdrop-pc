import { IPage } from './page';

export type TGraphqlQuery<T = null> = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: T,
    page: IPage,
  }
};

export type TGraphqlMutation = {
  [key: string]: {
    __typename: 'Mutation',
    code: number,
    message: string,
  }
};
