import OssImgUploader from '@/components/ossImgUploader/OssImgUploader';
import { TeacherSelect } from '@/components/teacherSelect/TeacherSelect';
import { useLazyCourse, useCreateOrUpdateCourse } from '@/services/course';
import {
  Button, Col, Drawer, Form, Input, InputNumber, Row, Space, Spin, message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LabeledValue } from 'antd/es/select';
import { useEffect } from 'react';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const EditCourse = ({ id, onClose }: IProps) => {
  const [form] = Form.useForm();
  const [commitCourse, commitCourseLoading] = useCreateOrUpdateCourse();
  const { getCourse, loading } = useLazyCourse();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const course = await getCourse(id);
        form.setFieldsValue({
          ...course,
          cover: course?.cover ? [{ url: course?.cover }] : [],
          teachers: course?.teachers?.map((teacher) => ({
            label: teacher.name, value: teacher.id,
          })),
        });
      } else {
        form.resetFields();
      }
    };
    init();
  }, [id]);

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      commitCourse({
        ...values,
        cover: values.cover[0].url,
        teachers: values.teachers?.map((teacher: LabeledValue) => teacher.value),
      }, id, () => {
        message.success(id ? '更新成功' : '创建成功');
        onClose(true);
      }, (error) => {
        message.success(id ? `更新失败！${error}` : `创建失败！${error}`);
      });
    }
  };

  return (
    <Drawer
      title={id ? '编辑课程' : '创建课程'}
      open
      width={720}
      onClose={() => onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button loading={commitCourseLoading} onClick={onSubmit} type="primary">
            提交
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Form.Item
            label="封面图"
            name="cover"
            rules={[{ required: true }]}
          >
            <OssImgUploader imgCropAspect={2 / 1} />
          </Form.Item>
          <Form.Item
            label="课程名称"
            name="name"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="任课老师"
            name="teachers"
            rules={[{
              required: true,
            }]}
          >
            <TeacherSelect />
          </Form.Item>
          <Form.Item
            label="课程描述"
            name="desc"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Row gutter={20}>
            <Col>
              <Form.Item
                label="限制人数"
                name="limit"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter="人" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="持续时长"
                name="duration"
                rules={[{
                  required: true,
                }]}
              >
                <InputNumber min={0} addonAfter="分钟" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="适龄人群"
            name="group"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="基础能力"
            name="baseAbility"
            rules={[{
              required: true,
            }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="预约信息"
            name="reservation"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item
            label="退款信息"
            name="refund"
            rules={[{
              required: true,
            }]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item label="其他信息" name="note">
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};
