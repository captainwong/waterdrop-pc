import { useProductCategoryList } from '@/services/product';
import { Select } from 'antd';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const CategorySelect = ({ value, onChange }: IProps) => {
  const { categoryList } = useProductCategoryList();

  const onChangeHandler = (val: string) => {
    onChange?.(val);
  };

  return (
    <Select
      placeholder="请选择商品分类"
      value={value}
      onChange={onChangeHandler}
    >
      {categoryList.map((category) => (
        <Select.Option key={category.key} value={category.name}>
          {category.name}
        </Select.Option>
      ))}
    </Select>
  );
};

CategorySelect.defaultProps = {
  value: undefined,
  onChange: () => {},
};
