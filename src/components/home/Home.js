import React from "react";
import Picture from "../../elements/picture/Picture";
import "./Home.css";

export default function Home() {
  return (
    <div className="home flex">
      <div className="flex flex-col">
        <Picture
          title="Thiết kế thời trang đẹp"
          thumnail="https://photo-cms-baonghean.zadn.vn/w607/Uploaded/2021/ftgbtgazsnzm/2021_08_18/140073108_3487070101518415_4697572891104697662_n_ojel2177802_1882021.jpg"
        />
        <Picture
          title="Thiết kế Sơn tùng MTP đẹp"
          thumnail="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
        />
      </div>
      <div className="flex flex-col">
        <Picture
          title="Thiết kế Vườn hoa đẹp"
          thumnail="https://meta.vn/Data/image/2020/10/09/dat-ten-tieng-anh-cho-be-gai-1.jpg"
        />
      </div>
      <div className="flex flex-col">
        <Picture
          title="Thiết kế Hồ đẹp"
          thumnail="https://vcdn-vnexpress.vnecdn.net/2021/04/08/00-7617-1617852780.jpg"
        />
      </div>
      <div className="flex flex-col">
        <Picture
          title="Thiết kế Bồ công anh đẹp"
          thumnail="https://cdn.tgdd.vn/Files/2019/01/01/1142002/s8high_800x600.jpg"
        />
      </div>
      <div className="flex flex-col">
        <Picture
          title="Thiết kế Ảnh thẻ đẹp"
          thumnail="https://static2.yan.vn/YanNews/202005/202005220338210409-bee6f138-0608-4d56-bce3-27148a855654.png"
        />
      </div>
    </div>
  );
}
