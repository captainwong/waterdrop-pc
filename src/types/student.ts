import { IPage } from './page';

export interface IStudent {
  id: string;
  name: string;
  tel: string;
  avatar: string;
  account: string;
}

export type TStudent = Partial<IStudent>;

export type TStudentQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: IStudent[],
    page: IPage,
  }
};
