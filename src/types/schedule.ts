import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';
import { IOrganization } from './organization';
import { IStudentSchedule } from './student-schedule';
import { ITeacher } from './teacher';

export interface ISchedule {
  date: Date;
  start: string;
  end: string;
  limit: number;
  course: ICourse;
  teacher: ITeacher;
  organization: IOrganization;
  studentSchedules: IStudentSchedule[];
}

export type TScheduleQuery = TGraphqlQuery<ISchedule>;
export type TSchedulesQuery = TGraphqlQuery<ISchedule[]>;
