import {
  Drawer, Form, Spin,
} from 'antd';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const ReservationTime = ({ id, onClose }: IProps) => {
  const [form] = Form.useForm();

  console.log(id);

  return (
    <Drawer
      title="编辑课程可约时间"
      open
      width={720}
      onClose={() => onClose()}
    >
      <Spin>
        <Form form={form} />
      </Spin>
    </Drawer>
  );
};
