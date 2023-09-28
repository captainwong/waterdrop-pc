import { CARD_TYPE, TCard } from '@/types/card';
import {
  Modal, Result, Row, Space, Tag, Typography,
} from 'antd';
import { useLazyCards } from '@/services/card';
import { useCreateOrUpdateProduct, useProduct } from '@/services/product';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { CourseSearch } from '@/components/courseSearch/CourseSearch';
import { CheckCard } from '@ant-design/pro-components';
import { CreditCardOutlined } from '@ant-design/icons';
import styles from './card.module.less';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const Card = ({ id, onClose }: IProps) => {
  const { loading, cards, getCards } = useLazyCards();
  const { product, loading: productLoading } = useProduct(id);
  const [updateProduct, updateProductLoading] = useCreateOrUpdateProduct();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const newCards = useMemo<TCard[]>(() => {
    return _.unionBy(product?.cards || [], cards || [], 'id');
  }, [cards, product?.cards]);

  useEffect(() => {
    const selected:string[] = [];
    product?.cards?.forEach((card) => {
      if (card && card.id) {
        selected.push(card.id);
      }
    });
    setSelectedCards(selected);
  }, [product?.cards]);

  const onOk = () => {
    updateProduct({
      cards: selectedCards.map((item) => ({ id: item })),
    }, id, () => {
      onClose();
    });
  };

  const onSelect = (courseId: string) => {
    getCards(courseId);
  };

  const getCardType = (type: string) => {
    switch (type) {
      case CARD_TYPE.COUNT:
        return <Tag color="blue">次卡</Tag>;
      case CARD_TYPE.DURATION:
        return <Tag color="green">日卡</Tag>;
      default:
        return '-';
    }
  };

  return (
    <Modal
      title="关联消费卡"
      width="80vw"
      open
      onOk={onOk}
      onCancel={() => onClose()}
    >
      <Row justify="end">
        <CourseSearch onSelected={onSelect} />
      </Row>
      <Row justify="center" className={styles.content}>
        {
          newCards.length === 0 && (
            <Result
              status="warning"
              title="当前课程无消费卡"
            />
          )
        }
        <CheckCard.Group
          multiple
          loading={loading || productLoading || updateProductLoading}
          onChange={(val) => {
            console.log('onChange', val);
            const ids = val as string[];
            const tmpCards = newCards.filter((card) => (card && card.id && ids.includes(card.id)));
            const selectedIds:string[] = [];
            tmpCards.forEach((card) => {
              if (card && card.id) {
                selectedIds.push(card.id);
              }
            });
            setSelectedCards(selectedIds);
          }}
          value={selectedCards}
        >
          {
            newCards.map((card) => (
              <CheckCard
                size="small"
                key={card.id}
                value={card.id}
                avatar={<CreditCardOutlined />}
                title={(
                  <div>
                    <Space>
                      <Typography.Text ellipsis className={styles.name}>
                        {card.course?.name}
                      </Typography.Text>
                      {getCardType(card.type || '')}
                    </Space>
                    <br />
                    <Typography.Text ellipsis type="secondary">
                      {card.name}
                    </Typography.Text>
                  </div>
                )}
                description={(
                  <Space>
                    {
                      card.type === CARD_TYPE.COUNT && (
                        <span>
                          次数：
                          {card.count}
                        </span>
                      )
                    }
                    <span>
                      有效期：
                      {card.duration}
                      天
                    </span>
                  </Space>
                )}
              />
            ))
          }
        </CheckCard.Group>
      </Row>
    </Modal>
  );
};
