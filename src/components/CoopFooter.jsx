import { Layout } from "antd";
const { Footer } = Layout;

const CoopFooter = () => (
  <Footer style={{ textAlign: "center" }}>
    © {new Date().getFullYear()} Chabab Alzahraa - Tous droits réservés
  </Footer>
);

export default CoopFooter;
