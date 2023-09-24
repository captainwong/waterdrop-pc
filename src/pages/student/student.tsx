/* eslint-disable prettier/prettier */
import { useStudents } from '@/services/student';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Pagination } from 'antd';
import styles from './student.module.less';

export const Student = () => {
  const {
    students, refetch, loading, pagination,
  } = useStudents();

  const onPageChangeHandler = (page: number, pageSize: number) => {
    refetch({
      page: {
        page,
        pageSize,
      },
    });
  };

  return (
    <div className={styles.container}>
      <PageContainer
        loading={loading}
        header={{
          title: '学员管理',
        }}
      >
        <div>
          {students?.map((student) => (
            <Card
              className={styles.card}
              key={student.id}
              hoverable
              cover={(
                <div
                  className={styles.avatar}
                  style={{
                    backgroundImage: `url(${student.avatar || 'http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/1675623073445.jpg'})`,
                  }}
                />
              )}
            >
              <Card.Meta
                title={student.name || 'Nobody'}
                description={[student.account || 'No account', student.tel || 'No tel']}
              />
            </Card>
          ))}
          <div className={styles.pagination}>
            <Pagination
              pageSize={pagination?.pageSize}
              current={pagination?.page}
              total={pagination?.total}
              onChange={onPageChangeHandler}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};
