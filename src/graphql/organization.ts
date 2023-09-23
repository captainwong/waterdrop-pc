import { gql } from '@apollo/client';

export const CREATE_ORGANIZATION = gql`
  mutation createOrganization($dto: CreateOrganizationDto!) {
    createOrganization(dto: $dto) {
      code
      message
      data {
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

export const UPDATE_ORGANIZATION = gql`
  mutation updateOrganizationInfo($id: String!, $dto: UpdateOrganizationDto!) {
    updateOrganizationInfo(id: $id, dto: $dto) {
      code
      message
      data {
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

export const GET_ORGANIZATION_INFO = gql`
  query getOrganizationInfo($id: String!) {
    getOrganizationInfo(id: $id) {
      code
      message
      data {
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
