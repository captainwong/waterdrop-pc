/* eslint-disable import/prefer-default-export */
import { PageContainer } from '@ant-design/pro-components';
import {
  Button, Calendar, Card, Col, DatePicker, Result, Row, Spin, message,
} from 'antd';
import { useOrganization } from '@/services/organization';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_FORMAT_DATE } from '@/utils/constants';
import { getCurrentOrganization } from '@/utils/curorg';
import { useCreateSchedules } from '@/services/schedule';
import styles from './home.module.css';
import { Schedule } from './schedule/schedule';

export const Home = () => {
  const { org, loading: orgLoading } = useOrganization(getCurrentOrganization()?.id || '');
  const [day, setDay] = useState<string>(dayjs().format(DATE_FORMAT_DATE));
  const [range, setRange] = useState<[string, string]>(['', '']); // 开始结束日期
  const [createSchedules, loading] = useCreateSchedules();

  if (orgLoading) {
    return <Spin />;
  }

  if (!org) {
    return (
      <Result
        status="warning"
        title="未找到门店，请重新选择门店"
      />
    );
  }

  const onRangeChange = (vals: [Dayjs | null, Dayjs | null] | null) => {
    if (!vals || !vals[0] || !vals[1]) {
      message.error('请选择开始和结束日期');
      return;
    }
    setRange([vals[0].format(DATE_FORMAT_DATE), vals[1].format(DATE_FORMAT_DATE)]);
  };

  const onCreateSchedule = () => {
    if (!range[0] || !range[1]) {
      message.error('请选择开始和结束日期');
      return;
    }
    createSchedules(range[0], range[1], () => {
      message.success('排课成功');
    }, (error) => {
      message.error(`排课失败！${error}`);
    });
  };

  return (
    <PageContainer className={styles.container} content={org.address} header={{ title: org.name }}>
      <Row gutter={20}>
        <Col flex="auto">
          <Card
            title={`${day} 课程安排}`}
            className={styles.card}
            extra={(
              <span>
                <DatePicker.RangePicker onChange={(vals) => onRangeChange(vals)} />
                <Button type="link" onClick={onCreateSchedule} loading={loading}>
                  开始排课
                </Button>
              </span>
            )}
          >
            <Schedule day={day} />
          </Card>
        </Col>
        <Col flex="300px">
          <Calendar fullscreen={false} onChange={(d) => setDay(d.format(DATE_FORMAT_DATE))} />
        </Col>
      </Row>
    </PageContainer>
  );
};
