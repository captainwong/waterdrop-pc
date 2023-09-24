export interface IPropsChildren {
  children: React.ReactNode;
}

export interface IUser {
  id: string;
  name: string;
  desc: string;
  tel: string;
  avatar: string;
  refetchHandler?: () => void;
  selectedOrganizationId?: string;
}

export interface IPage {
  page: number;
  pageSize: number;
  total: number;
}

export interface IMedia {
  id: string;
  url: string;
  remark: string;
}

export interface IOrganization {
  id: string;
  businessLicense: string;
  identityCardBackImg: string;
  identityCardFrontImg: string;
  tags?: string;
  desc?: string;
  name: string;
  tel?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  logo: string;
  frontImgs?: IMedia[];
  roomImgs?: IMedia[];
  otherImgs?: IMedia[];
}

export type TOrganization = Partial<IOrganization>;

export type TOrganizationsQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: IOrganization[],
    page: IPage,
  }
};

export type TOrganizationQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: IOrganization,
  }
};

export interface ICurrentOrganization {
  id: string;
  name: string;
}

export interface IStudent {
  id: string;
  name: string;
  tel: string;
  avatar: string;
  account: string;
}

export type TStudent = Partial<IStudent>;

export type TStudentQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: IStudent[],
    page: IPage,
  }
};
