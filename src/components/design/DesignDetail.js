import {
  ArrowLeftOutlined,
  DownloadOutlined,
  HeartFilled,
  HeartOutlined,
  NotificationOutlined,
  SendOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MyButton from "../../elements/button/MyButton";
import { message, Tag } from "antd";
import "../create/CreatePicture.css";
import "./DesignDetail.css";
import { getToken, getUser } from "../../utils/Common";
import moment from "moment";
import LoginContext from "../../context/loginContext";
import Picture from "../../elements/picture/Picture";

export default function DesignDetail() {
  const [design, setDesign] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [listFollow, setListFollow] = useState([]);
  const [samePosts, setSamePosts] = useState([]);
  const { id } = useParams();
  const idCurrent = getUser()?.id;
  const [isLike, setIsLike] = useState(
    getToken() ? design?.notiFromUsers?.indexOf(idCurrent) !== -1 : false
  );
  const download = useRef(null);
  const navigate = useNavigate();

  const getDetailDesign = async () => {
    const res = await axios.get(`/post/${id}`);
    if (res.status == 200 && res.statusText == "OK") {
      setDesign(res.data);
    }
  };

  const getSamePosts = async () => {
    const formData = new FormData();
    design?.tags?.map((tg) => formData.append("tags", tg));
    const res = await axios.post(`/post/getPostsTag`, formData);
    if (res.status == 200 && res.statusText == "OK") {
      setSamePosts(res.data?.filter((po) => po.idPost !== Number(id)));
    }
  };

  const getCommentDesign = async () => {
    const res = await axios.get(`/post/getAllCommentByPost?postID=${id}`);
    if (res.status == 200 && res.statusText == "OK") {
      setComments(res.data);
    }
  };

  const getListFollow = async () => {
    const res = await axios.get(
      `/follow/getAllFollowerOfUser?username=${design?.userCreateModel?.username}`
    );
    if (res.status == 200 && res.statusText == "OK") {
      setListFollow(res.data);
    }
  };

  useEffect(() => {
    const like = design?.notiFromUsers?.indexOf(idCurrent) !== -1;
    setIsLike(like);
  }, [design, idCurrent]);

  useEffect(() => {
    getDetailDesign();
    getCommentDesign();
  }, [id]);

  useEffect(() => {
    getSamePosts();
    getListFollow();
  }, [design]);

  const { setIsOpenLogin, setIsCheckout } = useContext(LoginContext);

  const handelLove = async () => {
    const isLogin = getToken();
    if (isLogin) {
      if (!isLike) {
        const formData = new FormData();
        formData.append("postID", id);
        formData.append("actionType", "like");
        const res = await axios.post("/post/likeaction", formData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (res.status == 200 && res.statusText == "OK") {
          setIsLike(true);
          setDesign({
            ...design,
            loveCount: design.loveCount + 1,
            notiFromUsers: [...design.notiFromUsers, idCurrent],
          });
        }
      } else {
        const formData = new FormData();
        formData.append("postID", id);
        formData.append("actionType", "dislike");
        const res = await axios.post("/post/likeaction", formData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (res.status == 200 && res.statusText == "OK") {
          setIsLike(false);
          setDesign({
            ...design,
            loveCount: design.loveCount - 1,
            notiFromUsers: design.notiFromUsers.filter(
              (noti) => noti !== idCurrent
            ),
          });
        }
      }
    } else {
      setIsOpenLogin(true);
    }
  };

  const onFollow = async () => {
    const isLogin = getToken();
    if (isLogin) {
      const formData = new FormData();
      formData.append("usernameAdded", design?.userCreateModel?.username);
      const res = await axios.post("/follow/followAnotherUser", formData, {
        headers: {
          Authorization: `Bearer ${isLogin}`,
        },
      });
      if (res.status == 200 && res.statusText == "OK") {
        setListFollow([...listFollow, { id: idCurrent }]);
      }
    } else {
      setIsOpenLogin(true);
    }
  };

  const onComment = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const isLogin = getToken();
      if (isLogin) {
        const formData = new FormData();
        formData.append("postID", id);
        formData.append("userID", idCurrent);
        formData.append("comment", comment);
        const res = await axios.post("/post/commentAction", formData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        if (res.status == 200 && res.statusText == "OK") {
          setComments([...comments, res.data]);
        }
        setComment("");
      } else {
        setIsOpenLogin(true);
      }
    }
  };

  const onCheckout = () => {
    const isLogin = getToken();
    if (isLogin) {
      setIsCheckout(true);
    } else {
      setIsOpenLogin(true);
    }
  };

  return (
    <div className="py-5">
      <div className="create-picture design-detail mx-auto relative">
        <ArrowLeftOutlined
          className="text-xl cursor-pointer absolute -left-10 top-3"
          onClick={() => navigate(-1)}
        />
        <form className="flex flex-row">
          <div className="upload-create flex-1 flex items-center justify-center">
            <img
              src={design?.urlPicture}
              alt=""
              className="w-full h-full object-cover design-detail__image"
            />
          </div>
          <div className="flex-1 p-5">
            <div className="flex flex-row items-center justify-between mb-3">
              <div className="flex flex-row items-center">
                <img
                  src={design?.userCreateModel?.urlProfilePicture}
                  alt=""
                  style={{ width: 40, height: 40 }}
                  className="mr-3 rounded-full cursor-pointer object-cover"
                />
                <div className="flex flex-col">
                  <h3
                    className="m-0 font-bold hover:text-blue-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/user/${design?.userCreateModel?.id}`)
                    }
                  >
                    {design?.userCreateModel?.fullname}
                  </h3>
                  <p className="m-0">{listFollow?.length} người theo dõi</p>
                </div>
              </div>
              {getToken() ? (
                design?.userCreateModel?.id !== getUser()?.id && (
                  <MyButton
                    className="btn-red"
                    onClick={onFollow}
                    disabled={listFollow?.find((fl) => fl.id == idCurrent)}
                  >
                    {listFollow?.find((fl) => fl.id == idCurrent)
                      ? "Đang theo dõi"
                      : "Theo dõi"}
                  </MyButton>
                )
              ) : (
                <MyButton className="btn-red" onClick={onFollow}>
                  Theo dõi
                </MyButton>
              )}
            </div>
            <h2 className="text-xl font-bold">{design?.titlePost}</h2>
            <p>{design?.descriptionPost}</p>
            {design?.tags?.map((tag) => (
              <Tag color="blue">{tag}</Tag>
            ))}
            <div className="text-3xl">
              {!isLike ? (
                <HeartOutlined
                  className="mr-5 cursor-pointer"
                  onClick={handelLove}
                />
              ) : (
                <HeartFilled
                  className="mr-5 cursor-pointer"
                  style={{ color: "red" }}
                  onClick={handelLove}
                />
              )}
              <NotificationOutlined className="mr-5 cursor-pointer" />
              <SendOutlined className="cursor-pointer" />
            </div>
            <p>{design?.loveCount} lượt thích</p>
            {design?.price === 0 ? (
              <a
                href={getToken() ? design?.urlDesign : "#"}
                className="block w-28 h-10 flex items-center justify-center rounded-full text-white hover:text-white bg-green-500 hover:bg-green-600"
                ref={download}
                onClick={() => {
                  if (!getToken()) {
                    setIsOpenLogin(true);
                  } else {
                    download.current.download = true;
                  }
                }}
              >
                <DownloadOutlined className="mr-2" /> Free
              </a>
            ) : (
              <a
                className="block w-28 h-10 flex items-center justify-center rounded-full text-white hover:text-white bg-yellow-500 hover:bg-yellow-600"
                onClick={onCheckout}
              >
                <DownloadOutlined className="mr-2" /> {`${design?.price}đ`}
              </a>
            )}
            <h3 className="text-lg font-bold my-4">Nhận xét</h3>
            {comments.map((cmt) => (
              <div>
                <div className="flex flex-row">
                  <img
                    src={cmt.userComment.urlProfilePicture}
                    alt=""
                    style={{ width: 40, height: 40 }}
                    className="mr-3 object-cover rounded-full"
                  />
                  <div>
                    <p className="mb-0">
                      <strong className="mr-3">
                        {cmt.userComment.fullname}
                      </strong>
                      {moment(cmt.timeCreated).fromNow()}
                    </p>
                    <p>{cmt.comment}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-row items-center">
              {getUser()?.urlProfilePicture && (
                <img
                  src={getUser()?.urlProfilePicture}
                  alt=""
                  style={{ width: 40, height: 40 }}
                  className="mr-3 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col flex-1">
                <input
                  className="border rounded-full w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="comment"
                  type="text"
                  placeholder="Thêm nhận xét"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={onComment}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <h3 className="font-bold text-lg mt-10 mb-4 text-center">
        Thêm các thể loại tương tự
      </h3>
      <div className="home flex">
        <div className="flex flex-col">
          {samePosts.map((post, index) => {
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
          {samePosts.map((post, index) => {
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
          {samePosts.map((post, index) => {
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
          {samePosts.map((post, index) => {
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
          {samePosts.map((post, index) => {
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
    </div>
  );
}
