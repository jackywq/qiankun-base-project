import type { FC } from "react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const AUTH_STORAGE_KEY = "qiankun-base-token";
const USER_STORAGE_KEY = "qiankun-base-user";

type LoginFormValues = {
  username: string;
  password: string;
};

type LoginLocationState = {
  from?: string;
};

const Login: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = useMemo(() => {
    const state = location.state as LoginLocationState | null;
    return state?.from || "/";
  }, [location.state]);

  const onFinish = ({ username }: LoginFormValues) => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, `token-${Date.now()}`);
    window.localStorage.setItem(USER_STORAGE_KEY, username);
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <Card className="login-card" bordered={false}>
        <Typography.Title level={3} style={{ marginBottom: 8 }}>
          基座应用登录
        </Typography.Title>
        <Typography.Paragraph type="secondary">
          登录后可访问分析页与微前端子应用。
        </Typography.Paragraph>

        <Form<LoginFormValues>
          layout="vertical"
          initialValues={{ username: "admin", password: "123456" }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
