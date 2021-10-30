import {
  ArrowLeftOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { message, Tag, Tooltip, Upload, Select, Input, Button } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import MyButton from "../../elements/button/MyButton";
import { getToken } from "../../utils/Common";
import "./CreatePicture.css";

const { Option } = Select;

export default function CreatePicture() {
  const navigate = useNavigate();
  const [postDesignCreate, setPostDesignCreate] = useState({
    id: 0,
    title: "",
    description: "",
    loveCount: 0,
    urlPicture: null,
    urlDesign: null,
    tags: [],
    price: 0,
  });

  const onChangeTag = (value) => {
    setPostDesignCreate({
      ...postDesignCreate,
      tags: value,
    });
  };

  const beforeUploadImage = (file) => {
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      message.error(`${file.name} is not a image file`);
    }
    return file.type === "image/png" || file.type === "image/jpeg"
      ? true
      : Upload.LIST_IGNORE;
  };

  const handleChangeInput = (e) => {
    setPostDesignCreate({
      ...postDesignCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = ({ file }) => {
    setPostDesignCreate({
      ...postDesignCreate,
      urlPicture: file.originFileObj,
    });
  };

  const handleChangeFile = ({ file }) => {
    setPostDesignCreate({
      ...postDesignCreate,
      urlDesign: file.originFileObj,
    });
  };

  const onCreateNewPicture = async () => {
    const formData = new FormData();
    formData.append("titlePost", postDesignCreate.title);
    formData.append("descriptionPost", postDesignCreate.description);
    formData.append("urlDesign", postDesignCreate.urlDesign);
    formData.append("urlPicture", postDesignCreate.urlPicture);
    formData.append("price", postDesignCreate.price);
    postDesignCreate.tags.map((tag) => formData.append("tags", tag));
    const res = await axios.post("/post/addPost", formData, {
      headers: {
        Authorization: `Beaser ${getToken()}`,
      },
    });
    if (res.status === 200 && res.statusText === "OK") {
      message.success("Tạo Design mới thành công !");
      navigate("/");
    }
  };

  return (
    <div className="py-5">
      <div className="create-picture mx-auto">
        <div className="flex flex-row items-center justify-between mb-2">
          <ArrowLeftOutlined
            className="text-xl cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1>Tạo mới Design</h1>
          <MyButton className="btn-red" onClick={onCreateNewPicture}>
            Tạo mới
          </MyButton>
        </div>
        <form className="flex flex-row">
          <div className="upload-create flex-1 mr-5 flex items-center justify-center">
            {postDesignCreate.urlPicture ? (
              <img
                src={URL.createObjectURL(postDesignCreate.urlPicture)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <Upload
                className="text-center"
                onChange={handleChange}
                showUploadList={false}
                beforeUpload={beforeUploadImage}
              >
                <UploadOutlined />
                <p>Nhấp vào đây để tải lên ảnh miêu tả</p>
              </Upload>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-row items-center mb-3">
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
            <label htmlFor="newTitle">Tiêu đề</label>
            <input
              className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newTitle"
              type="text"
              placeholder="Nhập tiêu đề"
              name="title"
              onChange={handleChangeInput}
            />
            <label htmlFor="newDesciption">Miêu tả</label>
            <textarea
              className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newDesciption"
              placeholder="Nhập tiêu đề"
              rows="6"
              name="description"
              onChange={handleChangeInput}
            />
            <label htmlFor="newTag">Tag</label>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Tags Mode"
              onChange={onChangeTag}
            >
              {postDesignCreate.tags.map((tag, index) => (
                <Option key={index}>{tag}</Option>
              ))}
            </Select>
            <br />
            <div className="mb-3"></div>
            <label htmlFor="newDesciption">Upload Design</label>
            <br />
            <Upload onChange={handleChangeFile}>
              <MyButton icon={<UploadOutlined />} className="btn-red mt-2">
                Upload
              </MyButton>
            </Upload>
            <div className="text-gray-400 mt-2">
              Lưu ý, bạn có thể upload file nén, ai, psd, ...
            </div>
            <div>Giá cả: {postDesignCreate.price}đ</div>
            <div className="flex flex-row">
              <Input
                placeholder="Điền giá"
                value={postDesignCreate.price}
                prefix={<strong>VNĐ</strong>}
                onChange={(e) =>
                  setPostDesignCreate({
                    ...postDesignCreate,
                    price: e.target.value,
                  })
                }
              />
              <Button
                type="primary"
                className="ml-3"
                onClick={() =>
                  setPostDesignCreate({ ...postDesignCreate, price: 0 })
                }
              >
                Free
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
