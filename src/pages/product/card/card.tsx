import { CARD_TYPE, ICard } from '@/types/card';
import { EditableProTable } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import { useCards, useCreateOrUpdateCard, useDeleteCard } from '@/services/card';
import { getColumns } from './columns';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const Card = ({ id, onClose }: IProps) => {
  const { cards, loading, refetch } = useCards(id);
  const [createOrUpdateCard, editLoading] = useCreateOrUpdateCard();
  const [deleteCard, deleteLoading] = useDeleteCard();

  return (
    <Drawer
      title="管理消费卡"
      open
      width={720}
      onClose={() => onClose()}
    >
      <EditableProTable<ICard>
        headerTitle="消费卡列表"
        loading={loading || editLoading || deleteLoading}
        rowKey="id"
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: CARD_TYPE.DURATION,
            duration: 365,
            count: 20,
          }),
        }}
        value={cards}
        columns={getColumns()}
        editable={{
          onSave: async (_key, record) => {
            createOrUpdateCard(id, {
              name: record.name,
              type: record.type,
              duration: record.duration,
              count: record.count,
            }, record.id === 'new' ? '' : record.id, () => { refetch(); });
          },
          onDelete: async (key) => {
            deleteCard(id, key as string, () => { refetch(); });
          },
        }}
      />
    </Drawer>
  );
};
