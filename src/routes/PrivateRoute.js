import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import LoginContext from "../context/loginContext";
import { getToken } from "../utils/Common";

export default function PrivateRoute() {
  const auth = getToken();

  const { setIsOpenLogin } = useContext(LoginContext);

  if (!auth) {
    setIsOpenLogin(true);
  }

  return auth ? <Outlet /> : <Navigate to="/" />;
}
