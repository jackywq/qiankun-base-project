import { useMemo } from "react";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  List,
  Row,
  Radio,
  Select,
  Space,
  Switch,
  Tag,
  Typography,
  message,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const PROFILE_STORAGE_KEY = "qiankun-base-profile";
const USER_STORAGE_KEY = "qiankun-base-user";
const PROFILE_UPDATED_EVENT = "qiankun-base-profile-updated";

type ProfileFormValues = {
  avatar: string;
  username: string;
  phone: string;
  email: string;
  department: string;
  notifyByEmail: boolean;
};

const avatarOptions = ["A", "😀", "😎", "🚀", "🧠", "🌟"];

const defaultProfile: ProfileFormValues = {
  avatar: avatarOptions[0],
  username: window.localStorage.getItem(USER_STORAGE_KEY) || "Admin",
  phone: "13800000000",
  email: "admin@qiankun.com",
  department: "平台研发部",
  notifyByEmail: true,
};

const quickActions = [
  "查看登录记录",
  "更新安全策略",
  "同步子应用权限",
  "管理通知订阅",
];

const recentActivities = [
  "更新了个人资料",
  "最近一次登录来自基座应用",
  "开通了邮件通知",
  "访问了 React 子应用",
];

export default function Profile() {
  const [form] = Form.useForm<ProfileFormValues>();
  const [messageApi, contextHolder] = message.useMessage();

  const initialValues = useMemo(() => {
    const savedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!savedProfile) {
      return defaultProfile;
    }

    try {
      return {
        ...defaultProfile,
        ...JSON.parse(savedProfile),
      } as ProfileFormValues;
    } catch {
      return defaultProfile;
    }
  }, []);

  const username = Form.useWatch("username", form) ?? initialValues.username;
  const avatar = Form.useWatch("avatar", form) ?? initialValues.avatar;
  const department =
    Form.useWatch("department", form) ?? initialValues.department;
  const email = Form.useWatch("email", form) ?? initialValues.email;
  const phone = Form.useWatch("phone", form) ?? initialValues.phone;

  const onFinish = (values: ProfileFormValues) => {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(values));
    window.localStorage.setItem(USER_STORAGE_KEY, values.username);
    window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
    messageApi.success("个人中心信息已更新");
  };

  return (
    <div style={{ padding: 16 }}>
      {contextHolder}
      <Breadcrumb items={[{ title: "账户中心" }, { title: "个人中心" }]} />

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card variant="borderless">
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <Space size={16} align="start">
                <Avatar size={72} style={{ backgroundColor: "#1677ff" }}>
                  {avatar || username.charAt(0).toUpperCase()}
                </Avatar>
                <div>
                  <Typography.Title level={4} style={{ marginBottom: 4 }}>
                    {username}
                  </Typography.Title>
                  <Typography.Text type="secondary">平台管理员</Typography.Text>
                  <div style={{ marginTop: 12 }}>
                    <Tag color="blue">已实名认证</Tag>
                    <Tag color="green">已启用 MFA</Tag>
                  </div>
                </div>
              </Space>

              <Descriptions column={1} size="small">
                <Descriptions.Item
                  label={
                    <Space size={6}>
                      <TeamOutlined />
                      所属部门
                    </Space>
                  }
                >
                  {department}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space size={6}>
                      <MailOutlined />
                      邮箱
                    </Space>
                  }
                >
                  {email}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space size={6}>
                      <PhoneOutlined />
                      联系电话
                    </Space>
                  }
                >
                  {phone}
                </Descriptions.Item>
              </Descriptions>
            </Space>
          </Card>

          <Card title="快捷操作" variant="borderless" style={{ marginTop: 16 }}>
            <List
              dataSource={quickActions}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text>{item}</Typography.Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={16}>
          <Card title="资料设置" variant="borderless">
            <Form<ProfileFormValues>
              form={form}
              layout="vertical"
              initialValues={initialValues}
              onFinish={onFinish}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="头像选择"
                    name="avatar"
                    rules={[{ required: true, message: "请选择头像" }]}
                  >
                    <Radio.Group optionType="button" buttonStyle="solid">
                      <Space wrap size={12}>
                        {avatarOptions.map((item) => (
                          <Radio.Button key={item} value={item}>
                            <Space>
                              <Avatar
                                size="small"
                                style={{ backgroundColor: "#1677ff" }}
                              >
                                {item}
                              </Avatar>
                              <span>{item}</span>
                            </Space>
                          </Radio.Button>
                        ))}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: "请输入用户名" }]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="请输入用户名"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="所属部门"
                    name="department"
                    rules={[{ required: true, message: "请选择所属部门" }]}
                  >
                    <Select
                      options={[
                        { label: "平台研发部", value: "平台研发部" },
                        { label: "产品运营部", value: "产品运营部" },
                        { label: "数据分析部", value: "数据分析部" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                      { required: true, message: "请输入邮箱地址" },
                      { type: "email", message: "请输入正确的邮箱地址" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="请输入邮箱地址"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="联系电话"
                    name="phone"
                    rules={[{ required: true, message: "请输入联系电话" }]}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="请输入联系电话"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="邮箱通知"
                name="notifyByEmail"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Space>
                <Button type="primary" htmlType="submit">
                  保存资料
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  重置
                </Button>
              </Space>
            </Form>
          </Card>

          <Card
            title="安全与动态"
            variant="borderless"
            style={{ marginTop: 16 }}
          >
            <List
              split={false}
              dataSource={recentActivities}
              renderItem={(item, index) => (
                <List.Item
                  actions={[
                    index === 0 ? (
                      <Tag color="processing" key={item}>
                        最新
                      </Tag>
                    ) : (
                      <Tag color="default" key={item}>
                        记录
                      </Tag>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    avatar={<LockOutlined style={{ color: "#1677ff" }} />}
                    title={item}
                    description={`处理时间：${new Date().toLocaleString()}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
