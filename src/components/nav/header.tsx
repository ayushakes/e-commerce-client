import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import firebase from "firebase";

import { Link } from "react-router-dom";
import { LOGOUT } from "../../store/reducers/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserType } from "../../constants/userTypes";

const { SubMenu, Item } = Menu;

export default function Header() {
  const [current, setCurrent] = React.useState("home");

  const dispatch = useDispatch();

  const history = useHistory();

  const { user } = useSelector((state: { user }) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();

    dispatch({
      type: LOGOUT,
      payload: null, // making it null ie initial state of userReducer
    });

    history.push("/login");
  };

  return (
    <div className="flex w-full">
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="w-full flex"
      >
        <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Item>

        {user && (
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            className="ml-auto"
            title={user.email && user.email.split("@")[0]}
          >
            {/* using the first part of email before @ to give the user name for now */}
            <Item key="setting:1">
              {user && user.role === UserType.SUBSCRIBER && (
                <Link to="/user/history">History</Link>
              )}
              {user && user.role === UserType.ADMIN && (
                <Link to="/admin/dashboard">Dashboard</Link>
              )}
            </Item>
            <Item key="setting:2">
              <Link to="/user/password">Password</Link>
            </Item>
            <Item key="setting:3">
              <Link to="/user/wishlist">Wishlist</Link>
            </Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        )}

        {!user && (
          <Item key="login" icon={<UserOutlined />} className="ml-auto">
            <Link to="/login">Login</Link>
          </Item>
        )}

        {!user && (
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
        )}
      </Menu>
    </div>
  );
}
