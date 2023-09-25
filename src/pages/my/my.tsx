import { useEffect, useRef } from 'react';
import OssImgUploader from '@/components/ossImgUploader/OssImgUploader';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import {
  Col, Form, Row, message,
} from 'antd';
import { useUserInfoContext } from '@/hooks/userHooks';
import { useUpdateUserByToken } from '@/services/user';

export const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store } = useUserInfoContext();

  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [{ url: store.avatar }],
    });
  }, [store]);

  const [updateUserByToken, loading] = useUpdateUserByToken();

  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {
            loading,
          },
        }}
        onFinish={async (values) => {
          updateUserByToken(store.id, {
            name: values.name,
            desc: values.desc,
            avatar: values.avatar[0]?.url || '',
          }, () => {
            store.refetchHandler?.();
            message.success('更新成功');
          }, (error) => {
            message.error(`更新失败！${error}`);
          });
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText name="tel" label="手机" disabled />
            <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
            <ProFormTextArea
              name="desc"
              label="简介"
              placeholder="请输入个人简介"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OssImgUploader label="头像" />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};
