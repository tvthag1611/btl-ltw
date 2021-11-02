export const getUserID = () => {
  const userID = localStorage.getItem("userID");
  return userID;
};

export const getToken = () => {
  return localStorage.getItem("token") || null;
};

export const removeUserLocal = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
};

export const setUserLocal = ({ token, userID }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userID", userID);
};
