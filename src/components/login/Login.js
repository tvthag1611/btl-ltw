import { Dialog, Transition } from "@headlessui/react";
import { PhotographIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Fragment, useState } from "react";

export default function Login() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-red-500 hover:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Login
        </button>
      </div>

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
                  <PhotographIcon className="h-7 w-7 mx-auto mb-4 text-red-400" />
                  Đăng nhập
                </Dialog.Title>
                <form>
                  <div className="mb-4">
                    <input
                      className="border rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Mật khẩu"
                    />
                    <a href="#" className="font-bold hover:text-indigo-600">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div>
                    <button
                      className="bg-red-500 mt-4 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Đăng nhập
                    </button>
                  </div>
                </form>

                <div className="text-center mt-3 mb-3 font-bold">Hoặc</div>

                <div>
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Sign in with Facebook
                  </button>
                </div>

                <div>
                  <button
                    className="border-2 border-gray-300 bg-white mt-4 w-full hover:border-gray-600 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Sign in with Google
                  </button>
                </div>
                <div className="text-center font-bold my-6">
                  Chưa tham gia Hahahihi?{" "}
                  <a href="#" className="hover:text-indigo-600">
                    Đăng ký
                  </a>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
