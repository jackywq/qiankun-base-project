import { useMemo, useState } from "react";
import logoImage from "../../assets/logo.png";

import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const selectedKey = useMemo(() => {
    const path = location.pathname || "/";
    if (path.startsWith("/vue")) return "vue";
    if (path.startsWith("/react")) return "react";
    return "home";
  }, [location.pathname]);

  const menuItems = [
    { key: "home", icon: <DashboardOutlined />, label: "分析页" },
    { key: "vue", icon: <AppstoreOutlined />, label: "Vue 应用" },
    { key: "react", icon: <ExperimentOutlined />, label: "React 应用" },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    const map: Record<string, string> = {
      home: "/",
      vue: "/vue",
      react: "/react",
    };
    const to = map[key] || "/";
    if (to !== location.pathname) navigate(to);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo">
        <img src={logoImage} alt="" />
        {!collapsed && <span className="logo-text">盘古</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={onMenuClick}
      />
    </Sider>
  );
};
