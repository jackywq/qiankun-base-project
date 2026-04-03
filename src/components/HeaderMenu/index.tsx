import { BellOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input, Badge, Dropdown, Space, Avatar, Layout } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const PROFILE_UPDATED_EVENT = "qiankun-base-profile-updated";
const PROFILE_STORAGE_KEY = "qiankun-base-profile";

const avatarOptions = ["A", "😀", "😎", "🚀", "🧠", "🌟"];

const getStoredProfile = () => {
  const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as {
      username?: string;
      avatar?: string;
    };
  } catch {
    return null;
  }
};

export default () => {
  const navigate = useNavigate();
  const storedProfile = getStoredProfile();
  const [username, setUsername] = useState(
    storedProfile?.username ||
      window.localStorage.getItem("qiankun-base-user") ||
      "Admin",
  );
  const [avatarValue, setAvatarValue] = useState(
    storedProfile?.avatar || avatarOptions[0],
  );

  useEffect(() => {
    const syncUsername = () => {
      const latestProfile = getStoredProfile();

      setUsername(
        latestProfile?.username ||
          window.localStorage.getItem("qiankun-base-user") ||
          "Admin",
      );
      setAvatarValue(latestProfile?.avatar || avatarOptions[0]);
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, syncUsername);

    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, syncUsername);
    };
  }, []);

  const userMenu: MenuProps = {
    items: [
      { key: "profile", label: "个人中心" },
      { key: "logout", label: "退出登录" },
    ],
    onClick: ({ key }) => {
      if (key === "profile") {
        navigate("/profile");
      }

      if (key === "logout") {
        window.localStorage.removeItem("qiankun-base-token");
        window.localStorage.removeItem("qiankun-base-user");
        window.localStorage.removeItem("qiankun-base-profile");
        navigate("/login", { replace: true });
      }
    },
  };

  return (
    <Header className="app-header">
      <div className="header-left">
        <Input.Search className="search-input" placeholder="搜索" />
      </div>
      <div className="header-right">
        <QuestionCircleOutlined className="header-icon" />
        <Dropdown menu={userMenu}>
          <Space className="user">
            <Avatar size="small" style={{ background: "#87d068" }}>
              {avatarValue || username.charAt(0).toUpperCase()}
            </Avatar>
            <span className="username">{username}</span>
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};
