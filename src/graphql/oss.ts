import { gql } from '@apollo/client';

const GET_OSS_INFO = gql`
query getOSSInfo {
  getOSSInfo{
    expire
    policy
    signature
    accessId
    host
    dir
  }
}
`;

export default GET_OSS_INFO;
