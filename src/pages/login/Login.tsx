/* eslint-disable jsx-a11y/anchor-is-valid */
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, message } from 'antd';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTitle } from '@/hooks';
import { useUserInfoContext } from '@/hooks/userHooks';
import { SEND_VERIFICATION_CODE, LOGIN } from '../../graphql/auth';
import { AUTH_TOKEN } from '../../utils/constants';
import styles from './Login.module.less';
// import logo from '../../assets/henglogo@2x.png'

interface IValue {
  tel: string;
  smsCode: string;
  autoLogin: boolean;
}

const Login: React.FC = () => {
  const [sendVerificationCode] = useMutation(SEND_VERIFICATION_CODE);
  const [loginMutation] = useMutation(LOGIN);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  useTitle('登录');
  const { store } = useUserInfoContext();

  const login = async (values: IValue) => {
    const res = await loginMutation({
      variables: {
        tel: values.tel,
        smsCode: values.smsCode,
      },
    });
    if (res.data?.login?.code === 200) {
      store.refetch?.();
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data?.login?.data || '');
      } else {
        sessionStorage.setItem(AUTH_TOKEN, res.data?.login?.data || '');
        localStorage.setItem(AUTH_TOKEN, '');
      }

      message.success('登录成功！');
      navigate(params.get('redirect') || '/');
    } else {
      message.error(`登录失败！${res.data?.login?.message}`);
    }
  };

  return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <LoginForm
          logo="http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/henglogo.png"
          onFinish={login}
        >
          <Divider />
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder="手机号"
            initialValue="13385401630"
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="请输入验证码"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            phoneName="tel"
            name="smsCode"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (phone: string) => {
              const res = await sendVerificationCode({
                variables: {
                  tel: phone,
                },
              });
              if (
                res.data?.sendVerificationCode?.code === 200 ||
                res.data?.sendVerificationCode?.code === 10001
              ) {
                message.success(res.data?.sendVerificationCode.message || '获取验证码成功！');
              } else {
                message.error(
                  `获取验证码失败！${res.data?.sendVerificationCode?.message}`,
                );
              }
            }}
          />

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};

export default Login;
