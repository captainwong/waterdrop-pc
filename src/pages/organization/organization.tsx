/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  PageContainer,
  ProList,
} from '@ant-design/pro-components';
import {
  Button, Popconfirm, Tag, message,
} from 'antd';
import { useState } from 'react';
import { useDeleteOrganization, useOrganizations } from '@/services/organization';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styles from './organization.module.less';
import EditOrg from './edit/edit';

export const Organization = () => {
  const {
    loading, orgs, pagination, refetch,
  } = useOrganizations();
  const [deleteOrganization, deleteLoading] = useDeleteOrganization();

  const [showEdit, setShowEdit] = useState(false);
  const [curId, setCurId] = useState('');

  const editInfoHandler = (id: string) => {
    setCurId(id);
    setShowEdit(true);
  };

  const delInfoHandler = (id: string) => {
    deleteOrganization(
      id,
      () => { message.success('删除成功', 1, () => refetch()); },
      (error: string) => { message.error(`删除失败！${error}`); },
    );
  };

  const addInfoHandler = () => {
    setCurId('');
    setShowEdit(true);
  };

  const onCloseHandler = (shouldReload: boolean) => {
    setShowEdit(false);
    if (shouldReload) {
      refetch();
    }
  };

  const onPageChangeHandler = (page: number, pageSize: number) => {
    refetch({
      page: {
        page,
        pageSize,
      },
    });
  };

  const dataSource = orgs?.map((item) => ({
    ...item,
    key: item.id,
    subTitle: (
      <div>
        {item.tags?.split(',').map((tag) => (
          <Tag className={styles.tag} key={tag} color="#5bd8a6">{tag}</Tag>
        ))}
      </div>
    ),
    actions: [
      <Button className={styles.button} type="link" onClick={() => editInfoHandler(item.id)}>
        <EditOutlined />
        {' '}
        编辑
      </Button>,
      <Popconfirm
        title="提醒"
        description="确认删除该门店？"
        okButtonProps={{ danger: true, loading: deleteLoading }}
        onConfirm={() => delInfoHandler(item.id)}
      >
        <Button className={styles.button} type="link" danger>
          <DeleteOutlined />
          删除
        </Button>
      </Popconfirm>,
    ],
    content: item.address,
  }));

  return (
    <div className={styles.container}>
      <PageContainer
        loading={loading}
        header={{
          title: '门店管理',
        }}
        extra={[
          <Button key="add" type="primary" onClick={addInfoHandler}>
            新增门店
          </Button>,
        ]}
      >
        <ProList<any>
          pagination={{
            defaultPageSize: DEFAULT_PAGE_SIZE,
            showSizeChanger: false,
            total: pagination?.total,
            onChange: onPageChangeHandler,
          }}
          grid={{ gutter: 10, column: 2 }}
          showActions="hover"
          rowSelection={false}
          metas={{
            title: { dataIndex: 'name' },
            subTitle: {},
            type: {},
            avatar: { dataIndex: 'logo' },
            content: { dataIndex: 'address' },
            actions: {
              cardActionProps: 'extra',
            },
          }}
          dataSource={dataSource}
        />
        {showEdit && (
          <EditOrg
            id={curId}
            onClose={onCloseHandler}
          />
        )}
      </PageContainer>
    </div>
  );
};
