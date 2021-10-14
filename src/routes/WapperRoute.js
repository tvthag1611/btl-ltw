import React from "react";
import { Route } from "react-router";
import PrivateRoute from "./PrivateRoute";

export default function WapperRoute({ auth, ...props }) {
  const WithRoute = auth ? PrivateRoute : Route;
  return <WithRoute {...props} />;
}
