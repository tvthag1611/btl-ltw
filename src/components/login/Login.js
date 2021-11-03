import { Dialog, Transition } from "@headlessui/react";
import { message } from "antd";
import axios from "axios";
import { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router";
import Logo from "../../assets/logo/logo.svg";
import LoginContext from "../../context/loginContext";
import { setUserLocal } from "../../utils/Common";

export default function Login({ isOpen, setIsOpen }) {
  const [accLogin, setAccLogin] = useState({
    username: "",
    password: "",
  });
  function closeModal() {
    setIsOpen(false);
  }

  let navigate = useNavigate();

  const { setIsOpenSignup, setIsForgetPass } = useContext(LoginContext);

  const resetForm = () => {
    setAccLogin({
      username: "",
      password: "",
    });
  };

  const login = async () => {
    try {
      const response = await axios.post(`/user/login`, accLogin);

      console.log(response);

      if (response.status == 200 && response.statusText === "OK") {
        message.success("Login success");
        setUserLocal(response.data);
        closeModal();
        navigate("/");
        resetForm();
      } else {
        message.error("Username hoặc password chưa đúng !");
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const key_login = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      login();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="border-t-4 border-red-600 inline-block w-full max-w-md px-16 py-5 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-xl text-center font-medium leading-6 text-gray-900 mb-4"
              >
                <img src={Logo} alt="" className="h-7 w-7 mx-auto mb-4" />
                Đăng nhập
              </Dialog.Title>
              <form onKeyDown={key_login}>
                <div className="mb-4">
                  <input
                    className="border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={accLogin.username}
                    onChange={(e) => {
                      setAccLogin({ ...accLogin, username: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Mật khẩu"
                    value={accLogin.password}
                    onChange={(e) => {
                      setAccLogin({ ...accLogin, password: e.target.value });
                    }}
                  />
                  <a
                    href="#"
                    className="font-bold hover:text-indigo-600"
                    onClick={() => {
                      closeModal();
                      setIsForgetPass(true);
                    }}
                  >
                    Quên mật khẩu?
                  </a>
                </div>
                <div>
                  <button
                    className="bg-red-500 mt-4 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={login}
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
              <div className="text-center font-bold my-6">
                Chưa tham gia Hahahihi?{" "}
                <a
                  className="hover:text-indigo-600 cursor-pointer"
                  onClick={() => {
                    closeModal();
                    setIsOpenSignup(true);
                  }}
                >
                  Đăng ký
                </a>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
