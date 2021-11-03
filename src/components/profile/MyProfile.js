import { EditOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router";
import cover from "../../assets/profile/anhbia.png";
import Picture from "../../elements/picture/Picture";
import { getUserID } from "../../utils/Common";
import "./MyProfile.css";
const { TabPane } = Tabs;

const fakeImg = [
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
  {
    titlePost: "anc",
    urlPicture:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
    idPost: 1,
  },
];

export default function MyProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="pb-5">
      <div className="flex flex-col image">
        <div className=" flex flex-col items-center">
          <img src={cover} alt="cover" width="805px" height="368px" />
        </div>
        <div className="avatar flex flex-col w-full">
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
              alt=""
              width="145px"
              height="145px"
              className="mx-3 rounded-full cursor-pointer item "
            />
          </div>
          <div className="info">
            <div className="name">
              Phuong Thao Nguyen{" "}
              {getUserID() == id && (
                <EditOutlined
                  className="ml-3 cursor-pointer"
                  style={{ color: "blue" }}
                  onClick={() => navigate(`/user-edit/2`)}
                />
              )}
            </div>
            <div className="des">
              Our mission is to inspire, educate and help others to become
              professional and successful designers.
            </div>
            <div className="subcrible">
              38k người theo dõi • 30 người đang theo dõi
            </div>
          </div>
          <div className="tab mb-4">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Đã tạo" key="1">
                <div className="flex flex-row flex-wrap justify-between px-12">
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 0) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 1) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 2) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 3) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 4) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Yêu thích" key="2">
                <div className="flex flex-row flex-wrap justify-between px-10">
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 0) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 1) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 2) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 3) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                  <div className="flex flex-col">
                    {fakeImg.map((post, index) => {
                      if (index % 5 === 4) {
                        return (
                          <Picture
                            title={post.titlePost}
                            thumnail={post.urlPicture}
                            id={post.idPost}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
