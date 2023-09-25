/* eslint-disable prettier/prettier */
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { ICourse } from '@/types/course';
import { useRef } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLasyCourses } from '@/services/course';
import { getColumns } from './columns';

export const Course = () => {
  const actionRef = useRef<ActionType>();
  const { request } = useLasyCourses();

  const onClickAdd = () => {

  };

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns()}
        pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAdd()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={request}
      />
    </PageContainer>
  );
};
