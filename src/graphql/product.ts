import { gql } from '@apollo/client';

export const GET_PRODUCT_CATEGORY = gql`
  query getProductCategories{
    getProductCategories{
      code
      message
      data{
        key
        name
      }
    }
  }
`;

export const CREATE_OR_UPDATE_PRODUCT = gql`
  mutation createOrUpdateProduct($dto: PartialProductInputDto!){
    createOrUpdateProduct(dto: $dto){
      code
      message
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProductInfo($id: String!){
    getProductInfo(id: $id){
      code
      message
      data{
        id
        name
        desc
        category
        stock
        price
        originalPrice
        cover
        banner
        organization{
          id
          name
        }
        cards{
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($page: PageInput!, $name: String){
    getProducts(page: $page, name: $name){
      code
      message
      page{
        page
        pageSize
        total
      }
      data{
        id
        name
        desc
        category
        status
        stock
        price
        originalPrice
        cover
        banner
        organization{
          id
          name
        }
        cards{
          id
          name
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!){
    deleteProduct(id: $id){
      code
      message
    }
  }
`;
