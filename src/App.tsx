import { useEffect } from "react";
import { Layout } from "antd";
import { registerMicroApps, start } from "qiankun";
import RouterConfig from "./router";
import SiderMenu from "./components/SiderMenu";
import HeaderMenu from "./components/HeaderMenu";
import "./index.less";

const { Content } = Layout;

type MicroApp = {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  props?: unknown;
};

const App = () => {
  useEffect(() => {
    const isProd = import.meta.env.PROD;
    const vueEntry = isProd
      ? "http://pangu-sub.zerocmf.com/vue/"
      : "//localhost:10000";
    const reactEntry = isProd
      ? "http://pangu-sub.zerocmf.com/react/"
      : "//localhost:20000";
    const apps: MicroApp[] = [
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
    registerMicroApps(apps as any);
    /**
     * 【注意】
     * strictStyleIsolation 是 qiankun 的严格样式隔离：
     * 它会用 ShadowDOM 包裹子应用
     * ShadowDOM 会重建一套独立的 DOM 树
     * 会劫持 history 路由
     * 会让子应用的路由跳转被判定为外部跳转
     * 最终结果：浏览器认为页面刷新 → 刷新按钮亮了、甚至整页刷新
     */
    start({
      sandbox: {
        // strictStyleIsolation: true, // ❌ 关闭 开启严格的样式隔离
        experimentalStyleIsolation: true, // ✅ 开启温和隔离
      },
    });
  }, []);

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
