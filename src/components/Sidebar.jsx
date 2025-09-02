import { Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="h-full bg-white shadow-lg p-4 w-56">
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Accueil</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<InfoCircleOutlined />}>
          <a href="#features">Fonctionnalités</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContactsOutlined />}>
          <a href="#contact">Contact</a>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
