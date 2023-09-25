import { ICourse } from '@/types/course';
import { ProColumns } from '@ant-design/pro-components';

export function getColumns(): ProColumns<ICourse, 'text'>[] {
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
  ];
}
