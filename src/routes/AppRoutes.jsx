import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminCourses from "../pages/Admin/AdminCourses.jsx";
import CoursesPage from "../pages/Apprenant/CoursesPage.jsx";
import MyCourses from "../pages/Apprenant/MyCourses.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import ResetPassword from "../pages/Auth/ResetPassword.jsx";
import LandingCoop from "../pages/LandingCoop.jsx";
import Profil from "../pages/Profil.jsx";
import RoleBasedRoute from "./RoleBasedRoute.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ManageCourses from "../pages/Formateur/ManageCourses.jsx";
function Placeholder({ title }) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">Page à implémenter…</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Page publique */}
        <Route path="/" element={<LandingCoop />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboards protégés */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <Placeholder title="Dashboard Admin" />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <PrivateRoute roles={["ADMIN"]}>
              <AdminCourses />
            </PrivateRoute>
          }
        />
        <Route
          path="/formateur/dashboard"
          element={
            <PrivateRoute roles={["FORMATEUR"]}>
              <Placeholder title="Dashboard Formateur" />
            </PrivateRoute>
          }
        />
        <Route
          path="/apprenant/dashboard"
          element={
            <PrivateRoute roles={["APPRENANT"]}>
              <Placeholder title="Dashboard Apprenant" />
            </PrivateRoute>
          }
        />

        {/* ✅ Page Profil accessible à tout utilisateur connecté */}
        <Route
          path="/profil"
          element={
            <PrivateRoute roles={["ADMIN", "FORMATEUR", "APPRENANT"]}>
              <Profil />
            </PrivateRoute>
          }
        />


        <Route path="/cours" element={
          <PrivateRoute><CoursesPage /></PrivateRoute>
        } />

        <Route path="/my-courses" element={
          <PrivateRoute><MyCourses /></PrivateRoute>
        } />

        <Route path="/formateur/manage-courses" element={
          <RoleBasedRoute allowedRoles={['FORMATEUR','ADMIN']}><ManageCourses /></RoleBasedRoute>
        } />

        <Route path="/unauthorized" element={<Placeholder title="Accès refusé" />} />

        {/* Page 404 */}
        <Route path="*" element={<Placeholder title="404 - Page introuvable" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
