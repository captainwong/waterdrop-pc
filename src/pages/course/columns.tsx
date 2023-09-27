import { ICourse } from '@/types/course';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface IProps {
  onEdit?: (id: string) => void;
  onReservationTime?: (id: string) => void;
  onCard?: (id: string) => void;
}

export function getColumns({ onEdit, onReservationTime, onCard }: IProps): ProColumns<ICourse, 'text'>[] {
  return [
    {
      title: '课程名称',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '限制人数',
      dataIndex: 'limit',
      search: false,
    },
    {
      title: '持续时长',
      dataIndex: 'duration',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      align: 'center',
      render: (_, entity) => (
        <Space>
          <Button
            key="edit"
            type="link"
            onClick={() => onEdit?.(entity.id)}
          >
            编辑
          </Button>
          <Button
            key="reservationTime"
            type="link"
            onClick={() => onReservationTime?.(entity.id)}
          >
            可约时间
          </Button>
          <Button
            key="card"
            type="link"
            onClick={() => onCard?.(entity.id)}
          >
            管理消费卡
          </Button>
        </Space>
      ),
    },
  ];
}
