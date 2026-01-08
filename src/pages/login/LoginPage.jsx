import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, Typography, Button, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import AOS from 'aos';
import styles from '@/components/login/styles/LoginPage.module.less';
import Captcha from '@/components/login/Captcha.jsx';

function LoginPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [forgetForm] = Form.useForm();
  const [remember, setRemember] = useState(true);
  const [forget, setForget] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);
  useEffect(() => {
    if (!forget) {
      form.setFieldsValue({ username: 'admin', password: '123456' });
    }
  }, [forget]);

  function rememberChange(e) {
    setRemember(e.target.checked);
  }
  function handleSubmit() {
    form.validateFields().then((values) => {
      console.warn('login:', values);
      setLoading(true);
      setTimeout(() => {
        document.cookie = `token=${Math.random().toString(36).substring(2)}; path=/; ${remember ? 'max-age=604800' : ''}`;
        setLoading(false);
        navigate('/');
      }, 1000);
    });
  }
  function handleForget() {
    forgetForm.validateFields().then((values) => {
      console.log('Success:', values);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.left} />
      <div className={styles.right}>
        <div key={forget ? 'forget' : 'login'} data-aos="fade-left" className={styles.content}>
          {!forget ? (
            <>
              <div className={styles.title}>欢迎回来</div>
              <div className={styles.subtitle}>输入您的账号和密码</div>
              <Form className="mt-6" form={form} size="large">
                <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
                  <Input
                    placeholder="请输入账号"
                    prefix={<UserOutlined className="text-blue-primary mr-0.5" />}
                  />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input.Password
                    placeholder="请输入密码"
                    prefix={<LockOutlined className="text-blue-primary mr-0.5" />}
                  />
                </Form.Item>
                <Form.Item
                  name="captcha"
                  rules={[{ type: 'enum', enum: ['success'], message: '验证失败, 请重新验证' }]}
                  initialValue="fail"
                >
                  <Captcha onSuccess={handleSubmit} />
                </Form.Item>
              </Form>
              <div className="my-10 flex justify-between items-center">
                <Checkbox
                  className="text-blue-primary"
                  checked={remember}
                  onChange={rememberChange}
                >
                  记住密码
                </Checkbox>
                <Typography.Link
                  onClick={() => {
                    setForget(true);
                    form.resetFields();
                  }}
                >
                  忘记密码
                </Typography.Link>
              </div>
              <Button type="primary" size="large" block loading={loading} onClick={handleSubmit}>
                登录
              </Button>
              <Space className="mt-5 text-sm" size={2}>
                <span style={{ color: '#323251' }}>还没有账号？</span>
                <Typography.Link>立即注册</Typography.Link>
              </Space>
            </>
          ) : (
            <>
              <div className={styles.title}>忘记密码？</div>
              <div className={styles.subtitle}>输入您的电子邮件来重置您的密码</div>
              <Form className="mt-6" form={forgetForm} size="large">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: '请输入电子邮件' },
                    { type: 'email', message: '请输入有效的电子邮件地址' },
                  ]}
                >
                  <Input
                    placeholder="请输入电子邮件"
                    prefix={<MailOutlined className="text-blue-primary mr-0.5" />}
                  />
                </Form.Item>
                <Button type="primary" block loading={loading} onClick={handleForget}>
                  提交
                </Button>
                <Button
                  className="mt-3"
                  type="default"
                  block
                  onClick={() => {
                    setForget(false);
                    forgetForm.resetFields();
                  }}
                >
                  返回
                </Button>
              </Form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
