import React, { useContext } from "react";
import { Outlet } from "react-router";
import ForgetPassword from "../../components/login/ForgetPassword";
import Login from "../../components/login/Login";
import Signup from "../../components/signup/SignUp";
import LoginContext from "../../context/loginContext";
import AddNewBtn from "../button/AddNewBtn";
import Header from "./header/Header";
import "./Layout.css";

export default function Layout() {
  const {
    isOpenLogin,
    setIsOpenLogin,
    isOpenSignup,
    setIsOpenSignup,
    isForgetPass,
    setIsForgetPass,
  } = useContext(LoginContext);

  return (
    <div>
      <Header />
      <div className="layout-app">
        <div id="page-mask"></div>
        <Outlet />
        <Login isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
        <Signup isOpen={isOpenSignup} setIsOpen={setIsOpenSignup} />
        <ForgetPassword isOpen={isForgetPass} setIsOpen={setIsForgetPass} />
        <AddNewBtn />
      </div>
    </div>
  );
}
