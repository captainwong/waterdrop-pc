import {
  Drawer, Space, Tabs,
} from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import {
  ITimeSlot, IWeekday, WEEKDAYS, slotsMaxKey,
} from '@/types/course';
import { useState } from 'react';
import { useReservableTimeSlots } from '@/services/course';
import _ from 'lodash';
import { getColumns } from './columns';
import styles from './reservable-time.module.less';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const ReservationTime = ({ id, onClose }: IProps) => {
  const [curDay, setCurDay] = useState<IWeekday>(WEEKDAYS[0]);
  const {
    timeSlots,
    loading,
    resavableTimeSlotsHandlers,
  } = useReservableTimeSlots(id, curDay.key);

  const onTabChange = (key: string) => {
    const day = WEEKDAYS.find((item) => item.key === key);
    if (day) {
      setCurDay(day);
    }
  };

  return (
    <Drawer
      title="编辑课程可约时间"
      open
      width={720}
      onClose={() => onClose()}
    >
      <Tabs
        type="card"
        items={WEEKDAYS}
        onChange={onTabChange}
      />
      <EditableProTable<ITimeSlot>
        headerTitle={(
          <Space>
            选择
            <span className={styles.weekday}>
              {curDay.label}
            </span>
            的可约时间
          </Space>
        )}
        loading={loading}
        rowKey="key"
        recordCreatorProps={{
          record: () => ({
            key: slotsMaxKey(timeSlots) + 1,
            start: '08:00:00',
            end: '10:00:00',
          }),
        }}
        value={timeSlots}
        columns={getColumns()}
        editable={{
          onSave: async (key, record) => {
            let slots = [];
            if (timeSlots.findIndex((item) => item.key === key) > -1) {
              slots = timeSlots.map((item) => (item.key === key ? _.omit(record, 'index') : item));
            } else {
              slots = [...timeSlots, _.omit(record, 'index')];
            }
            resavableTimeSlotsHandlers.save(slots);
          },
          onDelete: async (key) => {
            resavableTimeSlotsHandlers.remove(key as number);
          },
        }}
      />

    </Drawer>
  );
};
