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
    <button className="btn-add bg-yellow-500 text-white" onClick={clickAdd}>
      <PlusOutlined style={{ fontSize: 24 }} />
    </button>
  );
}
