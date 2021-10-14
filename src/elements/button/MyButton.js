import { Button } from "antd";
import React from "react";
import "./MyButton.css";

export default function MyButton(props) {
  return <Button {...props}>{props.children}</Button>;
}
