import {
  BATCH_ON_SALE,
  CREATE_OR_UPDATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCT, GET_PRODUCTS, GET_PRODUCT_CATEGORY,
} from '@/graphql/product';
import { TGraphqlMutation } from '@/types/graphql';
import {
  IBatchOnSale,
  TProduct, TProductCategoryQuery, TProductQuery, TProductsQuery,
} from '@/types/product';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';

export const useProductCategoryList = () => {
  const { data, loading } = useQuery<TProductCategoryQuery>(GET_PRODUCT_CATEGORY);
  const categoryList = useMemo(() => data?.getProductCategories.data || [], [data]);
  return { categoryList, loading };
};

export type TCreateOrUpdateProduct = (
  dto: TProduct,
  id?: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useCreateOrUpdateProduct = ():[TCreateOrUpdateProduct, boolean] => {
  const [commit, { loading }] = useMutation<TGraphqlMutation>(CREATE_OR_UPDATE_PRODUCT);
  const createOrUpdateProduct: TCreateOrUpdateProduct = async (dto, id, onSuccess, onError) => {
    const res = await commit({
      variables: {
        id,
        dto,
      },
    });
    if (res.data?.createOrUpdateProduct.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.createOrUpdateProduct.message || 'error');
    }
  };
  return [createOrUpdateProduct, loading];
};

export type TBatchOnSale = (
  dto: IBatchOnSale,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useBatchOnSale = (): [TBatchOnSale, boolean] => {
  const [commit, { loading }] = useMutation<TGraphqlMutation>(BATCH_ON_SALE);
  const batchOnSale: TBatchOnSale = async (dto, onSuccess, onError) => {
    const res = await commit({
      variables: {
        dto,
      },
    });
    if (res.data?.productBatchOnSale.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.productBatchOnSale.message || 'error');
    }
  };
  return [batchOnSale, loading];
};

export const useProduct = (id: string) => {
  const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
    skip: !id,
    variables: {
      id,
    },
  });

  const newProduct = useMemo(() => ({
    ...data?.getProductInfo.data,
    cards: data?.getProductInfo.data?.cards || [],
    cover: [{ url: data?.getProductInfo.data?.cover }],
    banner: [{ url: data?.getProductInfo.data?.banner }],
  }), [data]);

  return {
    product: data?.getProductInfo.data ? newProduct : undefined, loading, refetch,
  };
};

export type TDeleteProduct = (
  id: string,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useDeleteProduct = ():[TDeleteProduct, boolean] => {
  const [commit, { loading }] = useMutation<TGraphqlMutation>(DELETE_PRODUCT);
  const deleteProduct: TDeleteProduct = async (id: string, onSuccess, onError) => {
    const res = await commit({
      variables: {
        id,
      },
    });
    if (res.data?.deleteProduct.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.deleteProduct.message || 'error');
    }
  };
  return [deleteProduct, loading];
};

export const useLazyProducts = () => {
  const [get, { loading, error }] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);

  const getProducts = async (
    name?: string,
    category?: string,
    pageCur?: number,
    pageSize?: number,
  ) => {
    const res = await get({
      variables: {
        name,
        category,
        page: {
          page: pageCur,
          pageSize,
        },
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (res?.data?.getProducts.code !== 200) {
      return {
        success: false,
        error: res?.data?.getProducts.message || 'error',
      };
    }

    return {
      success: true,
      data: res?.data?.getProducts.data,
      total: res?.data?.getProducts.page.total,
    };
  };

  return {
    getProducts,
    loading,
  };
};
