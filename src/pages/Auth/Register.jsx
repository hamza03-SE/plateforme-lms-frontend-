import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle, FiXCircle } from "react-icons/fi"; // ✅ Icônes ajoutées
import Loader from "../../components/Loader.jsx";
import authService from "../../services/authService.js";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Conditions de mot de passe
  const passwordRules = {
    length: motDePasse.length >= 8,
    lowercase: /[a-z]/.test(motDePasse),
    uppercase: /[A-Z]/.test(motDePasse),
    number: /\d/.test(motDePasse),
    special: /[@$!%*?&#]/.test(motDePasse),
  };

  const isPasswordStrong = () =>
    passwordRules.length &&
    passwordRules.lowercase &&
    passwordRules.uppercase &&
    passwordRules.number &&
    passwordRules.special;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isPasswordStrong()) {
      setError("Le mot de passe doit respecter toutes les conditions de sécurité.");
      return;
    }

    if (motDePasse !== confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        nom,
        prenom,
        email,
        motDePasse,
        role,
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

  const RuleItem = ({ valid, text }) => (
    <li className="flex items-center gap-2">
      {valid ? (
        <FiCheckCircle className="text-green-600" />
      ) : (
        <FiXCircle className="text-red-600" />
      )}
      <span className={valid ? "text-green-600" : "text-red-600"}>{text}</span>
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Créer un compte</h1>

        <label className="block mb-2 text-sm font-medium">Nom</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Prénom</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Mot de passe</label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-2"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />

        <ul className="text-sm mb-4 space-y-1">
          <RuleItem valid={passwordRules.length} text="Au moins 8 caractères" />
          <RuleItem valid={passwordRules.lowercase} text="Une lettre minuscule" />
          <RuleItem valid={passwordRules.uppercase} text="Une lettre majuscule" />
          <RuleItem valid={passwordRules.number} text="Un chiffre" />
          <RuleItem valid={passwordRules.special} text="Un caractère spécial (@$#!%*?&)" />
        </ul>

        <label className="block mb-2 text-sm font-medium">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          value={confirmMotDePasse}
          onChange={(e) => setConfirmMotDePasse(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm font-medium">Rôle</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Sélectionner le rôle</option>
          <option value="ADMIN">ADMIN</option>
          <option value="FORMATEUR">FORMATEUR</option>
          <option value="APPRENANT">APPRENANT</option>
        </select>

        {error && <p className="text-red-600 mb-3">{error}</p>}
        {success && <p className="text-green-600 mb-3">{success}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          S'inscrire
        </button>

        {loading && (
          <div className="mt-4">
            <Loader text="Inscription en cours..." />
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
