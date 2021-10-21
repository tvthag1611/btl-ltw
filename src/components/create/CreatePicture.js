import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Tag, Tooltip, Upload } from "antd";
import React, { useState } from "react";
import MyButton from "../../elements/button/MyButton";
import "./CreatePicture.css";
export default function CreatePicture() {
  const [tags, setTags] = useState([
    "Unremovablsdsfsdfsdsfsdfsdfsde",
    "Tag 2",
    "Tag 3",
  ]);

  const [isAddTag, setIsAddTag] = useState(false);

  const handleClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="py-5">
      <div className="create-picture mx-auto">
        <div className="flex flex-row items-center justify-between">
          <h1>Tạo mới Design</h1>
          <MyButton className="btn-red">Tạo mới</MyButton>
        </div>
        <form className="flex flex-row">
          <div className="upload-create flex-1 mr-5"></div>
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
            />
            <label htmlFor="newDesciption">Miêu tả</label>
            <textarea
              className="border rounded-lg w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="newDesciption"
              placeholder="Nhập tiêu đề"
              rows="6"
            />
            {isAddTag && (
              <input
                className="border rounded-full w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nhập tag mới"
              />
            )}
            <label htmlFor="newTag" className="mr-3">
              Tag:
            </label>
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 20;

              const tagElem = (
                <Tag
                  className="edit-tag"
                  key={tag}
                  closable
                  onClose={() => handleClose(tag)}
                >
                  <span>{isLongTag ? `${tag.slice(0, 20)}...` : tag}</span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
            <Tag
              className="cursor-pointer"
              key="newTag"
              onClick={() => setIsAddTag(!isAddTag)}
            >
              <span className="flex items-center">
                <PlusOutlined className="mr-1" />
                New Tag
              </span>
            </Tag>
            <br />
            <div className="mb-3"></div>
            <label htmlFor="newDesciption">Upload Design</label>
            <br />
            <Upload {...props}>
              <MyButton icon={<UploadOutlined />} className="btn-red mt-2">
                Upload
              </MyButton>
            </Upload>
            <div className="text-gray-400 mt-2">
              Lưu ý, bạn có thể upload file nén, ai, psd, ...
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
