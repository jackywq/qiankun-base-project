/* eslint-disable */
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import Routes from "./router";
import PathHandler from "./Pathhandler";
import "./App.less";

const { Header, Content } = Layout;

export default function App() {
  const basename = window.__POWERED_BY_QIANKUN__ ? "/react" : "/";
  return (
    <Router basename={basename}>
      <Layout className="layout">
        <Header className="layout-header">
          <PathHandler />
        </Header>
        <Content style={{ padding: 24 }}>
          <Routes />
        </Content>
      </Layout>
    </Router>
  );
}
