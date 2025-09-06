import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { userService } from "../services/userService";
import UploadAvatar from "../components/UploadAvatar";

const Profil = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nom: user.nom || "",
    prenom: user.prenom || "",
    motDePasse: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userService.updateProfile(formData);
      updateUser(updatedUser);
      alert("Profil mis à jour !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8">
      {/* Avatar */}
      <UploadAvatar />

      {/* Formulaire infos personnelles */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          placeholder="Nom"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          placeholder="Prénom"
          className="border p-2 rounded"
        />
        <input
          type="email"
          value={user.email}
          readOnly
          className="border p-2 rounded bg-gray-100"
        />
        <input
          type="password"
          name="motDePasse"
          value={formData.motDePasse}
          onChange={handleChange}
          placeholder="Nouveau mot de passe"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default Profil;
