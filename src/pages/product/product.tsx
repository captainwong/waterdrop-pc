/* eslint-disable prettier/prettier */
import {
  ActionType, PageContainer, ProFormInstance, ProTable,
} from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button, message } from 'antd';
import { PlusOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import {
  useBatchOnSale,
  useCreateOrUpdateProduct, useDeleteProduct, useLazyProducts, useProductCategoryList,
} from '@/services/product';
import { IProduct } from '@/types/product';
import { IValueEnum, getColumns } from './columns';
import { EditProduct } from './edit/edit';
import { Card } from './card/card';
import styles from './product.module.less';

export const Product = () => {
  const formRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { getProducts, loading } = useLazyProducts();
  const [createOrUpdateProduct, createOrUpdateLoading] = useCreateOrUpdateProduct();
  const [deleteProduct, deleteLoading] = useDeleteProduct();
  const { categoryList, loading: categoryListLoading } = useProductCategoryList();
  const [batchOnSale, batchLoading] = useBatchOnSale();
  const [curIds, setCurIds] = useState<string[]>([]);

  const getCategoryName = (key: string) => {
    const category = categoryList.find((item) => item.key === key);
    return category?.name || '-';
  };

  const onEdit = (id?: string) => {
    setCurId(id || '');
    setShowEdit(true);
  };

  const onLinkCard = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };

  const onChageStatus = (id: string, status: string) => {
    createOrUpdateProduct({ status }, id, () => actionRef.current?.reload());
  };

  const onEditClose = (shouldReload?: boolean) => {
    setShowEdit(false);
    if (shouldReload) {
      actionRef.current?.reload();
    }
  };

  const makeAllOnSale = (onSale: boolean) => {
    batchOnSale({
      products: curIds,
      onSale,
    }, () => {
      message.success(onSale ? '批量上架成功' : '批量下架成功');
      actionRef.current?.reload();
    }, (error) => {
      message.error(onSale ? `批量上架失败：${error}` : `批量下架失败：${error}`);
    });
  };

  if (categoryListLoading) {
    return null;
  }

  const categories = categoryList.reduce<IValueEnum>((acc, item) => {
    acc[item.key] = {
      text: item.name,
    };
    return acc;
  }, {});

  const onRequest = (params: any) => {
    console.log('onRequest', { params });
    return getProducts(params.name, params.category, params.current, params.pageSize);
  };

  return (
    <PageContainer header={{ title: '当前门店下的商品' }}>
      <ProTable<IProduct>
        rowKey="id"
        actionRef={actionRef}
        form={{ ignoreRules: false }}
        formRef={formRef}
        loading={
          loading || createOrUpdateLoading || deleteLoading || batchLoading || categoryListLoading
        }
        columns={getColumns({
          categories,
          getCategoryName,
          onEdit,
          onLinkCard,
          onChageStatus,
        })}
        pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        toolBarRender={() => [
          <Button
            className={styles.on_sale}
            key="all_on_sale"
            onClick={() => makeAllOnSale(true)}
            type="dashed"
            icon={<VerticalAlignTopOutlined />}
          >
            本页商品全部上架
          </Button>,

          <Button
            className={styles.not_for_sale}
            key="all_not_for_sale"
            onClick={() => makeAllOnSale(false)}
            type="dashed"
            icon={<VerticalAlignBottomOutlined />}
          >
            本页商品全部下架
          </Button>,

          <Button key="add" onClick={() => onEdit()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={onRequest}
        editable={{
          onDelete: async (id) => {
            deleteProduct(id as string, () => { actionRef.current?.reload(); });
          },
        }}
        onLoad={(dataSource) => {
          setCurIds(dataSource.map((item) => item.id));
        }}
      />
      {showEdit && <EditProduct id={curId} onClose={onEditClose} /> }
      {showCard && <Card id={curId} onClose={() => setShowCard(false)} />}
    </PageContainer>
  );
};
