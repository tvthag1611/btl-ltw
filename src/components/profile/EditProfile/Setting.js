import { Button, Input } from "antd";

export default function Setting() {
  return (
    <div className="px-14 py-8 w-1/2">
      <h1 className="font-bold text-2xl">Cài đặt tài khoản</h1>
      <div>
        Đặt tùy chọn tài khoản của bạn, giúp chúng tôi cá nhân hóa trải nghiệm
        của bạn và thực hiện các thay đổi tài khoản lớn tại đây
      </div>
      <div className="mt-6 w-full">
        <div>Email</div>
        <div>
          <Input style={{ borderRadius: "50px", height: "41px" }} />
        </div>
      </div>

      <div className="mt-3 w-full">
        <div>SĐT</div>
        <div>
          <Input style={{ borderRadius: "50px", height: "41px" }} />
        </div>
      </div>

      <form className="mt-12">
        <div>
          <h2>Thông tin thanh toán</h2>
          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Số tài khoản
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>

          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Chủ tài khoản
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>
          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Ngân hàng
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>
          <div className="mt-5">
            <label className="mt-5" style={{ marginTop: "10px" }}>
              Chi nhánh
            </label>
            <Input style={{ borderRadius: "50px", height: "41px" }} />
          </div>
        </div>

        <div className="mt-5">
          <h2 style={{ marginTop: "10px" }}>Đổi mật khẩu</h2>
          <div className="flex">
            <div className="mr-6 flex-1">
              <Input
                style={{ borderRadius: "50px", height: "41px" }}
                type="password"
              />
            </div>
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ background: "#bfbfbf", color: "black" }}
            >
              Thay đổi
            </Button>
          </div>
        </div>
        <div className="flex mt-12">
          <div className="mr-6 flex-1">
            <h1>Xoá tài khoản</h1>
            <div>Xóa tài khoản và dữ liệu tài khoản của bạn</div>
          </div>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ background: "#bfbfbf", color: "black" }}
          >
            Xóa tài khoản
          </Button>
        </div>
        <div className="flex mt-12">
          <div className="mr-6">
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ background: "#bfbfbf", color: "black" }}
            >
              Hủy
            </Button>
          </div>
          <Button type="primary" shape="round" size="large">
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}
