import { Row, Col, Card } from "antd";
import { BookOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";

const features = [
  { icon: <BookOutlined style={{ fontSize: 40, color: "#1890ff" }} />, title: "Primaire", desc: "Cours adaptés au primaire." },
  { icon: <UserOutlined style={{ fontSize: 40, color: "#52c41a" }} />, title: "Collège", desc: "Accompagnement pour collégiens." },
  { icon: <TeamOutlined style={{ fontSize: 40, color: "#fa8c16" }} />, title: "Lycée", desc: "Préparation au lycée et examens." },
];

const CoopFeatures = () => (
  <div style={{ padding: "50px 20px", textAlign: "center" }}>
    <h2 className="text-2xl font-semibold mb-10">Nos Offres</h2>
    <Row gutter={24} justify="center">
      {features.map((f, idx) => (
        <Col xs={24} sm={12} md={8} key={idx}>
          <Card bordered={false} className="text-center shadow-md">
            {f.icon}
            <h3 className="mt-2">{f.title}</h3>
            <p>{f.desc}</p>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default CoopFeatures;
