import {
  CREATE_ORGANIZATION,
  DELETE_ORGANIZATION,
  GET_ORGANIZATIONS,
  GET_ORGANIZATION_INFO,
  GET_SIMPLE_ORGANIZATIONS,
  UPDATE_ORGANIZATION,
} from '@/graphql/organization';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import {
  TOrganization,
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

export type TUpdateOrganization = (
  id: string,
  dto: TOrganization,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useUpdateOrganization = (): [
  doUpdate: TUpdateOrganization, loading: boolean,
] => {
  const [update, { loading }] = useMutation(UPDATE_ORGANIZATION);
  const doUpdate = async (
    id: string,
    dto: TOrganization,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await update({
      variables: {
        id,
        dto,
      },
    });
    if (res.data?.updateOrganizationInfo.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.updateOrganizationInfo.message);
    }
  };

  return [doUpdate, loading];
};

export type TCreateOrganization = (
  dto: TOrganization,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateOrganization = (): [
  doCreate: TCreateOrganization, loading: boolean,
] => {
  const [create, { loading }] = useMutation(CREATE_ORGANIZATION);
  const doCreate = async (
    dto: TOrganization,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await create({
      variables: {
        dto,
      },
    });
    if (res.data?.createOrganization.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.createOrganization.message);
    }
  };

  return [doCreate, loading];
};

export type TDeleteOrganization = (
  id: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useDeleteOrganization = () : [TDeleteOrganization, boolean] => {
  const [remove, { loading }] = useMutation(DELETE_ORGANIZATION);
  const doDelete = async (
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
      onError?.(res.data?.deleteOrganization.message);
    }
  };
  return [doDelete, loading];
};
