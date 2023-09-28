import { gql } from '@apollo/client';

export const CREATE_OR_UPDATE_CARD = gql`
  mutation createOrUpdateCard($courseId:String!, $dto: CardInputDto!, $id: String){
    createOrUpdateCard(courseId:$courseId, dto: $dto, id: $id){
      code
      message
      data{
        id
        name
        type
        count
        duration
      }
    }
  }
`;

export const GET_CARD = gql`
  query getCardInfo($courseId:String!, $id: String!){
    getCardInfo(courseId:$courseId, id: $id){
      code
      message
      data{
        id
        name
        type
        count
        duration
        course{
          id
          name
          desc
        }
      }
    }
  }
`;

export const GET_CARDS = gql`
  query getCards($courseId:String!, $name: String){
    getCards(courseId:$courseId, name: $name){
      code
      message
      data{
        id
        name
        type
        count
        duration
        course{
          id
          name
        }
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation deleteCard($courseId:String!, $id: String!){
    deleteCard(courseId:$courseId, id: $id){
      code
      message
    }
  }
`;
