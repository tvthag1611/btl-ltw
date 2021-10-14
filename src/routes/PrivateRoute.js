import React from "react";
import { Navigate, Route, useLocation } from "react-router";

export default function PrivateRoute(props) {
  const auth = true;

  const location = useLocation();

  return auth ? (
    <Route {...props} />
  ) : (
    <Navigate
      to={`/login${"?from=" + encodeURIComponent(location.pathname)}`}
    />
  );
}
