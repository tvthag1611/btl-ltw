import { Input } from "antd";
import React, { useContext, useState } from "react";
import Logo from "../../../assets/logo/logo.svg";
import Login from "../../../components/login/Login";
import LoginContext from "../../../context/loginContext";
import MyButton from "../../button/MyButton";
import "./Header.css";

export default function Header() {
  const { setIsOpenLogin } = useContext(LoginContext);
  return (
    <div className="header fixed items-center flex flex-row w-full">
      <img src={Logo} alt="" width="50px" height="50px" className="mx-3" />
      <MyButton className="mr-3 bg-black">Trang chủ</MyButton>
      <Input placeholder="Search" className="input-search mr-3" />
      <MyButton
        className="mr-3 bg-red-600"
        onClick={() => setIsOpenLogin(true)}
      >
        Đăng nhập
      </MyButton>
    </div>
  );
}
