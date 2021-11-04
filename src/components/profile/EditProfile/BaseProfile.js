import { Button, message, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getToken, resetUserLocal } from "../../../utils/Common";

export default function BaseProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);

  const getInfoUser = async () => {
    const res = await axios.get(`/user/detail/${id}`);
    if (res.status == 200 && res.statusText == "OK") {
      setUserProfile(res.data);
    }
  };

  useEffect(() => {
    getInfoUser();
  }, [id]);

  const handleChangeInput = (e) => {
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAvatar = ({ file }) => {
    setAvatar(file.originFileObj);
  };

  const handleChangeCover = ({ file }) => {
    setCover(file.originFileObj);
  };

  const onChangeProfile = async () => {
    const formData = new FormData();
    if (avatar) formData.append("urlProfile", avatar);
    if (cover) formData.append("urlBackground", cover);
    formData.append("fullname", userProfile?.fullname);
    const res = await axios.post("/user/changeProfile", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (res.status == 200 && res.statusText == "OK") {
      message.success("Cập nhật hồ sơ thành công!");
      resetUserLocal(res.data);
    } else {
      message.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="px-14 py-8 w-1/2">
      <h1 className="font-bold text-2xl">Hồ sơ công khai</h1>
      <div>Người truy cập hồ sơ của bạn sẽ thấy thông tin sau</div>
      <div className="mt-3">Ảnh</div>
      <div className="flex items-center">
        <img
          src={
            avatar
              ? URL.createObjectURL(avatar)
              : userProfile?.urlProfilePicture
          }
          alt=""
          style={{ width: 145, height: 145 }}
          className="mx-3 rounded-full item object-cover"
        />
        <Upload showUploadList={false} onChange={handleChangeAvatar}>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ background: "#bfbfbf", color: "black" }}
          >
            Thay đổi
          </Button>
        </Upload>
      </div>
      <div className="mt-3">Ảnh bìa</div>
      <div className="flex items-center">
        <img
          src={
            cover
              ? URL.createObjectURL(cover)
              : userProfile?.urlBackgroundPicture
          }
          alt=""
          style={{ width: 145 }}
          className="mx-3 item object-cover"
        />
        <Upload showUploadList={false} onChange={handleChangeCover}>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ background: "#bfbfbf", color: "black" }}
          >
            Thay đổi
          </Button>
        </Upload>
      </div>
      <div className="mt-3">
        <label htmlFor="fullname">Họ và tên</label>
        <input
          className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="fullname"
          type="text"
          placeholder="Nhập họ và tên"
          name="fullname"
          value={userProfile?.fullname}
          onChange={handleChangeInput}
        />
      </div>
      <div>
        <Button
          type="secondary"
          shape="round"
          size="large"
          style={{ background: "#bfbfbf", color: "black" }}
          className="mr-5"
          onClick={() => {
            setAvatar(null);
            setCover(null);
            setUserProfile({});
            navigate(`/user/${id}`);
          }}
        >
          Huỷ
        </Button>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={onChangeProfile}
        >
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
