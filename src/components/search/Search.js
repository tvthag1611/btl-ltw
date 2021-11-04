import { SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Tag, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const { Option } = Select;

const DropdownSearch = ({ setIsShow, hiddenMask }) => {
  const [alltag, setAlltag] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchTag, setIsSearchTag] = useState(false);
  const [searchPosts, setSearchPosts] = useState([]);
  const [tagSearch, setTagSearch] = useState([]);
  const navigate = useNavigate();

  const getALlPosts = async () => {
    const res = await axios.get(`/post/getAllPosts`);
    if (res.status == 200 && res.statusText == "OK") {
      setPosts(res.data);
    }
  };

  const getAllTags = async () => {
    const res = await axios.get("/tags/getAllTags");
    setAlltag(res.data);
  };

  const getSamePosts = async (tags) => {
    const formData = new FormData();
    tags.map((tg) => formData.append("tags", tg));
    const res = await axios.post(`/post/getPostsTag`, formData);
    if (res.status == 200 && res.statusText == "OK") {
      setSearchPosts(res.data);
    }
  };

  const onChangeTag = (value) => {
    setTagSearch(value);
    setIsSearchTag(true);
    getSamePosts(value);
    setIsSearch(false);
  };

  useEffect(() => {
    getAllTags();
    getALlPosts();
  }, []);
  return (
    <div className="w-full search bg-white shadow-lg rounded-lg p-6">
      <p className="font-bold">Tìm kiếm gần đây</p>
      <Tag className="cursor-pointer" color="blue">
        Ảnh cưới
      </Tag>
      <Tag className="cursor-pointer" color="red">
        Poster
      </Tag>
      <Tag className="cursor-pointer" color="cyan">
        Nguyen Phuong Thao
      </Tag>
      <p className="font-bold mt-4">Tìm kiếm theo tag</p>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        placeholder="Tags Mode"
        onChange={onChangeTag}
        onBlur={() => {
          if (tagSearch.length === 0) {
            setIsSearchTag(false);
          }
        }}
      >
        {alltag.map((tag) => (
          <Option key={tag}>{tag}</Option>
        ))}
      </Select>
      {isSearch || isSearchTag ? (
        <div>
          <p className="font-bold mt-4">Kết quả search</p>
          <div className="flex flex-row flex-wrap">
            {searchPosts?.map((post) => (
              <div
                className="search-result rounded-xl relative h-40 cursor-pointer mr-5 mb-4"
                onClick={() => {
                  setIsShow(false);
                  hiddenMask();
                  navigate(`/post/${post.idPost}`);
                }}
              >
                <img
                  src={post.urlPicture}
                  alt=""
                  className="rounded-xl filter brightness-50 w-full h-full object-cover"
                />
                <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                  {post.titlePost}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <p className="font-bold mt-4">Gợi ý trên trên Hihihaha</p>
          <div className="flex flex-row">
            <div
              className="w-1/3 rounded-xl relative h-40 cursor-pointer mr-5"
              onClick={() => {
                setIsShow(false);
                hiddenMask();
                navigate(`/post/${posts[posts?.length - 3]?.idPost}`);
              }}
            >
              <img
                src={posts[posts?.length - 3]?.urlPicture}
                alt=""
                className="rounded-xl filter brightness-50 w-full h-full object-cover"
              />
              <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                {posts[posts?.length - 3]?.titlePost}
              </p>
            </div>
            <div
              className="w-1/3 rounded-xl relative h-40 cursor-pointer mr-5"
              onClick={() => {
                setIsShow(false);
                hiddenMask();
                navigate(`/post/${posts[posts?.length - 2]?.idPost}`);
              }}
            >
              <img
                src={posts[posts?.length - 2]?.urlPicture}
                alt=""
                className="rounded-xl filter brightness-50 w-full h-full object-cover"
              />
              <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                {posts[posts?.length - 2]?.titlePost}
              </p>
            </div>
            <div
              className="w-1/3 rounded-xl relative h-40 cursor-pointer"
              onClick={() => {
                setIsShow(false);
                hiddenMask();
                navigate(`/post/${posts[posts?.length - 1]?.idPost}`);
              }}
            >
              <img
                src={posts[posts?.length - 1]?.urlPicture}
                alt=""
                className="rounded-xl filter brightness-50 w-full h-full object-cover"
              />
              <p className="absolute left-2/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-white">
                {posts[posts?.length - 1]?.titlePost}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function Search() {
  const [isShow, setIsShow] = useState(false);

  const hiddenMask = () => {
    const pageMask = document.getElementById("page-mask");
    pageMask.style.display = "none";
  };

  const showSearch = (visible) => {
    setIsShow(visible);
    const pageMask = document.getElementById("page-mask");
    if (visible) {
      pageMask.style.display = "block";
    } else {
      pageMask.style.display = "none";
    }
  };

  return (
    <Dropdown
      overlay={<DropdownSearch setIsShow={setIsShow} hiddenMask={hiddenMask} />}
      trigger={["click"]}
      getPopupContainer={() => document.getElementById("header")}
      placement="bottomCenter"
      onVisibleChange={showSearch}
      visible={isShow}
    >
      <Input
        placeholder="Search"
        className="input-search"
        prefix={<SearchOutlined />}
      />
    </Dropdown>
  );
}
