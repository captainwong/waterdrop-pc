import { gql } from '@apollo/client';

export const SEND_VERIFICATION_CODE = gql`
mutation sendVerificationCode($tel: String!){
  sendVerificationCode(tel: $tel)
}
`;

export const LOGIN = gql`
mutation login($tel: String!, $smsCode: String!){
  login(tel: $tel, smsCode: $smsCode)
}
`;
