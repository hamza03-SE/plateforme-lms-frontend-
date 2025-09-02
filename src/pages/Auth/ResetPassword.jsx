import { useState } from "react";
import { Form, Input, Button, Typography, Alert, Spin } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import authService from "../../services/authService.js";

const { Title } = Typography;

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    setLoading(true);
    setMessage("");
    try {
      await authService.resetPassword(token, values.password);
      setMessage("Mot de passe réinitialisé avec succès !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la réinitialisation du mot de passe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-auto shadow-lg rounded-xl p-6 bg-white">
        
        <Title level={2} className="text-center mb-6">Réinitialiser le mot de passe</Title>

        {message && <Alert message={message} type="info" className="mb-4" />}

        <Form layout="vertical" onFinish={handleSubmit}>

          <Form.Item 
          label="Nouveau mot de passe" 
          name="password" 
          rules={[{ required: true, message: "Nouveau mot de passe" },
            {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*&]).{8,}$/, 
              message: "Le mot de passe doit contenir au moins 8 caractere, une majuscule, une minuscule, un chiffre et un caractère spécial (!@#$%*&?)"
            }
          ]}
          onCopy = {(e) => {e.preventDefault(); return false; }}
          onPaste = {(e) => { e.preventDefault(); return false; }}
          hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="********" />
          </Form.Item>

           <Form.Item
            name="confirmMotDePasse"
            label="Confirmer le mot de passe"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {required: true, message: "Veuillez confirmer le mot de passe"},
              ({getFieldValue}) => ({
                validator(_, value){
                  if(!value || getFieldValue("password") == value){
                    return Promise.resolve();
                  }
                  else {
                    return Promise.reject(new Error("Les mots de passe ne correspondent pas"));
                  }
                }
              })
            ]}
          onCopy = {(e) => {e.preventDefault(); return false; }}
          onPaste = {(e) => { e.preventDefault(); return false; }}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="********" />
           </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block disabled={loading}>
              {loading ? <Spin size="small" /> : "Réinitialiser"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
