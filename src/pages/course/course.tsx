/* eslint-disable prettier/prettier */
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { ICourse } from '@/types/course';
import { useRef, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLasyCourses } from '@/services/course';
import { getColumns } from './columns';

export const Course = () => {
  const actionRef = useRef<ActionType>();
  const { getCourses } = useLasyCourses();
  const [curId, setCurId] = useState('');

  console.log(curId);

  const onClickAdd = (id?: string) => {
    setCurId(id || '');
  };

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
          onEdit: onClickAdd,
          onReservationTime: onClickAdd,
        })}
        pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAdd()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={(params) => getCourses(params.name, params.current, params.pageSize)}
      />
    </PageContainer>
  );
};
