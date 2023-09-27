import { CARD_TYPE, ICard } from '@/types/card';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

export const getColumns = (): ProColumns<ICard>[] => [
  {
    title: '序号',
    dataIndex: 'id',
    width: 50,
    editable: false,
    align: 'center',
    render: (_text, _record, index) => `${index + 1}`,
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '有效天数',
    dataIndex: 'duration',
    align: 'center',
    valueType: 'digit',
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    valueType: 'select',
    request: async () => [
      { label: '日卡', value: CARD_TYPE.DURATION },
      { label: '次卡', value: CARD_TYPE.COUNT },
    ],
  },
  {
    title: '有效次数',
    dataIndex: 'count',
    align: 'center',
    valueType: 'digit',
  },
  {
    title: '操作',
    valueType: 'option',
    align: 'center',
    render: (_text, record, _index, action) => (
      <Space>
        <Button key="edit" type="link" onClick={() => action?.startEditable(record.id)}>
          编辑
        </Button>
      </Space>
    ),
  },
];
