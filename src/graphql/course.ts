import { gql } from '@apollo/client';

export const CREATE_COURSE = gql`
  mutation createCourse($dto: CreateCourseDto!){
    createCourse(dto: $dto){
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
      }
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation updateCourseInfo($id: String!, $dto: UpdateCourseDto!){
    updateCourseInfo(id: $id, dto: $dto){
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
  query getCourses($page: PageInput!){
    getCourses(page: $page){
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
      }
      page{
        page
        pageSize
        total
      }
    }
  }
`;
