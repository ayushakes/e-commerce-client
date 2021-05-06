import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import {Link} from 'react-router-dom'

const { SubMenu,Item } = Menu;

export default function Header() {
  const [current, setCurrent] = React.useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className="flex w-full">
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" className="w-full flex">
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>
       
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="username">
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
        </SubMenu>

        <Item key="login" icon={<UserOutlined />} className="ml-auto">
          <Link to="/login">Login</Link>
        </Item>
        
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      </Menu>
    </div>  
  );
}
