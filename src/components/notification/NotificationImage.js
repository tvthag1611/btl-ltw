import React from "react";

export default function NotificationImage({ noti, time, img }) {
  return (
    <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer mt-2">
      <p className="m-0">{noti}</p>
      <p className="text-gray-400 m-0">{time}</p>
      {img && (
        <img src={img} alt="" className="w-full h-32 object-cover rounded-lg" />
      )}
    </div>
  );
}
