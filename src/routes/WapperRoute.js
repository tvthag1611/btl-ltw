import React from "react";
import { Route } from "react-router";
import PrivateRoute from "./PrivateRoute";

export default function WapperRoute({ auth, ...props }) {
  console.log(auth);
  const WithRoute = auth ? PrivateRoute : Route;
  return <WithRoute {...props} />;
}
