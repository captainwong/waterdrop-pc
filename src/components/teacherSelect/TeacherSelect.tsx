import { useTeachers } from '@/services/teacher';
import { Select } from 'antd';
import { LabeledValue } from 'antd/es/select';
import _ from 'lodash';

interface IProps {
  value?: LabeledValue[];
  onChange?: (val: LabeledValue[]) => void;
}

export const TeacherSelect = ({ value, onChange }: IProps) => {
  const { loading, getTeachers, teachers } = useTeachers();
  const onSearch = _.debounce((name: string) => {
    console.log('onSearch', name);
    getTeachers({ name });
  }, 500);

  const onSelectChange = (name: LabeledValue []) => {
    onChange?.(name);
  };

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="请选择教师"
      showSearch
      onSearch={onSearch}
      filterOption={false}
      mode="multiple"
      loading={loading}
      labelInValue
      value={value}
      onChange={onSelectChange}
    >
      {teachers?.map((teacher) => (
        <Select.Option key={teacher.id} value={teacher.id}>
          {teacher.name}
        </Select.Option>
      ))}
    </Select>
  );
};

TeacherSelect.defaultProps = {
  value: null,
  onChange: () => {},
};
