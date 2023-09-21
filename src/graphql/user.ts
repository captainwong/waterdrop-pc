import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
query getUserInfo{
  getUserInfo{
    id
    name
    desc
    tel
    avatar
  }
}
`;

export const UPDATE_USER_INFO = gql`
mutation updateUserInfo($id: Float!, $params: UpdateUserDto!){
  updateUserInfo(id: $id, params: $params){
    code
    message
    data
  }
}
`;
