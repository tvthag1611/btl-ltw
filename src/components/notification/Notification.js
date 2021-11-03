import { Badge, Dropdown } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import NotificationIcon from "../../assets/navbar/noti.svg";
import { getToken } from "../../utils/Common";
import "./Notification.css";
import NotificationImage from "./NotificationImage";
import moment from "moment";

const DropdownNotification = ({ notis, setIsShow }) => {
  const navigate = useNavigate();
  const onClickNoti = async (idPost, idNoti) => {
    const formData = new FormData();
    formData.append("notiID", idNoti);
    await axios.post("/noti/viewAction", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    setIsShow(false);
    navigate(`/post/${idPost}`);
  };
  return (
    <div className="w-72 bg-white shadow-lg rounded-lg p-2 pt-0 notification">
      <h4 className="bg-white h-10 leading-10 text-center font-bold sticky top-0">
        Thông báo
      </h4>
      {notis?.map((noti) => (
        <NotificationImage
          isViewed={noti?.isViewed}
          noti={noti?.description}
          time={moment(noti?.timeNoti).fromNow()}
          img={noti?.post.urlPicture}
          onClick={() => onClickNoti(noti?.post.idPost, noti.id)}
        />
      ))}
    </div>
  );
};

export default function Notification() {
  const [notis, setNotis] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const getALlNotis = async () => {
    const res = await axios.get("/post/getAllNoti", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (res.status == 200 && res.statusText == "OK") {
      setNotis(res.data);
    }
  };

  useEffect(() => {
    getALlNotis();
  }, []);
  const onChangeShow = (visible) => {
    setIsShow(visible);
  };
  return (
    <Dropdown
      overlay={<DropdownNotification notis={notis} setIsShow={setIsShow} />}
      trigger={["click"]}
      getPopupContainer={() => document.getElementById("header")}
      placement="bottomLeft"
      visible={isShow}
      onVisibleChange={onChangeShow}
    >
      <Badge
        count={notis.filter((noti) => noti.isViewed !== 1)?.length}
        overflowCount={10}
      >
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
