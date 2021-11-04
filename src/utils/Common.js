import axios from "axios";

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const removeUserLocal = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const setUserLocal = async ({ token, userID }) => {
  localStorage.setItem("token", token);
  const res = await axios.get(`/user/detail/${userID}`);
  localStorage.setItem("user", JSON.stringify(res.data));
};

export const resetUserLocal = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
