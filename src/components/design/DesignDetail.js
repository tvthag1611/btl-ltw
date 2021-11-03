import {
  ArrowLeftOutlined,
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
  NotificationOutlined,
  SendOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MyButton from "../../elements/button/MyButton";
import { message, Tag } from "antd";
import "../create/CreatePicture.css";
import "./DesignDetail.css";
import { getToken, getUserID } from "../../utils/Common";
import moment from "moment";

export default function DesignDetail() {
  const [design, setDesign] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const idCurrent = Number(getUserID());
  const [isLike, setIsLike] = useState(
    design?.notiFromUsers?.indexOf(idCurrent) !== -1
  );
  const navigate = useNavigate();

  const getDetailDesign = async () => {
    const res = await axios.get(`/post/${id}`);
    setDesign(res.data);
  };

  const getCommentDesign = async () => {
    const res = await axios.get(`/post/getAllCommentByPost?postID=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    setComments(res.data);
  };

  useEffect(() => {
    const like = design?.notiFromUsers?.indexOf(idCurrent) !== -1;
    console.log(like);
    setIsLike(like);
  }, [design, idCurrent]);

  useEffect(() => {
    getDetailDesign();
    getCommentDesign();
  }, []);

  const handelLove = async () => {
    if (!isLike) {
      const formData = new FormData();
      formData.append("postID", id);
      formData.append("actionType", "like");
      const res = await axios.post("/post/likeaction", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.status == 200 && res.statusText == "OK") {
        setIsLike(true);
        setDesign({
          ...design,
          loveCount: design.loveCount + 1,
          notiFromUsers: [...design.notiFromUsers, idCurrent],
        });
      }
    } else {
      const formData = new FormData();
      formData.append("postID", id);
      formData.append("actionType", "dislike");
      const res = await axios.post("/post/likeaction", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.status == 200 && res.statusText == "OK") {
        setIsLike(false);
        setDesign({
          ...design,
          loveCount: design.loveCount - 1,
          notiFromUsers: design.notiFromUsers.filter(
            (noti) => noti !== idCurrent
          ),
        });
      }
    }
  };

  return (
    <div className="py-5">
      <div className="create-picture design-detail mx-auto relative">
        <ArrowLeftOutlined
          className="text-xl cursor-pointer absolute -left-10 top-3"
          onClick={() => navigate(-1)}
        />
        <form className="flex flex-row">
          <div className="upload-create flex-1 flex items-center justify-center">
            <img
              src={design?.urlPicture}
              alt=""
              className="w-full h-full object-cover design-detail__image"
            />
          </div>
          <div className="flex-1 p-5">
            <div className="flex flex-row items-center justify-between mb-3">
              <div className="flex flex-row items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
                  alt=""
                  width="40px"
                  height="40px"
                  className="mr-3 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <h3 className="m-0 font-bold">Thao Phuong Nguyen</h3>
                  <p className="m-0">1k người theo dõi</p>
                </div>
              </div>
              <MyButton className="btn-red">Theo dõi</MyButton>
            </div>
            <h2 className="text-xl font-bold">{design?.titlePost}</h2>
            <p>{design?.descriptionPost}</p>
            {design?.tags.map((tag) => (
              <Tag color="blue">{tag}</Tag>
            ))}
            <div className="text-3xl">
              {!isLike ? (
                <HeartOutlined
                  className="mr-5 cursor-pointer"
                  onClick={handelLove}
                />
              ) : (
                <HeartFilled
                  className="mr-5 cursor-pointer"
                  style={{ color: "red" }}
                  onClick={handelLove}
                />
              )}
              <NotificationOutlined className="mr-5 cursor-pointer" />
              <SendOutlined className="cursor-pointer" />
            </div>
            <p>{design?.loveCount} lượt thích</p>
            <a
              href={design?.price === 0 ? design?.urlDesign : "#"}
              className={`block w-28 h-10 flex items-center justify-center rounded-full text-white hover:text-white ${
                design?.price === 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              }`}
              download={design?.price === 0}
              onClick={() => {
                if (design.price > 0) {
                  navigate(`/checkout/${id}`);
                }
              }}
            >
              <DownloadOutlined className="mr-2" />{" "}
              {design?.price === 0 ? "Free" : `${design?.price}đ`}
            </a>
            <h3 className="text-lg font-bold my-4">Nhận xét</h3>
            {comments.map((cmt) => (
              <div>
                <p className="mb-0">
                  <strong className="mr-3">{cmt.userComment.fullname}</strong>
                  {moment(cmt.timeCreated).fromNow()}
                </p>
                <p>{cmt.comment}</p>
              </div>
            ))}
            <div className="flex flex-row items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
                alt=""
                width="40px"
                height="40px"
                className="mr-3 rounded-full cursor-pointer"
              />
              <div className="flex flex-col flex-1">
                <input
                  className="border rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="comment"
                  type="text"
                  placeholder="Thêm nhận xét"
                  name="comment"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
