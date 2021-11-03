import { Button, Tabs } from "antd";
import BaseProfile from "./BaseProfile";
const { TabPane } = Tabs;

export default function EditProfile() {
  return (
    <div>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Hồ sơ công khai" key="1">
          <BaseProfile />
        </TabPane>
        <TabPane tab="Cài đặt tài khoản" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
}
