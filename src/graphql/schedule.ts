import { gql } from '@apollo/client';

export const CREATE_SCHECULES = gql`
  mutation createSchedules($startAt: DateTime!, $endAt: DateTime!){
    createSchedules(startAt: $startAt, endAt: $endAt){
      code
      message
    }
  }
`;

export const GET_SCHEDULES = gql`
  query getSchedules($day: String!, $page: PageInput!){
    getSchedules(day: $day, page: $page){
      code
      message
      page{
        page
        pageSize
        total
      }
      data{
        id
        date
        start
        end
        limit
        organization{
          id
          name
        }
        course{
          id
          name
          teachers{
            id
            name
            photo
          }
        }
        teacher{
          id
          name
        }
        studentSchedules{
          id
          status
          student{
            id
            name
            avatar
          }
        }
      }
    }
  }
`;
