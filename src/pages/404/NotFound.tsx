/* eslint-disable prettier/prettier */
import { Button, Result } from 'antd';

export const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您访问的页面不存在。"
    extra={(
      <Button type="primary" href="/">
        返回首页
      </Button>
    )}
  />
);
