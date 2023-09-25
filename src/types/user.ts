import { ApolloQueryResult, OperationVariables } from '@apollo/client';

export type TRefetchUser = ((variables?: Partial<OperationVariables> | undefined)
=> Promise<ApolloQueryResult<TUserQuery>>);

export interface IUser {
  id: string;
  name: string;
  desc: string;
  tel: string;
  avatar: string;
  refetch?: TRefetchUser;
  selectedOrganizationId?: string;
}

export type TUser = Partial<IUser>;

export type TUserQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: IUser,
  }
};

export type TUserMutation = {
  [key: string]: {
    __typename: 'Mutation',
    code: number,
    message: string,
    data: IUser,
  }
};
