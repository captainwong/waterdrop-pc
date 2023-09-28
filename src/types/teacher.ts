import { IPage } from './page';

export interface ITeacher {
  id: string;
  name: string;
  photo: string;
  teachingAge: number;
  education: string;
  seniority: string;
  experience: string;
  award: string;
  tags: string;
}

export type TTeacher = Partial<ITeacher>;

export type TTeachersQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ITeacher[],
    page: IPage,
  }
};

export type TTeacherQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ITeacher,
    page: IPage,
  }
};

export type TTeacherMutation = {
  [key: string]: {
    __typename: 'Mutation',
    code: number,
    message: string,
  }
};
