import { IMedia } from './media';
import { IPage } from './page';

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
