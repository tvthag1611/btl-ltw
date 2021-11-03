import { Button, Tabs } from "antd";
const { TabPane } = Tabs;

export default function EditProfile() {

    return <div>
        <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Hồ sơ công khai" key="1">
                <h1>Hồ sơ công khai</h1>
                <div>Người truy cập hồ sơ của bạn sẽ thấy thông tin sau</div>
                <div>Ảnh</div>
                <div className="flex items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg"
                        alt=""
                        width="145px"
                        height="145px"
                        className="mx-3 rounded-full cursor-pointer item "
                    />

                    <Button type="primary" shape="round" size="large" style={{ background: "#bfbfbf", color: "black" }}>
                        Thay đổi
                    </Button>
                </div>
            </TabPane>
            <TabPane tab="Cài đặt tài khoản" key="2">
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Thống kê doanh thu" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    </div>
}