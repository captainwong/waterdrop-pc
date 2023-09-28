/* eslint-disable prettier/prettier */
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import {
  Button, Card, Input, Pagination, Popconfirm, Result, Spin, Tag,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDeleteTeacher, useTeachers } from '@/services/teacher';
import styles from './teacher.module.less';
import { CreateTeacher } from './create/create';

export const Teacher = () => {
  const [curId, setCurId] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const {
    loading,
    getTeachers,
    teachers,
    pagination,
  } = useTeachers();
  const [deleteTeacher, deleteLoading] = useDeleteTeacher();

  const onEdit = (id?: string) => {
    setCurId(id || '');
    setShowCreate(true);
  };

  const onPageChange = (page: number, pageSize: number) => {
    getTeachers({ page: { page, pageSize } });
  };

  const onSearch = (name: string) => {
    getTeachers({ name });
  };

  const onCreateTeacherClose = (shouldReload?: boolean) => {
    setShowCreate(false);
    if (shouldReload) {
      getTeachers();
    }
  };

  const onDelete = (id: string) => {
    deleteTeacher(id, () => getTeachers());
  };

  return (
    <div className={styles.container}>
      <PageContainer header={{ title: '教师管理' }}>
        <Card>
          <Input.Search
            placeholder="请输入教师姓名"
            className={styles.search}
            onSearch={onSearch}
            enterButton
            allowClear
          />
          <Button
            className={styles.add}
            type="primary"
            onClick={() => onEdit()}
          >
            <PlusOutlined />
            新增教师
          </Button>
        </Card>
        <Spin spinning={loading || deleteLoading}>
          {teachers.length === 0 && <Result title="暂无教师" />}
          {
          teachers.map((teacher) => (
            <ProCard
              key={teacher.id}
              className={styles.card}
              actions={[
                <EditOutlined key="edit" onClick={() => onEdit(teacher.id)} />,
                <Popconfirm
                  key="delete"
                  title="确定删除该教师吗？"
                  okButtonProps={{ danger: true, loading: deleteLoading }}
                  onConfirm={() => onDelete(teacher.id)}
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <div className={styles.avatar} style={{ backgroundImage: `url(${teacher.photo})` }} />
              <div className={styles.content}>
                <div className={styles.name}>
                  {teacher.name}
                </div>
                <div>
                  {
                    teacher.tags.split(',').map((tag) => (
                      <Tag key={tag} color="green">{tag}</Tag>
                    ))
                  }
                </div>
                <div className={styles.education}>{teacher.education}</div>
                <div className={styles.seniority}>{teacher.seniority}</div>
              </div>
            </ProCard>
          ))
        }
          <div className={styles.page}>
            <Pagination
              pageSize={pagination?.pageSize}
              current={pagination?.page}
              total={pagination?.total}
              onChange={onPageChange}
            />
          </div>
          {
          showCreate && <CreateTeacher id={curId} onClose={onCreateTeacherClose} />
        }
        </Spin>
      </PageContainer>
    </div>
  );
};
