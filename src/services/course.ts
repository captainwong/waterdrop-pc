import { GET_COURSE, GET_COURSES } from '@/graphql/course';
import { TCoursesQuery } from '@/types/course';
import { ParamsType } from '@ant-design/pro-components';
import { useLazyQuery } from '@apollo/client';

type TFetchCoursesParams = ParamsType & {
  pageSize?: number | undefined;
  current?: number | undefined;
  keyword?: string | undefined;
};

export const useLasyCourses = () => {
  const [get, { loading, error }] = useLazyQuery<TCoursesQuery>(GET_COURSES);

  const request = async (params: TFetchCoursesParams) => {
    const res = await get({
      variables: {
        name: params.name,
        page: {
          page: params.current,
          pageSize: params.pageSize,
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
    request,
  };
};

export const useLazyCourse = () => {
  const [get, { loading }] = useLazyQuery(GET_COURSE);
  const getCourse = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });
    return res.data.getCourseInfo.data;
  };

  return { getCourse, loading };
};
