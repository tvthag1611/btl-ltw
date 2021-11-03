import { Tabs } from "antd";
import BaseProfile from "./BaseProfile";
import Setting from "./Setting";
const { TabPane } = Tabs;

export default function EditProfile() {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Hồ sơ công khai" key="1">
          <BaseProfile />
        </TabPane>
        <TabPane tab="Cài đặt tài khoản" key="2">
          <Setting />
        </TabPane>
      </Tabs>
    </div>
  );
}
