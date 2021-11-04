import { Button } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import LoginContext from "../../context/loginContext";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function RevievePass() {
  const query = useQuery();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setIsOpenLogin } = useContext(LoginContext);

  const getPassword = async () => {
    const res = await axios.post(
      `/user/changePasswordByEmail?username=${query.get(
        "username"
      )}&encodePass=${query.get("encodePass")}`
    );
    console.log(res);
    if (res.status == 200 && res.statusText == "OK") {
      setPassword(res.data);
    }
  };
  useEffect(() => {
    getPassword();
  }, []);

  return (
    <div className="text-center p-10">
      <p>Mật khẩu của bạn là: {password}</p>
      <Button
        type="primary"
        onClick={() => {
          navigate("/");
          setIsOpenLogin(true);
        }}
      >
        Đăng nhập
      </Button>
    </div>
  );
}
