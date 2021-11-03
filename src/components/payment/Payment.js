import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserID } from "../../utils/Common";
import Logo from "../../assets/logo/logo.svg";

export default function Payment({ isOpen, setIsOpen }) {
  const [design, setDesign] = useState(null);
  const [recieved, setRecieved] = useState(false);
  const { id } = useParams();
  const idCurrent = Number(getUserID());
  const navigate = useNavigate();

  const getDetailDesign = async () => {
    const res = await axios.get(`/post/${id}`);
    setDesign(res.data);
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    getDetailDesign();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setRecieved(true);
      }, 5000);
    } else {
      setRecieved(false);
      clearTimeout(() => {
        setRecieved(true);
      }, 5000);
    }
  });

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
                Checkout
              </Dialog.Title>
              <div>
                <div>
                  <div className="mb-3">
                    <img src={design?.urlPicture} alt="" className="w-full" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{design?.titlePost}</h4>
                    <p>{design?.descriptionPost}</p>
                    <p className="text-red-500">
                      <strong>Price: </strong>
                      {` ${design?.price}`}đ
                    </p>
                  </div>
                </div>
                <div>
                  <hr />
                  <p className="mt-5 uppercase text-gray-500">
                    Vui lòng chuyển tiền vô một trong các hình thức dưới đây
                  </p>
                  <p className="bg-red-200 p-3 mb-2">MOMO: 0387955109</p>
                  <p className="bg-blue-200 p-3 mb-2">MB Bank: 16118386888</p>
                  <p className="bg-yellow-200 p-3 mb-2">TRAN VAN THANG</p>
                  <p>
                    {!recieved
                      ? "Chúng tôi chưa nhận được của bạn"
                      : "Chúng tôi đã nhận được của bạn, hãy tải về nào !"}
                  </p>
                  <div className="flex items-center justify-center my-2">
                    {recieved && (
                      <a
                        href={design?.urlDesign}
                        className={`block w-28 h-10 flex items-center justify-center rounded-full text-white hover:text-white bg-green-500 hover:bg-green-600`}
                        download
                      >
                        Tải về
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
