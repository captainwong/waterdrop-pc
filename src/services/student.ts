import { GET_STUDENTS } from '@/graphql/student';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TStudentsQuery } from '@/types/student';
import { useQuery } from '@apollo/client';

export const useStudents = (
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const {
    loading,
    data,
    refetch,
  } = useQuery<TStudentsQuery>(GET_STUDENTS, {
    variables: {
      page: { page, pageSize },
    },
  });

  return {
    loading,
    refetch,
    code: data?.getStudents.code,
    message: data?.getStudents.message,
    students: data?.getStudents.data,
    pagination: data?.getStudents.page,
  };
};
