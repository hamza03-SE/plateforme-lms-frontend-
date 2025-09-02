import { Layout } from "antd";
import CoopNavbar from "../components/CoopNavbar";
import CoopFooter from "../components/CoopFooter";

const { Content } = Layout;

const CoopLayout = ({ children }) => {
  return (
    <Layout>
      <CoopNavbar />
      <Content>{children}</Content>
      <CoopFooter />
    </Layout>
  );
};

export default CoopLayout;
