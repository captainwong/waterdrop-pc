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
import { useMutation } from '@apollo/client';
import { UPDATE_USER_BY_TOKEN } from '@/graphql/user';
import { TUserMutation } from '@/types/user';

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

  const [updateUserByToken, { loading }] = useMutation<TUserMutation>(UPDATE_USER_BY_TOKEN);

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
          const res = await updateUserByToken({
            variables: {
              dto: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data?.updateUserByToken?.code === 200) {
            store.refetchHandler?.();
            message.success('更新成功');
          } else {
            message.error(`更新失败！${res.data?.updateUserByToken?.message}`);
          }
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
