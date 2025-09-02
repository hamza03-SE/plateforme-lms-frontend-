import api from "./api";
import { jwtDecode } from "jwt-decode";


const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, motDePasse: password });

    const { token } = response.data;

    // Décoder le token JWT pour récupérer email + rôle
    const decoded = jwtDecode(token);
    // Ton JwtTokenProvider met sûrement role dans "role" et email dans "sub"
    // Vérifie dans ton JwtTokenProvider.generateToken ce qui est mis comme claims

    return {
      token,
      role: decoded.role,
      email: decoded.sub, // ou decoded.email selon ton implémentation
    };
  },

  register: async ({nom, prenom, email, motDePasse, role}) => {
    const response = await api.post("/auth/register", {
      nom,
      prenom,
      email,
      motDePasse,
      role,
    });

    const { token } = response.data;
    const decoded = jwtDecode(token);

    return {
      token,
      role: decoded.role,
      email: decoded.sub,
    };
  },

  logout: () => {
    localStorage.removeItem("user");
  },
  
  forgotPassword: async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data; // { message: "Email de réinitialisation envoyé" }
  } catch (err) {
    // Gestion des erreurs
    throw err.response?.data || { message: "Erreur lors de l'envoi de l'email" };
  }
},

resetPassword: async (token, motDePasse) => {
  try {
    const response = await api.post("/auth/reset-password", { token, motDePasse });
    return response.data; // { message: "Mot de passe réinitialisé avec succès" }
  } catch (err) {
    throw err.response?.data || { message: "Erreur lors de la réinitialisation du mot de passe" };
  }
},

};

export default authService;
