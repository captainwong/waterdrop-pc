import { IPage } from './page';

export interface ICourse {
  id: string;
  name: string;
  desc?: string;
  group?: string;
  baseAbility: string;
  limit: number;
  duration: number;
  reservation?: string;
  refund?: string;
  note?: string;
  cover: string;
}

export type TCourse = Partial<ICourse>;

export type TCourseQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ICourse,
  }
};

export type TCoursesQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ICourse[],
    page: IPage,
  }
};

export type TCourseMutation = {
  [key: string]: {
    __typename: 'Mutation',
    code: number,
    message: string,
    data: ICourse,
  }
};
