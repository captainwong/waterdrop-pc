import { gql } from '@apollo/client';

const GET_OSS_INFO = gql`
  query getOSSInfo {
    getOSSInfo{
        code
        message
        data {
          expire
          policy
          signature
          accessId
          host
        }
    }
  }
`;

export default GET_OSS_INFO;
