/* eslint-disable */
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "antd";
import Routes from "./router";
import "./App.css";
import PathHandler from "./Pathhandler";

const { Header, Content } = Layout;

export default function App() {
  const basename = window.__POWERED_BY_QIANKUN__ ? "/react" : "/";
  return (
    <Router basename={basename}>
      <Layout style={{ background: "transparent" }}>
        <Header style={{ background: "#fff" }}>
          <PathHandler />
        </Header>
        <Content style={{ padding: 24 }}>
          <Routes />
        </Content>
      </Layout>
    </Router>
  );
}
