import React, { useMemo } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function PathHandler() {
  const location = useLocation();
  const selectedKey = useMemo(() => {
    const pathname = location.pathname.replace(/^\/react/, "");
    return pathname.split("/")[1] || "welcome";
  }, [location.pathname]);

  const items = [
    {
      key: "welcome",
      label: <Link to="/">欢迎页</Link>,
    },
    {
      key: "chart",
      label: <Link to="/chart">图表页</Link>,
    },
    {
      key: "list",
      label: <Link to="/list">列表页</Link>,
    },
  ];

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={items}
    />
  );
}
