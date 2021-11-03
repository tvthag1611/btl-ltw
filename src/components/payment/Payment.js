import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserID } from "../../utils/Common";

export default function Payment() {
  const [design, setDesign] = useState(null);
  const [recieved, setRecieved] = useState(false);
  const { id } = useParams();
  const idCurrent = Number(getUserID());
  const navigate = useNavigate();

  const getDetailDesign = async () => {
    const res = await axios.get(`/post/${id}`);
    setDesign(res.data);
  };

  useEffect(() => {
    getDetailDesign();
  }, []);
  return (
    <div className="my-10 p-10 w-2/3 mx-auto shadow-lg rounded-lg">
      <div className="flex flex-row">
        <div className="w-48 mr-10">
          <img src={design?.urlPicture} alt="" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold">Checkout</h3>
          <h4 className="font-bold">{design?.titlePost}</h4>
          <p>{design?.descriptionPost}</p>
          <p className="text-red-500">
            <strong>Price: </strong>
            {` ${design?.price}`}đ
          </p>
        </div>
      </div>
      <div>
        <hr />
        <p className="mt-5 uppercase text-gray-500">
          Vui lòng chuyển tiền vô một trong các hình thức dưới đây
        </p>
        <p className="bg-red-200 p-3 mb-2">MOMO: 0387955109</p>
        <p className="bg-blue-200 p-3 mb-2">MB Bank: 16118386888</p>
        <p className="bg-yellow-200 p-3 mb-2">TRAN VAN THANG</p>
        <p>
          {!recieved
            ? "Chúng tôi chưa nhận được của bạn"
            : "Chúng tôi đã nhận được của bạn, hãy tải về nào !"}
        </p>
        {recieved && (
          <a
            href={design?.urlDesign}
            className={`block w-28 h-10 flex items-center justify-center rounded-full text-white hover:text-white bg-green-500 hover:bg-green-600 disabled`}
            download
          >
            Tải về
          </a>
        )}
      </div>
    </div>
  );
}
