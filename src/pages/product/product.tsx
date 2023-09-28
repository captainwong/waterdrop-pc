/* eslint-disable prettier/prettier */
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateOrUpdateProduct, useDeleteProduct, useLasyProducts } from '@/services/product';
import { IProduct } from '@/types/product';
import { getColumns } from './columns';
import { EditProduct } from './edit/edit';
import { Card } from './card/card';

export const Product = () => {
  const actionRef = useRef<ActionType>();
  const [curId, setCurId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { getProducts, loading } = useLasyProducts();
  const [createOrUpdateProduct, createOrUpdateLoading] = useCreateOrUpdateProduct();
  const [deleteProduct, deleteLoading] = useDeleteProduct();

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

  return (
    <PageContainer header={{ title: '当前门店下的商品' }}>
      <ProTable<IProduct>
        rowKey="id"
        actionRef={actionRef}
        form={{ ignoreRules: false }}
        loading={loading || createOrUpdateLoading || deleteLoading}
        columns={getColumns({
          onEdit,
          onLinkCard,
          onChageStatus,
        })}
        pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onEdit()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={(params) => getProducts(params.name, params.current, params.pageSize)}
        editable={{
          onDelete: async (id) => {
            deleteProduct(id as string, () => { actionRef.current?.reload(); });
          },
        }}
      />
      {showEdit && <EditProduct id={curId} onClose={onEditClose} /> }
      {showCard && <Card id={curId} onClose={() => setShowCard(false)} />}
    </PageContainer>
  );
};
