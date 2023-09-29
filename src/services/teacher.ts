import {
  CREATE_OR_UPDATE_TEACHER, DELETE_TEACHER, GET_TEACHER, GET_TEACHERS,
} from '@/graphql/teacher';
import { TGraphqlMutation } from '@/types/graphql';
import {
  TTeacher, TTeacherQuery, TTeachersQuery,
} from '@/types/teacher';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export type TCreateOrUpdateTeacher = (
  dto: TTeacher,
  id?: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateOrUpdateTeacher = ():[TCreateOrUpdateTeacher, boolean] => {
  const [commit, { loading }] = useMutation<TGraphqlMutation>(CREATE_OR_UPDATE_TEACHER);
  const createOrUpdateTeacher: TCreateOrUpdateTeacher = async (dto, id, onSuccess, onError) => {
    const res = await commit({
      variables: {
        id,
        dto,
      },
    });
    if (res.data?.createOrUpdateTeacher.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.createOrUpdateTeacher.message || 'error');
    }
  };
  return [createOrUpdateTeacher, loading];
};

export const useTeacher = (id: string) => {
  const { data, loading, refetch } = useQuery<TTeacherQuery>(GET_TEACHER, {
    skip: !id,
    variables: {
      id,
    },
  });

  return {
    teacher: data?.getTeacherInfo.data, loading, refetch,
  };
};

export type TDeleteTeacher = (
  id: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useDeleteTeacher = ():[TDeleteTeacher, boolean] => {
  const [commit, { loading }] = useMutation<TGraphqlMutation>(DELETE_TEACHER);
  const deleteTeacher: TDeleteTeacher = async (id: string, onSuccess, onError) => {
    const res = await commit({
      variables: {
        id,
      },
    });
    if (res.data?.deleteTeacher.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.deleteTeacher.message || 'error');
    }
  };
  return [deleteTeacher, loading];
};

export const useLazyTeachers = () => {
  const [get, { data, loading, error }] = useLazyQuery<TTeachersQuery>(GET_TEACHERS);

  const getTeachers = async (name?:string, pageCur?:number, pageSize?:number) => {
    const res = await get({
      variables: {
        name,
        page: {
          page: pageCur,
          pageSize,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (res?.data?.getTeachers.code !== 200) {
      return {
        success: false,
        error: res?.data?.getTeachers.message || 'error',
      };
    }

    return {
      success: true,
      data: res?.data?.getTeachers.data,
      total: res?.data?.getTeachers.page.total,
    };
  };

  return {
    loading,
    teachers: data?.getTeachers.data || [],
    getTeachers,
  };
};

export const useTeachers = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const {
    loading,
    data,
    refetch,
  } = useQuery<TTeachersQuery>(GET_TEACHERS, {
    variables: {
      page: { page, pageSize },
    },
  });

  return {
    loading,
    getTeachers: refetch,
    teachers: data?.getTeachers.data || [],
    pagination: data?.getTeachers.page || {
      total: 0,
      pageSize,
      page,
    },
  };
};
