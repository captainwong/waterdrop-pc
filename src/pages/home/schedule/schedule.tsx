import { useSchedules } from '@/services/schedule';
import {
  Avatar, Descriptions, Result, Space, Spin, Steps,
} from 'antd';
import styles from './schedule.module.less';

interface IProps {
  day: string;
}

export const Schedule = ({ day }: IProps) => {
  const { schedules, loading } = useSchedules(day);
  return (
    <Spin spinning={loading} className={styles.container}>
      {(schedules && schedules.length > 0)
        ? (
          <Steps
            direction="vertical"
            items={
              schedules.map((schedule) => ({
                title: `${schedule.start}-${schedule.end} ${schedule.course.name}`,
                description: (
                  <Descriptions bordered size="small">
                    <Descriptions.Item span={3} label="讲师" labelStyle={{ width: 80 }}>
                      <Space>
                        {
                          schedule.course.teachers.map((teacher) => (
                            <Space key={teacher.id}>
                              <Avatar shape="square" size="small" src={teacher.photo} />
                              {teacher.name}
                            </Space>
                          ))
                        }
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                ),
              }))
            }
          />
        ) : (
          <Result status="warning" title="本日无课程" />
        )}
    </Spin>
  );
};
