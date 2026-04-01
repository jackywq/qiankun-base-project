import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export default function PathHandler() {
  const location = useLocation(); // ✅ 用 React 路由 hook 获取路径（正确写法）
  const [selectedKey, setSelectedKey] = useState("welcome");

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

  useEffect(() => {
    // 👇 加一个清理标记，防止卸载后更新状态
    let isMounted = true;

    const pathname = location.pathname.replace(/^\/react/, "");
    const key = pathname.split("/")[1] || "welcome";

    if (isMounted) {
      setSelectedKey(key);
    }

    // 👇 组件卸载时标记为未挂载，彻底解决警告
    return () => {
      isMounted = false;
    };
  }, [location.pathname]); // ✅ 用稳定的依赖项

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={items}
      onClick={({ key }) => setSelectedKey(key)}
    />
  );
}
