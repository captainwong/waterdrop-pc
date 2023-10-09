import { IStudent } from './student';

export enum StudentScheduleStatus {
  // 未上课
  NOT_STARTED = 'NOT_STARTED',
  // 上课中
  IN_PROGRESS = 'IN_PROGRESS',
  // 已下课
  FINISHED = 'FINISHED',
  // 已取消
  CANCELED = 'CANCELED',
}

export interface IStudentSchedule {
  id: string;
  status: string;
  createdAt: Date;
  student: IStudent;
}
