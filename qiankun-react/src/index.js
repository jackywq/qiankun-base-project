/* eslint-disable */
import "./public-path";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

function render(props = {}) {
  const { container } = props;
  const root = container
    ? container.querySelector("#root")
    : document.getElementById("root");
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root,
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  // 独立运行微应用, 不使用qiankun
  render();
}

// 微应用协议
export async function bootstrap(props) {}

export async function mount(props) {
  render(props);
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root"),
  );
}
