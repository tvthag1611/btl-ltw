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

export default function DesignDetail() {
  const [design, setDesign] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getDetailDesign = async () => {
    const res = await axios.get(`/post/${id}`);
    setDesign(res.data);
  };

  useEffect(() => {
    getDetailDesign();
  }, []);

  return (
    <div className="py-5">
      <div className="create-picture design-detail mx-auto">
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
              <Tag>{tag}</Tag>
            ))}
            <div className="text-3xl">
              {design?.loveCount === 0 ? (
                <HeartOutlined className="mr-5 cursor-pointer" />
              ) : (
                <HeartFilled
                  className="mr-5 cursor-pointer"
                  style={{ color: "red" }}
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
                  message.warning("Thanh toán chưa mà đòi tải !");
                }
              }}
            >
              <DownloadOutlined className="mr-2" />{" "}
              {design?.price === 0 ? "Free" : `${design?.price}đ`}
            </a>
            <h3 className="text-lg font-bold my-4">Nhận xét</h3>
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
