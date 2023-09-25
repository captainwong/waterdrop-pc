import {
  Button,
  Col, Divider, Drawer, Form, Input, Row, Select, Spin, UploadFile, message,
} from 'antd';
import { useCreateOrganization, useOrganization, useUpdateOrganization } from '@/services/organization';
import { IOrganization } from '@/types/organization';
import { useMemo } from 'react';
import OssImgUploader from '@/components/ossImgUploader/OssImgUploader';
import style from './edit.module.less';

interface IProp {
  id: string;
  onClose: (shouldReload: boolean) => void;
}

const EditOrg = ({
  id,
  onClose,
}: IProp) => {
  const [form] = Form.useForm();

  const { org, loading: queryLoading } = useOrganization(id);
  const [updateOrg, updateLoading] = useUpdateOrganization();
  const [createOrg, createLoading] = useCreateOrganization();

  const onFinishHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const formData = {
        ...values,
        logo: values.logo[0].url,
        tags: values.tags.join(','),
        identityCardBackImg: values.identityCardBackImg[0].url,
        identityCardFrontImg: values.identityCardFrontImg[0].url,
        businessLicense: values.businessLicense[0].url,
        frontImgs: values?.frontImgs?.map((item: UploadFile) => ({ url: item.url })),
        roomImgs: values?.roomImgs?.map((item: UploadFile) => ({ url: item.url })),
        otherImgs: values?.otherImgs?.map((item: UploadFile) => ({ url: item.url })),
      } as IOrganization;

      if (id) {
        updateOrg(
          id,
          formData,
          () => { message.success('更新成功', 1, () => onClose(true)); },
          (error) => { message.error(`更新失败！${error}`); },
        );
      } else {
        createOrg(
          formData,
          () => { message.success('创建成功', 1, () => onClose(true)); },
          (error) => { message.error(`创建失败！${error}`); },
        );
      }
    }
  };

  const initValue = useMemo(() => (org ? {
    ...org,
    tags: org.tags?.split(','),
    logo: [{ url: org.logo }],
    identityCardBackImg: [{ url: org.identityCardBackImg }],
    identityCardFrontImg: [{ url: org.identityCardFrontImg }],
    businessLicense: [{ url: org.businessLicense }],
  } : {}), [org]);

  if (queryLoading) {
    return <Spin />;
  }

  return (
    <Drawer
      title={id ? '编辑门店信息' : '新增门店信息'}
      width="70vw"
      onClose={() => onClose(false)}
      open
      footerStyle={{ textAlign: 'right' }}
      footer={(
        <Button
          loading={updateLoading || createLoading}
          type="primary"
          onClick={onFinishHandler}
        >
          {id ? '保存' : '创建'}
        </Button>
      )}
    >
      <Form form={form} initialValues={initValue} layout="vertical">
        <Row className={style.row} gutter={20}>
          <Col span={10}>
            <Form.Item
              style={{ width: '100%' }}
              label="Logo"
              name="logo"
              rules={[{ required: true }]}
            >
              <OssImgUploader
                maxCount={1}
                label="上传 Logo"
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              style={{ width: '100%' }}
              label="名称"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入门店名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row className={style.row} gutter={20}>
          <Col span={11}>
            <Form.Item
              label="标签"
              name="tags"
              rules={[{ required: true }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="请输入标签"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="手机号"
              name="tel"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="经度"
              name="longitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入经度" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="纬度"
              name="latitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入纬度" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="地址"
          name="address"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入地址" />
        </Form.Item>
        <Form.Item
          label="门店简介"
          name="desc"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            maxLength={500}
            rows={5}
            className={style.textArea}
            allowClear
            showCount
          />
        </Form.Item>
        <Row className={style.row} gutter={20}>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="营业执照"
              name="businessLicense"
              rules={[{ required: true }]}
            >
              <OssImgUploader
                label="上传营业执照"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="身份证正面"
              name="identityCardFrontImg"
              rules={[{ required: true }]}
            >
              <OssImgUploader
                label="上传身份证"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="身份证背面"
              name="identityCardBackImg"
              rules={[{ required: true }]}
            >
              <OssImgUploader
                label="上传身份证"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>门店顶部图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
        <Form.Item name="frontImgs">
          <OssImgUploader maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>门店室内图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
        <Form.Item name="roomImgs">
          <OssImgUploader maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>门店其他图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
        <Form.Item name="otherImgs">
          <OssImgUploader maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditOrg;
