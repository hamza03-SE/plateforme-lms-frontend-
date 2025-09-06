import api from "./api";

export const userService = {
  // Mettre à jour le profil de l'utilisateur connecté
  updateProfile: async (data) => {
    // data = { nom, prenom, motDePasse (optionnel) }
    const response = await api.patch(`/api/utilisateurs/me`, data);
    return response.data; // Renvoie l'objet utilisateur mis à jour
  },

  // Upload de l'avatar vers Spring Boot + MinIO
  uploadAvatar: async (formData) => {
    // formData = FormData contenant { file: File }
    const response = await api.post(`/api/utilisateurs/me/avatar`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // { url: "https://..." }
  },

  // Récupérer la liste de tous les utilisateurs (Admin)
  getAllUsers: async () => {
    const response = await api.get("/api/utilisateurs");
    return response.data;
  },

  // Récupérer son propre profil
  getMe: async () => {
    const response = await api.get("/api/utilisateurs/me");
    return response.data;
  },

  // Supprimer un utilisateur (Admin)
  deleteUser: async (userId) => {
    const response = await api.delete(`/api/utilisateurs/${userId}`);
    return response.data;
  },
};

export default userService;
