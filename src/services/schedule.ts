import { CREATE_SCHECULES, GET_SCHEDULES } from '@/graphql/schedule';
import { ISchedule, TSchedulesQuery } from '@/types/schedule';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

const DEFAULT_SCHEDULES_PER_PAGE = 50;

export const useSchedules = (
  day: string,
) => {
  const pageCur = useRef(1);
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [get, { loading }] = useLazyQuery<TSchedulesQuery>(GET_SCHEDULES);

  const getSchedules = async (pageNum = 1) => {
    const res = await get({
      fetchPolicy: 'no-cache',
      variables: {
        day,
        page: {
          page: pageNum,
          pageSize: DEFAULT_SCHEDULES_PER_PAGE,
        },
      },
    });
    const more = (res.data?.getSchedules.page &&
      (
        (res.data.getSchedules.page.page * DEFAULT_SCHEDULES_PER_PAGE)
        < res.data.getSchedules.page.total
      )
    ) || false;
    return {
      ss: res.data?.getSchedules.data || [],
      more,
    };
  };

  const refreshSchedules = async () => {
    pageCur.current = 1;
    const res = await getSchedules();
    setSchedules(res.ss);
    setHasMore(res.more);
  };

  const loadMoreSchedules = async () => {
    if (!hasMore) return;
    const { ss, more } = await getSchedules(pageCur.current + 1);
    setHasMore(more);
    setSchedules((prev) => [...prev, ...ss]);
    pageCur.current += 1;
  };

  useEffect(() => {
    refreshSchedules();
  }, [day]);

  return {
    loading,
    hasMore,
    schedules,
    refreshSchedules,
    loadMoreSchedules,
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
