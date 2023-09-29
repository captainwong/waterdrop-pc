import { useProductCategoryList } from '@/services/product';
import { Select } from 'antd';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const CategorySelect = ({ value, onChange }: IProps) => {
  const { categoryList, loading } = useProductCategoryList();

  const onChangeHandler = (val: string) => {
    const key = categoryList.find((item) => item.name === val)?.key;
    if (key) onChange?.(key);
  };

  console.log('CategorySelect.value', value);

  return (
    <Select
      loading={loading}
      placeholder="请选择商品分类"
      value={categoryList.find((item) => item.key === value)?.name}
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
