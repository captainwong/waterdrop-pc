import { GET_COURSE, GET_COURSES, UPDATE_COURSE } from '@/graphql/course';
import {
  TCourse, TCourseMutation, TCourseQuery, TCoursesQuery,
} from '@/types/course';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

export const useLasyCourses = () => {
  const [get, { loading, error }] = useLazyQuery<TCoursesQuery>(GET_COURSES);

  const getCourses = async (name?:string, pageCur?:number, pageSize?:number) => {
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
    getCourses,
  };
};

export const useCourse = () => {
  const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE);
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

export type TUpdateCourse = (
  id: string,
  dto: TCourse,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useUpdateCourse = (): [TUpdateCourse, boolean] => {
  const [update, { loading }] = useMutation<TCourseMutation>(UPDATE_COURSE);
  const doUpdate = async (
    id: string,
    dto: TCourse,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await update({
      variables: {
        id,
        dto,
      },
    });

    if (res.data?.updateCourseInfo.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.updateCourseInfo.message || 'error');
    }
  };

  return [doUpdate, loading];
};
