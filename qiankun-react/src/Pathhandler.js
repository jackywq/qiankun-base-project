import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

export default function PathHandler() {
  //   const path = window.location.pathname.replace(/^\/react/, "") || "/";
  const [selectedKey, setSelectedKey] = useState("welcome");

  return (
    <Menu mode="horizontal" selectedKeys={[selectedKey]}>
      <Menu.Item key="welcome" onClick={() => setSelectedKey("welcome")}>
        <Link to="/">欢迎页</Link>
      </Menu.Item>
      <Menu.Item key="chart" onClick={() => setSelectedKey("chart")}>
        <Link to="/chart">图表页</Link>
      </Menu.Item>
      <Menu.Item key="list" onClick={() => setSelectedKey("list")}>
        <Link to="/list">列表页</Link>
      </Menu.Item>
    </Menu>
  );
}
