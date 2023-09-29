import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { TGraphqlQuery } from './graphql';

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
export type TUserQuery = TGraphqlQuery<IUser>;
