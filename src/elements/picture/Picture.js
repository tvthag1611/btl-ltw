import React from "react";
import { useNavigate } from "react-router";
import "./Picture.css";

export default function Picture({ title, thumnail, id }) {
  const navigate = useNavigate();
  return (
    <div className="picture" onClick={() => navigate(`/post/${id}`)}>
      <img src={thumnail} className="w-full rounded-lg" />
      <h4>{title}</h4>
    </div>
  );
}
