import { gql } from '@apollo/client';

export const GET_STUDENTS = gql`
  query getStudents($page: PageInput!){
    getStudents(page: $page){
      code
      data {
        id
        name
        tel
        avatar
        account
      }
      page {
        page
        pageSize
        total
      }
    }
  }
`;
