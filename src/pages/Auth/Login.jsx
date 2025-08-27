import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import authService from "../../services/authService.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      login(data);

      // Redirection par rôle
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>

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
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          Se connecter
        </button>
        <p className="mt-4 text-center text-sm">
         Pas de compte ?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
        S'inscrire
       </a>
       </p>


        {loading && (
          <div className="mt-4">
            <Loader text="Connexion en cours..." />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
