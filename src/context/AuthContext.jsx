import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {role: "ADMIN"|"FORMATEUR"|"APPRENANT", token: "..."}

  // Charger depuis localStorage au démarrage
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (payload) => {
    // payload attendu : { role, token, ... }
    localStorage.setItem("user", JSON.stringify(payload));
    setUser(payload);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const hasRole = (roles) => {
    if (!user) return false;
    if (!roles || roles.length === 0) return true;
    return roles.includes(user.role);
  };

  const value = useMemo(() => ({ user, login, logout, hasRole }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
