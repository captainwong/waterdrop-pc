import { GET_COURSES } from '@/graphql/course';
import { TCoursesQuery } from '@/types/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { ParamsType } from '@ant-design/pro-components';
import { useQuery } from '@apollo/client';

type TFetchCoursesParams = ParamsType & {
  pageSize?: number | undefined;
  current?: number | undefined;
  keyword?: string | undefined;
};

export const useLasyCourses = (page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const {
    loading,
    refetch,
  } = useQuery<TCoursesQuery>(GET_COURSES, {
    skip: true,
    variables: {
      page: { page, pageSize },
    },
  });

  const request = async (params: TFetchCoursesParams) => {
    // console.log('params:', params);
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        page: params.current,
        pageSize: params.pageSize,
      },
    });

    if (errors) {
      return {
        success: false,
        error: errors[0].message,
      };
    }

    return {
      success: true,
      data: res?.getCourses.data,
      total: res?.getCourses.page.total,
    };
  };

  return {
    loading,
    request,
  };
};
