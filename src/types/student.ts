import { TGraphqlQuery } from './graphql';

export interface IStudent {
  id: string;
  name: string;
  tel: string;
  avatar: string;
  account: string;
}

export type TStudent = Partial<IStudent>;
export type TStudentsQuery = TGraphqlQuery<IStudent[]>;
