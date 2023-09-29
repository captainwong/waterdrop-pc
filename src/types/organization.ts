import { TGraphqlQuery } from './graphql';
import { IMedia } from './media';

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
export type TOrganizationQuery = TGraphqlQuery<IOrganization>;
export type TOrganizationsQuery = TGraphqlQuery<IOrganization[]>;

export interface ICurrentOrganization {
  id: string;
  name: string;
}
