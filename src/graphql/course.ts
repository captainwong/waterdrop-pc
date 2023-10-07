import { gql } from '@apollo/client';

export const CREATE_OR_UPDATE_COURSE = gql`
  mutation createOrUpdateCourse($dto: CourseInputDto!, $id: String){
    createOrUpdateCourse(dto: $dto, id: $id){
      code
      message
      data{
        id
        name
        desc
        group
        baseAbility
        limit
        duration
        reservation
        cover
        refund
        note
        teachers{
          id
          name
        }
        organization {
          id
          name
        }
        resavableTimeSlots{
          weekday
          slots{
            start
            end
            key
          }
        }
      }
    }
  }
`;

export const GET_COURSE = gql`
  query getCourseInfo($id: String!){
    getCourseInfo(id: $id){
      code
      message
      data{
        id
        name
        desc
        group
        baseAbility
        limit
        duration
        reservation
        cover
        refund
        note
        teachers{
          id
          name
        }
        organization {
          id
          name
        }
        resavableTimeSlots{
          weekday
          slots{
            start
            end
            key
          }
        }
      }
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: String!){
    deleteCourse(id: $id){
      code
      message
      data
    }
  }
`;

export const GET_COURSES = gql`
  query getCourses($page: PageInput!, $name: String){
    getCourses(page: $page, name: $name){
      code
      data{
        id
        name
        desc
        group
        baseAbility
        limit
        duration
        reservation
        cover
        refund
        note
        teachers{
          id
          name
        }
        organization {
          id
          name
        }
        resavableTimeSlots{
          weekday
          slots{
            start
            end
            key
          }
        }
      }
      page{
        page
        pageSize
        total
      }
    }
  }
`;

export const GET_SIMPLE_COURSES = gql`
  query getCourses($page: PageInput!, $name: String){
    getCourses(page: $page, name: $name){
      code
      data{
        id
        name
      }
    }
  }
`;
