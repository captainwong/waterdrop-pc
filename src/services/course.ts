import {
  CREATE_OR_UPDATE_COURSE, GET_COURSE, GET_COURSES, GET_SIMPLE_COURSES,
} from '@/graphql/course';
import {
  ITimeSlot,
  ITimeSlots,
  TCourse, TCourseQuery, TCoursesQuery, TWeek, WEEKDAYS, isWorkday,
} from '@/types/course';
import { TGraphqlMutation } from '@/types/graphql';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useLazyCourses = () => {
  const [
    get, { data, loading, error },
  ] = useLazyQuery<TCoursesQuery>(GET_COURSES);

  const getCourses = async (name?:string, pageCur = 1, pageSize = DEFAULT_PAGE_SIZE) => {
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

    if (res?.data?.getCourses.code !== 200) {
      return {
        success: false,
        error: res?.data?.getCourses.message || 'error',
      };
    }

    return {
      success: true,
      data: res?.data?.getCourses.data,
      total: res?.data?.getCourses.page.total,
    };
  };

  return {
    loading,
    courses: data?.getCourses.data || [],
    getCourses,
  };
};

export const useSimpleCourses = () => {
  const { data, loading, refetch } = useQuery<TCoursesQuery>(GET_SIMPLE_COURSES, {
    variables: {
      page: {
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    },
  });

  const getCourses = async (name: string) => {
    refetch({
      variables: {
        name,
        page: {
          page: 1,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
    });
  };

  return {
    loading,
    courses: data?.getCourses.data || [],
    getCourses,
  };
};

export const useCourse = (id: string) => {
  const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
    variables: {
      id,
    },
  });
  return { course: data?.getCourseInfo.data, loading, refetch };
};

export const useLazyCourse = () => {
  const [get, { loading }] = useLazyQuery<TCourseQuery>(GET_COURSE);
  const getCourse = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });
    return res.data?.getCourseInfo.data;
  };

  return { getCourse, loading };
};

export type TCreateOrUpdateCourse = (
  dto: TCourse,
  id?: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateOrUpdateCourse = (): [TCreateOrUpdateCourse, boolean] => {
  const [commit, { loading }] = useMutation<TGraphqlMutation>(CREATE_OR_UPDATE_COURSE);
  const commitCourse = async (
    dto: TCourse,
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

    if (res.data?.createOrUpdateCourse.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.createOrUpdateCourse.message || 'error');
    }
  };

  return [commitCourse, loading];
};

interface IReservableTimeSlotsHandlers {
  save: (ts: ITimeSlot[]) => void;
  remove: (key: number) => void;
  syncToWorkdays: () => void;
  syncToWeekdays: () => void;
}

export const useReservableTimeSlots = (id: string, weekday: TWeek) => {
  const { course, loading, refetch } = useCourse(id);
  const [commitCourse, commitLoading] = useCreateOrUpdateCourse();
  const timeSlots = useMemo(
    () => {
      const rslots = course?.reservableTimeSlots || [];
      const slots = rslots.find((item) => item.weekday === weekday)?.slots;
      return slots || [];
    },
    [course, weekday],
  );

  const save = (slots: ITimeSlot[]) => {
    const rslots = [...(course?.reservableTimeSlots || [])];
    const index = rslots.findIndex((item) => item.weekday === weekday);
    if (index > -1) {
      rslots[index] = {
        weekday,
        slots,
      };
    } else {
      rslots.push({
        weekday,
        slots,
      });
    }
    commitCourse({
      reservableTimeSlots: rslots,
    }, id, () => {
      refetch();
    });
  };

  const remove = (key: number) => {
    const rslots = timeSlots.filter((item) => item.key !== key);
    const newSlots = rslots.map((item, index) => ({
      key: index + 1,
      start: item.start,
      end: item.end,
    }));
    save(newSlots);
  };

  const syncToWorkdays = () => {
    const rslots: ITimeSlots[] = [];
    WEEKDAYS.forEach((item) => {
      if (isWorkday(item.key)) {
        rslots.push({
          weekday: item.key,
          slots: timeSlots,
        });
      }
    });
    commitCourse({
      reservableTimeSlots: rslots,
    }, id, () => {
      refetch();
    });
  };

  const syncToWeekdays = () => {
    const rslots: ITimeSlots[] = [];
    WEEKDAYS.forEach((item) => {
      rslots.push({
        weekday: item.key,
        slots: timeSlots,
      });
    });
    commitCourse({
      reservableTimeSlots: rslots,
    }, id, () => {
      refetch();
    });
  };

  const resavableTimeSlotsHandlers: IReservableTimeSlotsHandlers = {
    save,
    remove,
    syncToWorkdays,
    syncToWeekdays,
  };

  return {
    timeSlots,
    resavableTimeSlotsHandlers,
    loading: loading || commitLoading,
  };
};
