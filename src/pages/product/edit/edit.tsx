import { CategorySelect } from '@/components/categorySelect/CategorySelect';
import OssImgUploader from '@/components/ossImgUploader/OssImgUploader';
import { useCreateOrUpdateProduct, useProduct } from '@/services/product';
import {
  Button, Col, Divider, Drawer, Form, Input, InputNumber, Row, Space, Spin, message,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import Decimal from 'decimal.js';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const EditProduct = ({ id, onClose }: IProps) => {
  const [form] = Form.useForm();
  const [createOrUpdateProduct, createOrUpdateLoading] = useCreateOrUpdateProduct();
  const { product, loading } = useProduct(id);
  const [open, setOpen] = useState(true);

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      createOrUpdateProduct({
        ...values,
        price: new Decimal(values.price).toFixed(2),
        originalPrice: new Decimal(values.originalPrice).toFixed(2),
        cover: values.cover[0].url,
        banner: values.banner[0].url,
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
      title={id ? '编辑商品' : '创建商品'}
      open={open}
      width={720}
      onClose={() => setOpen(false)}
      afterOpenChange={(open_) => { if (!open_) { onClose(); } }}
      extra={(
        <Space>
          <Button onClick={() => setOpen(false)}>取消</Button>
          <Button loading={createOrUpdateLoading} onClick={onSubmit} type="primary">
            提交
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        { (product || !id) && (
        <Form form={form} initialValues={product}>
          <Row gutter={20}>
            <Col span={16}>
              <Form.Item
                style={{ width: '100%' }}
                label="名称"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="商品分类"
                name="category"
                rules={[{ required: true }]}
              >
                <CategorySelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={6}>
              <Form.Item
                label="库存"
                name="stock"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="原价"
                name="originalPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="现价"
                name="price"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="限购"
                name="limit"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="商品简介"
            name="desc"
            rules={[{ required: true }]}
          >
            <TextArea
              maxLength={200}
              rows={5}
              allowClear
              showCount
            />
          </Form.Item>
          <Divider>图片设置</Divider>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name="cover"
                label="商品封面图：图片长宽要求比例为 16:9 "
                rules={[{ required: true }]}
                labelCol={{
                  span: 24,
                }}
              >
                <OssImgUploader
                  maxCount={1}
                  imgCropAspect={16 / 9}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="banner"
                label="商品 Banner 横图：图片长宽要求比例为 16:9 "
                rules={[{ required: true }]}
                labelCol={{
                  span: 24,
                }}
              >
                <OssImgUploader
                  maxCount={1}
                  imgCropAspect={16 / 9}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};
