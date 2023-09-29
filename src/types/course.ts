import { TGraphqlQuery } from './graphql';

export type TWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export const isWorkday = (day: TWeek) => {
  return day !== 'saturday' && day !== 'sunday';
};

export interface IWeekday {
  key: TWeek;
  label: string;
}

export const WEEKDAYS: IWeekday[] = [
  {
    key: 'monday',
    label: '周一',
  },
  {
    key: 'tuesday',
    label: '周二',
  },
  {
    key: 'wednesday',
    label: '周三',
  },
  {
    key: 'thursday',
    label: '周四',
  },
  {
    key: 'friday',
    label: '周五',
  },
  {
    key: 'saturday',
    label: '周六',
  },
  {
    key: 'sunday',
    label: '周日',
  },
];

export interface ITimeSlot {
  start: string;
  end: string;
  key: number;
}

export const slotsMaxKey = (slots: ITimeSlot[]) => {
  return slots.reduce((prev, curr) => {
    return Math.max(prev, curr.key);
  }, 0);
};

export interface ITimeSlots {
  weekday: TWeek;
  slots: ITimeSlot[];
}

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
  resavableTimeSlots: ITimeSlots[];
}

export type TCourse = Partial<ICourse>;
export type TCourseQuery = TGraphqlQuery<ICourse>;
export type TCoursesQuery = TGraphqlQuery<ICourse[]>;
