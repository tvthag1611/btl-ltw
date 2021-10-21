import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";
import "./AddNewBtn.css";

export default function AddNewBtn() {
  const navigate = useNavigate();

  const clickAdd = () => {
    navigate("/create");
  };

  return (
    <button className="btn-add" onClick={clickAdd}>
      <PlusOutlined style={{ fontSize: 24 }} />
    </button>
  );
}
