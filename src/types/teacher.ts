import { TGraphqlQuery } from './graphql';

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
export type TTeachersQuery = TGraphqlQuery<ITeacher[]>;
export type TTeacherQuery = TGraphqlQuery<ITeacher>;
