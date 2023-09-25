export interface IUser {
  id: string;
  name: string;
  desc: string;
  tel: string;
  avatar: string;
  refetchHandler?: () => void;
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
