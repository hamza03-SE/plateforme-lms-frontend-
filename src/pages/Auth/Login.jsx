import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Typography, Alert, Card, Spin, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import authService from "../../services/authService.js";

const { Title, Text } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetMessage, setResetMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(values.email, values.password);
      login(data);

      if (data.role === "ADMIN") navigate("/admin/dashboard");
      else if (data.role === "FORMATEUR") navigate("/formateur/dashboard");
      else navigate("/apprenant/dashboard");
    } catch (err) {
      console.error(err);
      setError("Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  // Gestion du mot de passe oublié
  const handleForgotPassword = async () => {
    setResetLoading(true);
    setResetMessage("");
    try {
      await authService.forgotPassword(resetEmail); // Créer cette méthode dans authService
      setResetMessage("Un email de réinitialisation a été envoyé !");
    } catch (err) {
      console.error(err);
      setResetMessage("Erreur lors de l'envoi de l'email.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-auto max-w-md shadow-lg rounded-xl">
        <Title level={2} className="text-center mb-6">
          Connexion
        </Title>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
              { type: "email", message: "Email invalide" },
              {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                message: "Email invalide"
              }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="exemple@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: "Veuillez entrer votre mot de passe" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>

          <Form.Item className="flex justify-between items-center">
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? <Spin size="small" /> : "Se connecter"}
            </Button>
            <Text
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsModalVisible(true)}
            >
              Mot de passe oublié ?
            </Text>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text>
            Pas de compte ?{" "}
            <Link to="/register" className="text-blue-600">
              S'inscrire
            </Link>
          </Text>
        </div>
      </Card>

      {/* Modal Mot de passe oublié */}
      <Modal
        title="Réinitialiser le mot de passe"
        visible={isModalVisible}
        onOk={handleForgotPassword}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={resetLoading}
      >
        <Input
          placeholder="Votre email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        {resetMessage && <Text className="mt-2 block">{resetMessage}</Text>}
      </Modal>
    </div>
  );
}

export default Login;
