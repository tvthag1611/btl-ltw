import { EditOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Picture from "../../elements/picture/Picture";
import { getUser } from "../../utils/Common";
import "./MyProfile.css";
const { TabPane } = Tabs;

export default function MyProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [followed, setFollowed] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [postsLiked, setPostsLiked] = useState([]);

  const getInfoUser = async () => {
    const res = await axios.get(`/user/detail/${id}`);
    if (res.status == 200 && res.statusText == "OK") {
      setUserProfile(res.data);
    }
  };

  const getAllMyPost = async () => {
    const res = await axios.get(`/post/getMyPosts/${id}`);
    if (res.status == 200 && res.statusText == "OK") {
      setMyPosts(res.data);
    }
  };

  const getPostsLiked = async () => {
    const res = await axios.get(`/post/getPostsLiked/${id}`);
    if (res.status == 200 && res.statusText == "OK") {
      setPostsLiked(res.data);
    }
  };

  const getFollowed = async () => {
    const res = await axios.get(
      `/follow/getAllFollowerOfUser?username=${getUser().username}`
    );
    if (res.status == 200 && res.statusText == "OK") {
      setFollowed(res.data);
    }
  };

  useEffect(() => {
    getInfoUser();
    getFollowed();
    getAllMyPost();
    getPostsLiked();
  }, [id]);

  return (
    <div className="pb-5">
      <div className="flex flex-col image">
        <div className=" flex flex-col items-center">
          <img
            src={userProfile?.urlBackgroundPicture}
            alt="cover"
            style={{ width: 805, height: 368, objectFit: "cover" }}
          />
        </div>
        <div className="avatar flex flex-col w-full">
          <div className="flex flex-col items-center">
            <img
              src={userProfile?.urlProfilePicture}
              alt=""
              style={{ width: 145, height: 145 }}
              className="mx-3 rounded-full item object-cover"
            />
          </div>
          <div className="info">
            <div className="name">
              {userProfile?.fullname}
              {getUser().id == id && (
                <EditOutlined
                  className="ml-3 cursor-pointer"
                  style={{ color: "blue" }}
                  onClick={() => navigate(`/user-edit/${getUser().id}`)}
                />
              )}
            </div>
            <div className="subcrible">
              {`${followed?.length} `}người đang theo dõi
            </div>
          </div>
          <div className="tab mb-4">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Đã tạo" key="1">
                <div className="flex flex-row flex-wrap">
                  <div className="flex flex-col">
                    {myPosts.map((post, index) => {
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
                    {myPosts.map((post, index) => {
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
                    {myPosts.map((post, index) => {
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
                    {myPosts.map((post, index) => {
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
                    {myPosts.map((post, index) => {
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
                <div className="flex flex-row flex-wrap">
                  <div className="flex flex-col">
                    {postsLiked.map((post, index) => {
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
                    {postsLiked.map((post, index) => {
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
                    {postsLiked.map((post, index) => {
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
                    {postsLiked.map((post, index) => {
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
                    {postsLiked.map((post, index) => {
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
