import { IProduct, PRODUCT_STATUS } from '@/types/product';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Image, Space } from 'antd';
import styles from './product.module.less';

interface IProps {
  onEdit?: (id: string) => void;
  onLinkCard?: (id: string) => void;
  onChageStatus: (id: string, status: string) => void;
}

export function getColumns({
  onEdit, onLinkCard, onChageStatus,
}: IProps): ProColumns<IProduct, 'text'>[] {
  return [
    {
      title: '#',
      dataIndex: 'id',
      valueType: 'indexBorder',
      search: false,
      align: 'center',
    },
    {
      title: '封面',
      dataIndex: 'cover',
      search: false,
      align: 'center',
      render: (_, entity) => (
        <Image src={entity.cover} />
      ),
    },
    {
      title: '商品名',
      dataIndex: 'name',
      ellipsis: true,
      copyable: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '商品名不能为空',
          },
        ],
      },
    },
    {
      title: '分类',
      dataIndex: 'category',
      align: 'center',
      search: false,
    },
    {
      title: '原价',
      dataIndex: 'originalPrice',
      align: 'center',
      search: false,
    },
    {
      title: '现价',
      dataIndex: 'price',
      align: 'center',
      search: false,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      align: 'center',
      search: false,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      align: 'center',
      search: false,
    },
    {
      title: '限购',
      dataIndex: 'limit',
      align: 'center',
      search: false,
      render: (_, entity) => (
        entity.limit === -1 ? '不限购' : entity.limit
      ),
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'id',
      align: 'center',
      width: 200,
      render: (_, entity) => (
        <Space>
          {
            entity.status === PRODUCT_STATUS.NOT_FOR_SAIL ?
              (
                <Button
                  className={styles.options}
                  key="on_sail"
                  type="link"
                  onClick={() => onChageStatus?.(entity.id, PRODUCT_STATUS.ON_SAIL)}
                >
                  上架
                </Button>
              )
              : (
                <Button
                  className={styles.options}
                  key="not_for_sail"
                  type="link"
                  onClick={() => onChageStatus?.(entity.id, PRODUCT_STATUS.NOT_FOR_SAIL)}
                >
                  下架
                </Button>
              )
          }
          <Button
            className={styles.options}
            key="edit"
            type="link"
            onClick={() => onEdit?.(entity.id)}
          >
            编辑
          </Button>
          <Button
            className={styles.options}
            key="link_card"
            type="link"
            onClick={() => onLinkCard?.(entity.id)}
          >
            绑定消费卡
          </Button>
        </Space>
      ),
    },
  ];
}
