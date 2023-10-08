import { useSchedules } from '@/services/schedule';
import {
  Avatar, Button, Descriptions, Divider, Result, Space, Spin, Steps,
} from 'antd';
import styles from './schedule.module.less';

interface IProps {
  day: string;
}

export const Schedule = ({ day }: IProps) => {
  const {
    loading,
    hasMore,
    schedules,
    loadMoreSchedules,
  } = useSchedules(day);

  // if (loading) {
  //   return <Spin />;
  // }

  return (
    <div className={styles.container}>
      {(schedules && schedules.length > 0)
        ? (
          <div>
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
            {
              hasMore ? (
                <Divider>
                  <Button type="link" loading={loading} onClick={() => loadMoreSchedules()}>加载更多</Button>
                </Divider>
              ) : (
                <Divider>没有更多了</Divider>
              )
            }
          </div>
        ) : (
          <Result status="warning" title="本日无课程" />
        )}
    </div>
  );
};
