import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
query getUserInfo{
  getUserInfo{
    id
    name
    desc
    tel
    password
    account
  }
}
`;
