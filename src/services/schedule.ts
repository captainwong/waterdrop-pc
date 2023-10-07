import { CREATE_SCHECULES, GET_SCHEDULES } from '@/graphql/schedule';
import { TSchedulesQuery } from '@/types/schedule';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { useMutation, useQuery } from '@apollo/client';

export const useSchedules = (
  day: string,
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { data, loading } = useQuery<TSchedulesQuery>(GET_SCHEDULES, {
    variables: {
      day,
      page: { page, pageSize },
    },
  });

  return {
    loading,
    schedules: data?.getSchedules.data || [],
    pagination: data?.getSchedules.page || {
      total: 0,
      pageSize,
      page,
    },
  };
};

export type TCreateSchedules = (
  startAt: string,
  endAt: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateSchedules = (): [TCreateSchedules, boolean] => {
  const [create, { loading }] = useMutation(CREATE_SCHECULES);
  const createSchedules: TCreateSchedules = async (startAt, endAt, onSuccess, onError) => {
    const res = await create({
      variables: {
        startAt,
        endAt,
      },
    });
    if (res?.data?.createSchedules.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res?.data?.createSchedules.message || 'error');
    }
  };

  return [createSchedules, loading];
};
