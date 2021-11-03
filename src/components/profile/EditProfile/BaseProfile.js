import { Button } from "antd";
import React from "react";

export default function BaseProfile() {
  return (
    <div className="px-14 py-8 w-1/2">
      <h1 className="font-bold text-2xl">Hồ sơ công khai</h1>
      <div>Người truy cập hồ sơ của bạn sẽ thấy thông tin sau</div>
      <div className="mt-3">Ảnh</div>
      <div className="flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
          alt=""
          width="145px"
          height="145px"
          className="mx-3 rounded-full cursor-pointer item "
        />

        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ background: "#bfbfbf", color: "black" }}
        >
          Thay đổi
        </Button>
      </div>
      <div>
        <label htmlFor="fullname">Họ và tên</label>
        <input
          className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="fullname"
          type="text"
          placeholder="Nhập họ và tên"
          name="fullname"
          //   onChange={handleChangeInput}
        />
        <label htmlFor="newDesciption">Miêu tả</label>
        <textarea
          className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="newDesciption"
          placeholder="Nhập miêu tả"
          rows="6"
          name="description"
          style={{ resize: "none" }}
          //   onChange={handleChangeInput}
        />
      </div>
      <div>
        <Button
          type="secondary"
          shape="round"
          size="large"
          style={{ background: "#bfbfbf", color: "black" }}
          className="mr-5"
        >
          Huỷ
        </Button>
        <Button type="primary" shape="round" size="large">
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}
