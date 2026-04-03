import React, { useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Divider,
  Progress,
  List,
  Timeline,
  Descriptions,
  Button,
  Radio,
  DatePicker,
  Typography,
  Space,
} from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
type RankItem = { name: string; count: number };

const Home: React.FC = () => {
  const [dateType, setDateType] = useState("day");
  const navigate = useNavigate();
  const ranking: RankItem[] = [
    { name: "搜索关键词 A", count: 1920 },
    { name: "搜索关键词 B", count: 1560 },
    { name: "搜索关键词 C", count: 1320 },
    { name: "搜索关键词 D", count: 980 },
    { name: "搜索关键词 E", count: 860 },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Breadcrumb items={[{ title: "仪表盘" }, { title: "分析页" }]} />

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          分析页
        </Title>
        <Space>
          <Radio.Group
            size="small"
            value={dateType}
            onChange={(e) => setDateType(e.target.value)}
          >
            <Radio.Button value="day">今日</Radio.Button>
            <Radio.Button value="week">本周</Radio.Button>
            <Radio.Button value="month">本月</Radio.Button>
          </Radio.Group>
          <RangePicker size="small" />
          <Button size="small">刷新</Button>
        </Space>
      </div>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={6}>
          <Card variant="borderless">
            <Text type="secondary">总销售额</Text>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
              ￥ 126,560
            </div>
            <div style={{ color: "rgba(0,0,0,.45)" }}>
              较昨日 <CaretUpOutlined /> 12.3%
            </div>
            <Divider />
            <div style={{ color: "rgba(0,0,0,.45)" }}>日销售额 ￥ 12,423</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Text type="secondary">访问量</Text>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
              8,846
            </div>
            <div style={{ color: "rgba(0,0,0,.45)" }}>
              较昨日 <CaretDownOutlined /> 1.1%
            </div>
            <Divider />
            <div style={{ color: "rgba(0,0,0,.45)" }}>日访问量 1,245</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Text type="secondary">支付笔数</Text>
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>
              6,560
            </div>
            <div style={{ color: "rgba(0,0,0,.45)" }}>转化率 32%</div>
            <Divider />
            <div style={{ color: "rgba(0,0,0,.45)" }}>昨日支付 423</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="borderless">
            <Text type="secondary">运营活动效果</Text>
            <Progress percent={78} status="active" />
            <Divider />
            <div style={{ color: "rgba(0,0,0,.45)" }}>当前活动：开门红</div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="访问量趋势" variant="borderless">
            <div
              style={{
                height: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0,0,0,.35)",
                background:
                  "repeating-linear-gradient(-45deg,#fafafa,#fafafa 10px,#f5f5f5 10px,#f5f5f5 20px)",
              }}
            >
              图表占位
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="热门搜索排行榜" variant="borderless">
            <List<RankItem>
              split={false}
              dataSource={ranking}
              renderItem={(item: RankItem, idx: number) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span style={{ width: 24, color: "rgba(0,0,0,.45)" }}>
                      {idx + 1}
                    </span>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <span style={{ color: "rgba(0,0,0,.65)" }}>
                      {item.count}
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="快速入口" variant="borderless">
            <Space>
              <Button type="primary" onClick={() => navigate("/vue")}>
                进入 Vue 子应用
              </Button>
              <Button type="primary" onClick={() => navigate("/react")}>
                进入 React 子应用
              </Button>
              <Button onClick={() => navigate("/")}>返回首页</Button>
            </Space>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="近期事件" variant="borderless">
            <Timeline
              items={[
                { children: "Vue 子应用部署成功" },
                { children: "React 子应用发布 v0.1.0" },
                { children: "基座切换至 Ant Design Pro 风格" },
              ]}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }} title="环境信息" variant="borderless">
        <Descriptions column={3}>
          <Descriptions.Item label="基座框架">React 18</Descriptions.Item>
          <Descriptions.Item label="样式库">antd 5.x</Descriptions.Item>
          <Descriptions.Item label="微前端">qiankun 2.x</Descriptions.Item>
          <Descriptions.Item label="Vue 子应用">/vue</Descriptions.Item>
          <Descriptions.Item label="React 子应用">/react</Descriptions.Item>
          <Descriptions.Item label="更新时间">
            {new Date().toLocaleString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Home;
