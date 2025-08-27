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
};

export default authService;
