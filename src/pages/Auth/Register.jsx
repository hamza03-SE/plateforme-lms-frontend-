import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Alert, Space } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Loader from "../../components/Loader.jsx";
import authService from "../../services/authService.js";

const { Option } = Select;

function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const passwordRules = {
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  };

  const validatePassword = (password) => {
    passwordRules.length = password.length >= 8;
    passwordRules.lowercase = /[a-z]/.test(password);
    passwordRules.uppercase = /[A-Z]/.test(password);
    passwordRules.number = /\d/.test(password);
    passwordRules.special = /[@$!%*?&#]/.test(password);
    return passwordRules;
  };

  const handleSubmit = async (values) => {
    setError("");
    setSuccess("");

    const pwValidation = validatePassword(values.motDePasse);

    const isStrong =
      pwValidation.length &&
      pwValidation.lowercase &&
      pwValidation.uppercase &&
      pwValidation.number &&
      pwValidation.special;

    if (!isStrong) {
      setError("Le mot de passe doit respecter toutes les conditions de sécurité.");
      return;
    }

    if (values.motDePasse !== values.confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        nom: values.nom,
        prenom: values.prenom,
        email: values.email,
        motDePasse: values.motDePasse,
        role: values.role,
      });

      setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        const backendMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : err.response.data.message;

        setError(backendMessage || "Erreur lors de l'inscription");
      } else {
        setError("Erreur lors de l'inscription");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordRules = () => (
    <Space direction="vertical" size={2} style={{ marginBottom: 16 }}>
      {Object.entries(passwordRules).map(([key, valid]) => (
        <div key={key} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {valid ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          <span style={{ color: valid ? "green" : "red", fontSize: 12 }}>
            {key === "length" && "Au moins 8 caractères"}
            {key === "lowercase" && "Une lettre minuscule"}
            {key === "uppercase" && "Une lettre majuscule"}
            {key === "number" && "Un chiffre"}
            {key === "special" && "Un caractère spécial (@$!%*?&)"} 
          </span>
        </div>
      ))}
    </Space>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        padding: 16,
      }}
    >
      <Form
        form={form}
        name="register"
        onFinish={handleSubmit}
        layout="vertical"
        style={{ width: "100%", maxWidth: 400, backgroundColor: "white", padding: 24, borderRadius: 16 }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 24 }}>Créer un compte</h1>

        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}
        {success && <Alert type="success" message={success} style={{ marginBottom: 16 }} />}

        <Form.Item  name="nom" label="Nom" rules={[{ required: true, message: "Veuillez saisir votre nom" }]}>
          <Input id="nom"/>
        </Form.Item>

        <Form.Item  name="prenom" label="Prénom" rules={[{ required: true, message: "Veuillez saisir votre prénom" }]}>
          <Input id="prenom"/>
        </Form.Item>

        <Form.Item  name="email" label="Email" rules={[{ required: true, type: "email", message: "Email invalide" }]}>
          <Input id="email"/>
        </Form.Item>

        <Form.Item  name="motDePasse" label="Mot de passe" rules={[{ required: true }]}>
          <Input.Password id="motDePasse" onChange={(e) => validatePassword(e.target.value)} />
        </Form.Item>

        {renderPasswordRules()}

        <Form.Item 
          name="confirmMotDePasse"
          label="Confirmer le mot de passe"
          rules={[{ required: true, message: "Veuillez confirmer le mot de passe" }]}
        >
          <Input.Password id="confirmMotDePasse" />
        </Form.Item>

        <Form.Item id="role" name="role" label="Rôle" rules={[{ required: true, message: "Veuillez sélectionner un rôle" }]}>
          <Select placeholder="Sélectionner le rôle">
            <Option value="ADMIN">ADMIN</Option>
            <Option value="FORMATEUR">FORMATEUR</Option>
            <Option value="APPRENANT">APPRENANT</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            S'inscrire
          </Button>
        </Form.Item>

        {loading && <Loader text="Inscription en cours..." />}
      </Form>
    </div>
  );
}

export default Register;
