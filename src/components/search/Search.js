import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Tag, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const DropdownSearch = () => {
  const [alltag, setAlltag] = useState([]);

  const getAllTags = async () => {
    const res = await axios.get("/tags/getAllTags");
    setAlltag(res.data);
  };

  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      <p className="font-bold">Tìm kiếm gần đây</p>
      <Tag>ashdjksdjkfsd</Tag>
      <Tag>ashdjksdjkfsd</Tag>
      <Tag>ashdjksdjkfsd</Tag>
      <p className="font-bold mt-4">Tìm kiếm theo tag</p>
      <Select mode="tags" style={{ width: "100%" }} placeholder="Tags Mode">
        {alltag.map((tag) => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
      <p className="font-bold mt-4">Phổ biến trên Hihihaha</p>
      <div className="flex flex-row">
        <div className="w-1/3 rounded-xl relative h-40 cursor-pointer mr-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
            alt=""
            className="rounded-xl filter brightness-50 w-full h-full object-cover"
          />
          <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
            Ảnh cưới đẹp
          </p>
        </div>
        <div className="w-1/3 rounded-xl relative h-40 cursor-pointer mr-5">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
            alt=""
            className="rounded-xl filter brightness-50 w-full h-full object-cover"
          />
          <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
            Ảnh cưới đẹp
          </p>
        </div>
        <div className="w-1/3 rounded-xl relative h-40 cursor-pointer">
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
            alt=""
            className="rounded-xl filter brightness-50 w-full h-full object-cover"
          />
          <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
            Ảnh cưới đẹp
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Search() {
  return (
    <Dropdown
      overlay={<DropdownSearch />}
      trigger={["click"]}
      getPopupContainer={() => document.getElementById("header")}
      placement="bottomCenter"
    >
      <Input
        placeholder="Search"
        className="input-search"
        prefix={<SearchOutlined />}
      />
    </Dropdown>
  );
}
