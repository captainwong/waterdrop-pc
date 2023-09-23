import { GET_ORGANIZATIONS, GET_ORGANIZATION_INFO, UPDATE_ORGANIZATION } from '@/graphql/organization';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TOrganization, TOrganizationQuery, TOrganizationsQuery } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';

export const useOrganizations = (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TOrganizationsQuery>(GET_ORGANIZATIONS, {
    variables: {
      page: { page, pageSize },
    },
  });

  return {
    loading,
    refetch,
    code: data?.getOrganizations.code,
    message: data?.getOrganizations.message,
    data: data?.getOrganizations.data,
    page: data?.getOrganizations.page,
  };
};

export const useOrganization = (id: string) => {
  const { loading, data, refetch } = useQuery<TOrganizationQuery>(GET_ORGANIZATION_INFO, {
    variables: {
      id,
    },
  });

  return {
    loading,
    refetch,
    code: data?.getOrganizationInfo.code,
    message: data?.getOrganizationInfo.message,
    data: data?.getOrganizationInfo.data,
  };
};

export type TUpdateOrganization = (id: string, dto: TOrganization) => Promise<boolean>;

export const useUpdateOrganization = (): [
  handleUpdate: TUpdateOrganization, loading: boolean,
] => {
  const [update, { loading }] = useMutation(UPDATE_ORGANIZATION);
  const handleUpdate = async (id: string, dto: TOrganization) => {
    const res = await update({
      variables: {
        id,
        dto,
      },
    });
    return res.data?.code === 200;
  };

  return [handleUpdate, loading];
};
