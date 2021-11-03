import { message } from "antd";
import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Logo from "../../assets/logo/logo.svg";
import LoginContext from "../../context/loginContext";

export default function ForgetPassword({ isOpen, setIsOpen }) {
  const [accForget, setAccForget] = useState({
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const { setIsOpenLogin } = useContext(LoginContext);

  const resetForm = () => {
    setAccForget({
      username: "",
      email: "",
    });
  };

  const forget = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/user/forgetPassword", accForget);

      if (response.statusText == "OK" && response.status == 200) {
        setLoading(false);
        message.success(response.data.mess);
        closeModal();
        setIsOpenLogin(true);
        resetForm();
      } else {
        throw response.data.mess;
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };

  const key_forget = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      forget();
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
                Quên mật khẩu
              </Dialog.Title>
              <form onKeyDown={key_forget}>
                <div className="mb-4">
                  <input
                    className="border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={accForget.username}
                    onChange={(e) => {
                      setAccForget({ ...accForget, username: e.target.value });
                    }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={accForget.email}
                    onChange={(e) => {
                      setAccForget({ ...accForget, email: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <button
                    className="bg-red-500 mt-4 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={forget}
                    disabled={loading}
                  >
                    {loading ? "Đang gửi mail ..." : "Nhận lại"}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
