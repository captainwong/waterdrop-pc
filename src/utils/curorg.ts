import { LOCAL_STORAGE_KEY_CUR_ORG } from './constants';
import { ICurrentOrganization } from './types';

export const setCurrentOrganization = (org: ICurrentOrganization) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_CUR_ORG, JSON.stringify(org));
};

export function getCurrentOrganization(): ICurrentOrganization | undefined {
  try {
    const org = localStorage.getItem(LOCAL_STORAGE_KEY_CUR_ORG) || '';
    return JSON.parse(org) as ICurrentOrganization;
  } catch {
    return undefined;
  }
}
