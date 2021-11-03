import React from "react";

export default function NotificationImage({
  isViewed,
  noti,
  time,
  img,
  onClick,
}) {
  return (
    <div
      className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer mt-2"
      onClick={onClick}
    >
      <p className="m-0">
        {!isViewed && (
          <span className="w-2 h-2 rounded-full inline-block bg-red-500 mr-2"></span>
        )}
        {noti}
      </p>
      <p className="text-gray-400 m-0">{time}</p>
      {img && (
        <img src={img} alt="" className="w-full h-32 object-cover rounded-lg" />
      )}
    </div>
  );
}
