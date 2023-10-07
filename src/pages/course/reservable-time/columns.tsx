import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

export const getColumns = (): ProColumns[] => [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
  },
  {
    title: '开始时间',
    dataIndex: 'start',
    valueType: 'time',
    width: 160,
    align: 'center',
    render: (_1, record) => {
      return record.start;
    },
  },
  {
    title: '结束时间',
    dataIndex: 'end',
    valueType: 'time',
    width: 160,
    align: 'center',
    render: (_1, record) => {
      return record.end;
    },
  },
  {
    title: '操作',
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (_1, record, _3, action) => (
      <Space>
        <Button
          type="link"
          key="edit"
          onClick={() => {
            action?.startEditable(record.key || '');
          }}
        >
          编辑
        </Button>
      </Space>
    ),
  },
];
