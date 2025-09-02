// import { useState } from "react";
// import { Form, Input, Button, Typography, Alert, Spin } from "antd";
// import { MailOutlined } from "@ant-design/icons";
// import authService from "../../services/authService.js";

// const { Title } = Typography;

// function ForgotPassword() {
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (values) => {
//     setLoading(true);
//     setMessage("");
//     try {
//       await authService.forgotPassword(values.email);
//       setMessage("Email de réinitialisation envoyé !");
//     } catch (err) {
//       console.error(err);
//       setMessage("Erreur lors de l'envoi de l'email");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md shadow-lg rounded-xl p-6 bg-white">
//         <Title level={2} className="text-center mb-6">Mot de passe oublié</Title>
//         {message && <Alert message={message} type="info" className="mb-4" />}
//         <Form layout="vertical" onFinish={handleSubmit}>
//           <Form.Item label="Email" name="email" rules={[{ required: true, message: "Veuillez entrer votre email" }, { type: "email", message: "Email invalide" }]}>
//             <Input prefix={<MailOutlined />} placeholder="exemple@mail.com" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" block disabled={loading}>
//               {loading ? <Spin size="small" /> : "Envoyer l'email"}
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
