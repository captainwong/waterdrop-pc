import { Drawer } from 'antd';

interface IProps {
  id: string;
  onClose: (shouldReload?: boolean) => void;
}

export const CreateTeacher = ({ id, onClose }: IProps) => {
  console.log('CreateTeacher', id);
  return (
    <Drawer
      onClose={() => onClose()}
      open
      title="创建教师"
    />
  );
};
