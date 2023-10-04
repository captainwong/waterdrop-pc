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
  mutation createOrUpdateProduct($dto: PartialProductInputDto!, $id: String){
    createOrUpdateProduct(dto: $dto, id: $id){
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
        sales
        limit
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
          type
          count
          duration
          course{
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts($page: PageInput!, $name: String, $category: String){
    getProducts(page: $page, name: $name, category: $category){
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
        sales
        limit
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

export const BATCH_ON_SALE = gql`
  mutation productBatchOnSale($dto: BatchOnSaleInput!){
    productBatchOnSale(dto: $dto){
      code
      message
    }
  }
`;
