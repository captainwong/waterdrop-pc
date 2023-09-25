import { IPage } from './page';

export interface ICourse {
  id: string;
  name: string;
  tel: string;
  avatar: string;
  account: string;
}

export type TCourse = Partial<ICourse>;

export type TCoursesQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ICourse[],
    page: IPage,
  }
};
