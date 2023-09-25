import { gql } from '@apollo/client';

export const GET_USER_BY_TOKEN = gql`
  query getUserByToken{
    getUserByToken{
      code
      message
      data{
          name
          desc
          tel
          account
          avatar
      }
    }
  }
`;

export const UPDATE_USER_BY_TOKEN = gql`
  mutation updateUserByToken($dto: UpdateUserDto!){
    updateUserByToken(dto: $dto){
      code
      message
      data{
          name
          desc
          tel
          account
          avatar
      }
    }
  }
`;
