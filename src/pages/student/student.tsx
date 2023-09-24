/* eslint-disable prettier/prettier */
import { Button, Result } from 'antd';
import styles from './student.module.less';

export const Student = () => (
  <Result
    className={styles.container}
    title="Student"
    subTitle="Student"
    extra={(
      <Button type="primary" href="/">
        返回首页
      </Button>
    )}
  />
);
