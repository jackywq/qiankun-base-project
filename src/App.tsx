import { useEffect } from "react";
import { Layout } from "antd";
import { registerMicroApps, start } from "qiankun";
import { useLocation } from "react-router-dom";
import RouterConfig from "./router";
import SiderMenu from "./components/SiderMenu";
import HeaderMenu from "./components/HeaderMenu";
import "./index.less";

const { Content } = Layout;

const AUTH_STORAGE_KEY = "qiankun-base-token";
let microAppsRegistered = false;
let qiankunStarted = false;
type RegisterMicroAppsParams = Parameters<typeof registerMicroApps>[0];

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      !window.localStorage.getItem(AUTH_STORAGE_KEY)
    ) {
      return;
    }

    const isProd = import.meta.env.PROD;
    const vueEntry = isProd
      ? "https://qiankun-micro-vue.vercel.app/"
      : "//localhost:10000";
    const reactEntry = isProd
      ? "https://qiankun-micro-react.vercel.app/"
      : "//localhost:20000";
    const apps: RegisterMicroAppsParams = [
      {
        name: "vueApp",
        entry: vueEntry,
        container: "#vue",
        activeRule: "/vue",
        props: { a: 1 },
      },
      {
        name: "reactApp",
        entry: reactEntry,
        container: "#react",
        activeRule: "/react",
      },
    ];

    if (!microAppsRegistered) {
      registerMicroApps(apps);
      microAppsRegistered = true;
    }

    /**
     * 【注意】
     * strictStyleIsolation 是 qiankun 的严格样式隔离：
     * 它会用 ShadowDOM 包裹子应用
     * ShadowDOM 会重建一套独立的 DOM 树
     * 会劫持 history 路由
     * 会让子应用的路由跳转被判定为外部跳转
     * 最终结果：浏览器认为页面刷新 → 刷新按钮亮了、甚至整页刷新
     */
    if (!qiankunStarted) {
      start({
        prefetch: true,
        sandbox: {
          experimentalStyleIsolation: true,
        },
      });
      qiankunStarted = true;
    }
  }, [location.pathname]);

  if (location.pathname === "/login") {
    return <RouterConfig />;
  }

  return (
    <Layout id="app-layout">
      <SiderMenu />

      <Layout>
        <HeaderMenu />

        <Content className="content">
          <RouterConfig />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
