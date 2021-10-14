import React from "react";
import "./Picture.css";

export default function Picture({ title, thumnail }) {
  return (
    <div className="picture">
      <img src={thumnail} className="w-full rounded-lg" />
      <h4>{title}</h4>
    </div>
  );
}
