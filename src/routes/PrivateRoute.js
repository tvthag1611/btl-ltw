import React from "react";
import { Navigate, Route, useLocation } from "react-router";
import { getToken } from "../utils/Common";

export default function PrivateRoute(props) {
  const auth = getToken();

  const location = useLocation();

  return auth ? (
    <Route {...props} />
  ) : (
    <Navigate
      to={`/login${"?from=" + encodeURIComponent(location.pathname)}`}
    />
  );
}
