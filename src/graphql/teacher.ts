import { gql } from '@apollo/client';

export const CREATE_OR_UPDATE_TEACHER = gql`
  mutation createOrUpdateTeacher($dto: PartialTeacherInputDto!, $id: String){
    createOrUpdateTeacher(dto: $dto, id: $id){
      code
      message
      data{
        id
        name
        photo
        teachingAge
        education
        seniority
        experience
        award
        tags
        
      }
    }
  }
`;

export const GET_TEACHER = gql`
  query getTeacherInfo($id: String!){
    getTeacherInfo(id: $id){
      code
      message
      data{
        id
        name
        photo
        teachingAge
        education
        seniority
        experience
        award
        tags        
      }
    }
  }
`;

export const GET_TEACHERS = gql`
  query getTeachers($page: PageInput!, $name: String){
    getTeachers(page: $page, name: $name){
      code
      message
      page{
        page
        pageSize
        total
      }
      data{
        id
        name
        photo
        teachingAge
        education
        seniority
        experience
        award
        tags        
      }
    }
  }
`;

export const DELETE_TEACHER = gql`
  mutation deleteTeacher($id: String!){
    deleteTeacher(id: $id){
      code
      message
    }
  }
`;
