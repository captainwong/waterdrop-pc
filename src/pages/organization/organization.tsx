/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  PageContainer,
  ProList,
} from '@ant-design/pro-components';
import { Button, Tag } from 'antd';
import { useState } from 'react';
import { useOrganizations } from '@/services/organization';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import styles from './organization.module.less';
import EditOrg from './edit/edit';

export const Organization = () => {
  const {
    loading, data, page: pagination, refetch,
  } = useOrganizations();

  const [showEdit, setShowEdit] = useState(false);
  const [curId, setCurId] = useState('');

  const editInfoHandler = (id: string) => {
    setCurId(id);
    setShowEdit(true);
  };

  const delInfoHandler = (id: string) => {
    setCurId(id);
    setShowEdit(true);
  };

  const addInfoHandler = () => {
    setCurId('');
    setShowEdit(true);
  };

  const onCloseHandler = () => {
    setShowEdit(false);
    refetch();
  };

  const onPageChangeHandler = (page: number, pageSize: number) => {
    refetch({
      page: {
        page,
        pageSize,
      },
    });
  };

  const dataSource = data?.map((item) => ({
    ...item,
    key: item.id,
    subTitle: <div>{item.tags?.split(',').map((tag) => (<Tag key={tag} color="#5bd8a6">{tag}</Tag>))}</div>,
    actions: [
      <a key="edit" onClick={() => editInfoHandler(item.id)}>
        编辑
      </a>,
      <a key="del" onClick={() => delInfoHandler(item.id)}>
        删除
      </a>,
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
