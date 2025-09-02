import { Button, Row, Col, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import soutienImage from "../assets/soutienscolaire.jpg";
import sc2 from "../assets/sc2.png";
import sc3 from "../assets/3.jpg";

const CoopHero = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "80px 50px", background: "#f0f2f5" }}>
      <Row align="middle" gutter={32}>
        {/* Texte à gauche */}
        <Col xs={24} md={12}>
          <h1 className="text-4xl font-bold mb-4">Bienvenue à Chabab Alzahraa</h1>
          <p className="text-lg mb-6">
            Soutien scolaire personnalisé à Oued Zem pour tous les niveaux :
            primaire, collège, lycée.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/register")}
          >
            Commencer maintenant
          </Button>
        </Col>

        {/* Carousel à droite avec progressDot */}
        <Col xs={24} md={12}>
          <Carousel autoplay dotPosition="bottom" dots={{ className: "custom-dots" }} progressDot>
            <div>
              <img
                src={soutienImage}
                alt="Soutien scolaire"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <img
                src={sc2}
                alt="React Logo"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  height: "400px",
                  objectFit: "contain",
                  background: "#fff",
                  padding: "0px",
                }}
              />
            </div>
            <div>
              <img
                src={sc3}
                alt="Unsplash Exemple"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  height: "400px",
                  objectFit: "cover",
                }}
              />
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

export default CoopHero;
