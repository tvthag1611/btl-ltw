import { Input } from "antd";
import React, { useContext, useState } from "react";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import Logo from "../../../assets/logo/logo.svg";
import Notification from "../../../assets/navbar/noti.svg";
import Chat from "../../../assets/navbar/chat.svg";
import LoginContext from "../../../context/loginContext";
import MyButton from "../../button/MyButton";
import { Menu, Dropdown } from "antd";
import "./Header.css";
import { getToken } from "../../../utils/Common";

export default function Header() {
  const { setIsOpenLogin } = useContext(LoginContext);
  const isLogin = getToken();
  let navigate = useNavigate();

  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header fixed items-center flex flex-row w-full">
      <img src={Logo} alt="" width="50px" height="50px" className="mx-3" />
      <MyButton className="mr-3 btn-black" onClick={() => navigate("/")}>
        Trang chủ
      </MyButton>
      <Input
        placeholder="Search"
        className="input-search"
        prefix={<SearchOutlined />}
      />
      {isLogin ? (
        <div className="flex">
          <img
            src={Notification}
            alt=""
            width="40px"
            height="40px"
            className="mx-3"
          />
          <img src={Chat} alt="" width="40px" height="40px" className="mx-3" />
          <Dropdown overlay={menu} trigger={["click"]}>
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
              alt=""
              width="40px"
              height="40px"
              className="mx-3 rounded-full cursor-pointer"
            />
          </Dropdown>
        </div>
      ) : (
        <MyButton className="mx-3 btn-red" onClick={() => setIsOpenLogin(true)}>
          Đăng nhập
        </MyButton>
      )}
    </div>
  );
}
