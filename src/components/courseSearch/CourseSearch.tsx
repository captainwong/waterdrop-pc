import { useSimpleCourses } from '@/services/course';
import { Select } from 'antd';
import _ from 'lodash';
import styles from './CourseSearch.module.less';

interface IProps {
  onSelected: (val: string) => void;
}

export const CourseSearch = ({ onSelected }: IProps) => {
  const { loading, courses, getCourses } = useSimpleCourses();

  const onSearch = _.debounce((name: string) => {
    getCourses(name);
  }, 500);

  const onChange = (val: string) => {
    onSelected(val);
  };

  return (
    <Select
      className={styles.container}
      showSearch
      placeholder="搜索课程"
      loading={loading}
      onSearch={onSearch}
      onChange={onChange}
      filterOption={false}
    >
      {
        courses.map((course) => (
          <Select.Option key={course.id} value={course.id}>
            {course.name}
          </Select.Option>
        ))
      }
    </Select>
  );
};
