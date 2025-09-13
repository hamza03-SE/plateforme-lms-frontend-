// src/routes/RoleBasedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function RoleBasedRoute({ allowedRoles = [], children }) {
  const { user, loading } = useContext(AuthContext);

  // pendant que AuthContext charge le localStorage
  if (loading) return <div>Chargement...</div>;

  // pas connecté → login
  if (!user) return <Navigate to="/login" replace />;

  console.log("Role courant:", user.role);

  // connecté mais rôle non autorisé → unauthorized
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // tout est ok → afficher la page protégée
  return children;
}
