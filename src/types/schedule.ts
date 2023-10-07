import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';
import { IOrganization } from './organization';
import { ITeacher } from './teacher';

export interface ISchedule {
  date: Date;
  start: string;
  end: string;
  limit: number;
  course: ICourse;
  teacher: ITeacher;
  organization: IOrganization;
}

export type TScheduleQuery = TGraphqlQuery<ISchedule>;
export type TSchedulesQuery = TGraphqlQuery<ISchedule[]>;
