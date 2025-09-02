import { Layout, Menu, Dropdown, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Menu déroulant utilisateur
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate("/admin/profile")}>
        Mon profil
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={handleLogout}>
        Déconnexion
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider theme="dark">
        <div className="text-white text-center font-bold py-4 text-lg">
          LMS Admin
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => navigate("/admin/dashboard")}
          >
            Tableau de bord
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => navigate("/admin/utilisateurs")}
          >
            Gestion utilisateurs
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Dropdown overlay={userMenu} placement="bottomRight" arrow>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {user?.nom?.charAt(0).toUpperCase() || "U"}
              </Avatar>
              <span className="font-medium">{user?.prenom || "Utilisateur"}</span>
            </div>
          </Dropdown>
        </Header>

        <Content style={{ margin: "20px", padding: "20px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
