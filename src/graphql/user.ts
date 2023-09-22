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
mutation updateUserInfo($params: UpdateUserDto!){
  updateUserInfo(params: $params){
    code
    message
    data
  }
}
`;
