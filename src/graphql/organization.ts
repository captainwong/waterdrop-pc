import { gql } from '@apollo/client';

export const CREATE_OR_UPDATE_ORGANIZATION = gql`
  mutation createOrUpdateOrganization($dto: OrganizationInputDto!, $id:String){
    createOrUpdateOrganization(dto: $dto, id:$id){
      code
      message
      data{
        id
        createdAt
        createdBy
        updatedAt
        updatedBy
        deletedAt
        deletedBy
        businessLicense
        identityCardBackImg
        identityCardFrontImg
        tags
        desc
        name
        tel
        address
        longitude
        latitude
        logo
        frontImgs{
          id
          url
          remark
        }
        roomImgs{
          id
          url
          remark
        }
        otherImgs{
          id
          url
          remark
        }
      }
    }
  }
`;

export const GET_ORGANIZATION_INFO = gql`
  query getOrganizationInfo($id: String!) {
    getOrganizationInfo(id: $id) {
      code
      message
      data {
        id
        businessLicense
        identityCardBackImg
        identityCardFrontImg
        tags
        desc
        name
        tel
        address
        longitude
        latitude
        logo
        frontImgs {
          id
          url
          remark
        }
        roomImgs {
          id
          url
          remark
        }
        otherImgs {
          id
          url
          remark
        }
      }
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query getOrganizations($page: PageInput!) {
    getOrganizations(page: $page) {
      code
      message
      page {
        total
        page
        pageSize
      }
      data {
        id
        name
        address
        logo
        tags
      }
    }
  }
`;

export const GET_SIMPLE_ORGANIZATIONS = gql`
  query getOrganizations($page: PageInput!, $name: String) {
    getOrganizations(page: $page, name: $name) {
      code
      message
      data {
        id
        name
      }
    }
  }
`;

export const DELETE_ORGANIZATION = gql`
  mutation deleteOrganization($id: String!){
    deleteOrganization(id: $id){
      code
      message
      data
    }
  }
`;
