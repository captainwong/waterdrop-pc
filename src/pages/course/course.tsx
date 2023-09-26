/* eslint-disable prettier/prettier */
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { ICourse } from '@/types/course';
import { useRef, useState } from 'react';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLasyCourses } from '@/services/course';
import { getColumns } from './columns';
import { EditCourse } from './edit/edit';
import { ReservationTime } from './reservable-time/reservable-time';

export const Course = () => {
  const actionRef = useRef<ActionType>();
  const { getCourses } = useLasyCourses();
  const [curId, setCurId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [showReservationTime, setShowReservationTime] = useState(false);

  console.log(curId);

  const onClickAdd = (id?: string) => {
    setCurId(id || '');
    setShowEdit(true);
  };

  const onClickReservationTime = (id: string) => {
    setCurId(id);
    setShowReservationTime(true);
  };

  const onEditClose = (shouldReload?: boolean) => {
    setShowEdit(false);
    if (shouldReload) {
      actionRef.current?.reload();
    }
  };

  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        columns={getColumns({
          onEdit: onClickAdd,
          onReservationTime: onClickReservationTime,
        })}
        pagination={{ pageSize: DEFAULT_PAGE_SIZE }}
        toolBarRender={() => [
          <Button key="add" onClick={() => onClickAdd()} type="primary" icon={<PlusOutlined />}>
            新建
          </Button>,
        ]}
        request={(params) => getCourses(params.name, params.current, params.pageSize)}
      />
      {showEdit && <EditCourse id={curId} onClose={onEditClose} /> }
      {showReservationTime
        && <ReservationTime id={curId} onClose={() => setShowReservationTime(false)} />}
    </PageContainer>
  );
};
