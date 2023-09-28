import OssImgUploader from '@/components/ossImgUploader/OssImgUploader';
import { useCreateOrUpdateTeacher, useTeacher } from '@/services/teacher';
import {
  Button, Col, Drawer, Form, Input, InputNumber, Row, Select, Space, Spin,
} from 'antd';
import { useMemo } from 'react';
import TextArea from 'antd/es/input/TextArea';
import styles from './create.module.less';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const CreateTeacher = ({ id, onClose }: IProps) => {
  const [form] = Form.useForm();
  const { teacher, loading } = useTeacher(id);
  const [createOrUpdateTeacher, createOrUpdateLoading] = useCreateOrUpdateTeacher();

  const initValue = useMemo(() => {
    return teacher ? {
      ...teacher,
      tags: teacher.tags?.split(','),
      photo: [{ url: teacher.photo }],
    } : {};
  }, [teacher]);

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      createOrUpdateTeacher({
        ...values,
        tags: values.tags?.join(','),
        photo: values.photo[0].url,
      }, id, () => {
        onClose(true);
      });
    }
  };

  return (
    <Drawer
      onClose={() => onClose()}
      open
      width="70vw"
      title="创建教师"
      extra={(
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button loading={loading} onClick={onSubmit} type="primary">提交</Button>
        </Space>
      )}
    >
      <Spin spinning={loading || createOrUpdateLoading}>
        {
          (teacher || !id) && (
            <Form
              form={form}
              initialValues={initValue}
              layout="vertical"
            >
              <Form.Item
                label="头像"
                name="photo"
                rules={[{ required: true }]}
              >
                <OssImgUploader maxCount={1} imgCropAspect={1} />
              </Form.Item>
              <Row className={styles.row} gutter={20}>
                <Col span={16}>
                  <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="教龄"
                    name="teachingAge"
                    rules={[{ required: true }]}
                  >
                    <InputNumber />
                  </Form.Item>
                </Col>
              </Row>
              <Row className={styles.row} gutter={20}>
                <Col span={11}>
                  <Form.Item
                    label="标签"
                    name="tags"
                    rules={[{ required: true }]}
                  >
                    <Select
                      mode="tags"
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item
                    label="资历"
                    name="seniority"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="学历"
                    name="education"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="获奖经历" name="award">
                <TextArea
                  maxLength={200}
                  className={styles.text}
                  allowClear
                  showCount
                />
              </Form.Item>
              <Form.Item label="职业经验" name="experience">
                <TextArea
                  maxLength={200}
                  className={styles.text}
                  allowClear
                  showCount
                />
              </Form.Item>
            </Form>
          )
        }
      </Spin>
    </Drawer>
  );
};
