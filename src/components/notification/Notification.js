import { Badge, Dropdown } from "antd";
import React from "react";
import NotificationIcon from "../../assets/navbar/noti.svg";
import "./Notification.css";
import NotificationImage from "./NotificationImage";

const DropdownNotification = () => {
  return (
    <div className="w-72 bg-white shadow-lg rounded-lg p-2 pt-0 notification">
      <h4 className="bg-white h-10 leading-10 text-center font-bold sticky top-0">
        Thông báo
      </h4>
      <NotificationImage
        noti="Thao Phuong Nguyen vừa thêm một design mới: Thiết kế bao bì"
        time="10 phút trước"
        img="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
      />
      <NotificationImage
        noti="Thao Phuong Nguyen vừa bình luận vào bài viết: Thiết kế bao bì"
        time="12 phút trước"
        img="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
      />
      <NotificationImage
        noti="Thao Phuong Nguyen vừa theo dõi bạn"
        time="3 phút trước"
      />
    </div>
  );
};

export default function Notification() {
  return (
    <Dropdown
      overlay={<DropdownNotification />}
      trigger={["click"]}
      getPopupContainer={() => document.getElementById("header")}
      placement="bottomLeft"
    >
      <Badge count={99} overflowCount={10}>
        <img
          src={NotificationIcon}
          alt=""
          width="40px"
          height="40px"
          className="mx-3 cursor-pointer"
        />
      </Badge>
    </Dropdown>
  );
}
