import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { userService } from "../services/userService";

const UploadAvatar = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [preview, setPreview] = useState(user?.avatar || "/default-avatar.png");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      // Prévisualisation locale immédiate
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      // Préparer les données
      const formData = new FormData();
      formData.append("file", file);

      // Appel backend
      const response = await userService.uploadAvatar(formData);

      // Mettre à jour l’avatar dans le contexte Auth
      updateUser({ ...user, avatar: response.url });
      setPreview(response.url);

    } catch (err) {
      console.error("Erreur upload avatar:", err);
      alert("Erreur lors de l’upload de l’avatar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={preview}
        alt="Avatar"
        className="w-32 h-32 rounded-full object-cover border"
      />
      <label className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        {loading ? "Chargement..." : "Changer"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default UploadAvatar;
