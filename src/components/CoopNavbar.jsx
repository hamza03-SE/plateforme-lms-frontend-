import { Layout, Menu } from "antd";
import { BookOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const CoopNavbar = () => {
  const navigate = useNavigate();
  return (
    <Header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div className="text-white font-bold text-xl flex items-center gap-2">
        <BookOutlined /> Chabab Alzahraa
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={[
          { key: "1", label: "Accueil" },
          { key: "2", label: "Connexion", icon: <LoginOutlined />, onClick: () => navigate("/login") },
          { key: "3", label: "Inscription", icon: <UserAddOutlined />, onClick: () => navigate("/register") },
          { key: "4", label: "Admin Cours", onClick: () => navigate("/admin/courses") },
        ]}
      />
    </Header>
  );
};

export default CoopNavbar;
