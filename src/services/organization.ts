import {
  CREATE_OR_UPDATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  GET_ORGANIZATIONS,
  GET_ORGANIZATION_INFO,
  GET_SIMPLE_ORGANIZATIONS,
} from '@/graphql/organization';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import {
  TOrganization,
  TOrganizationMutation,
  TOrganizationQuery,
  TOrganizationsQuery,
} from '@/types/organization';
import { useMutation, useQuery } from '@apollo/client';

export const useOrganizations = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  isSimple = false,
) => {
  const {
    loading,
    data,
    refetch,
  } = useQuery<TOrganizationsQuery>(isSimple ? GET_SIMPLE_ORGANIZATIONS : GET_ORGANIZATIONS, {
    variables: {
      page: { page, pageSize },
    },
  });

  return {
    loading,
    refetch,
    code: data?.getOrganizations.code,
    message: data?.getOrganizations.message,
    orgs: data?.getOrganizations.data,
    pagination: data?.getOrganizations.page,
  };
};

export const useOrganization = (id: string) => {
  const {
    loading,
    data,
    refetch,
  } = useQuery<TOrganizationQuery>(GET_ORGANIZATION_INFO, {
    variables: {
      id,
    },
  });

  return {
    loading,
    refetch,
    code: data?.getOrganizationInfo.code,
    message: data?.getOrganizationInfo.message,
    org: data?.getOrganizationInfo.data,
  };
};

export type TCreateOrUpdateOrganization = (
  dto: TOrganization,
  id?: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateOrUpdateOrganization = (): [
  doCreate: TCreateOrUpdateOrganization, loading: boolean,
] => {
  const [commit, { loading }] = useMutation<TOrganizationMutation>(CREATE_OR_UPDATE_ORGANIZATION);
  const createOrUpdateOrganization = async (
    dto: TOrganization,
    id?: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await commit({
      variables: {
        id,
        dto,
      },
    });
    if (res.data?.createOrUpdateOrganization.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.createOrUpdateOrganization.message || 'error');
    }
  };

  return [createOrUpdateOrganization, loading];
};

export type TDeleteOrganization = (
  id: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useDeleteOrganization = () : [TDeleteOrganization, boolean] => {
  const [remove, { loading }] = useMutation<TOrganizationMutation>(DELETE_ORGANIZATION);
  const deleteOrganization = async (
    id: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await remove({
      variables: {
        id,
      },
    });
    if (res.data?.deleteOrganization.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.deleteOrganization.message || 'error');
    }
  };
  return [deleteOrganization, loading];
};
