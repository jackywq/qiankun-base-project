/* eslint-disable */
import React from "react";
import { Card, Result, Statistic, Row, Col } from "antd";

export default function Welcome() {
  return (
    <div>
      <Result status="success" title="React 子应用" subTitle="欢迎页" />
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic title="PV" value={23456} suffix="次" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="转化率" value={9.8} suffix="%" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="活跃用户" value={1234} suffix="人" />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
