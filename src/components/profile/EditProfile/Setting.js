import { Button, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getToken } from "../../../utils/Common";

export default function Setting() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [newPassword, setNewPassword] = useState("");

  console.log(userProfile);

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

  const handleChangePassword = async () => {
    const res = await axios.post(
      "/user/changePassword",
      {
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    if (res.status == 200 && res.statusText == "OK") {
      message.success("Password đã được thay đổi!");
    } else {
      message.error("Có lỗi xảy ra!");
    }
  };

  const onChangeProfile = async () => {
    const formData = new FormData();
    formData.append("email", userProfile?.email);
    formData.append("address", userProfile?.address);
    formData.append("phone", userProfile?.phone);
    const res = await axios.post("/user/changeProfile", formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    if (res.status == 200 && res.statusText == "OK") {
      message.success("Cập nhật hồ sơ thành công!");
    } else {
      message.error("Có lỗi xảy ra!");
    }
  };

  return (
    <div className="px-14 py-8 w-1/2">
      <h1 className="font-bold text-2xl">Cài đặt tài khoản</h1>
      <div>
        Đặt tùy chọn tài khoản của bạn, giúp chúng tôi cá nhân hóa trải nghiệm
        của bạn và thực hiện các thay đổi tài khoản lớn tại đây
      </div>
      <div className="mt-6 w-full">
        <div>Email</div>
        <div>
          <Input
            style={{ borderRadius: "50px", height: "41px" }}
            name="email"
            value={userProfile?.email}
            onChange={handleChangeInput}
          />
        </div>
      </div>

      <div className="mt-3 w-full">
        <div>Địa chỉ</div>
        <div>
          <Input
            style={{ borderRadius: "50px", height: "41px" }}
            name="address"
            value={userProfile?.address}
            onChange={handleChangeInput}
          />
        </div>
      </div>

      <div className="mt-3 w-full">
        <div>SĐT</div>
        <div>
          <Input
            style={{ borderRadius: "50px", height: "41px" }}
            name="phone"
            value={userProfile?.phone}
            onChange={handleChangeInput}
          />
        </div>
      </div>

      <form className="mt-12">
        <div>
          <h2>Thông tin thanh toán</h2>
          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Số tài khoản
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>

          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Chủ tài khoản
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>
          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Ngân hàng
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>
          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Chi nhánh
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>
        </div>

        <div className="mt-5">
          <h2 style={{ marginTop: "10px" }}>Đổi mật khẩu</h2>
          <div className="flex">
            <div className="mr-6 flex-1">
              <Input
                style={{ borderRadius: "50px", height: "41px" }}
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ background: "#bfbfbf", color: "black" }}
              onClick={handleChangePassword}
            >
              Thay đổi
            </Button>
          </div>
        </div>
        <div className="flex mt-12">
          <div className="mr-6">
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ background: "#bfbfbf", color: "black" }}
              onClick={() => {
                setNewPassword("");
                setUserProfile({});
                navigate(`/user/${id}`);
              }}
            >
              Hủy
            </Button>
          </div>
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={onChangeProfile}
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}
