import { ICourse } from './course';

export const CARD_TYPE = {
  COUNT: 'count', // 次卡
  DURATION: 'duration', // 日卡
};

export interface ICard {
  id: string;
  name: string;
  type: string;
  count: number;
  duration: number;
  course?: ICourse;
}

export type TCard = Partial<ICard>;

export type TCardQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ICard,
  }
};

export type TCardMutation = {
  [key: string]: {
    __typename: 'Mutation',
    code: number,
    message: string,
  }
};

export type TCardsQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: ICard[],
  }
};
