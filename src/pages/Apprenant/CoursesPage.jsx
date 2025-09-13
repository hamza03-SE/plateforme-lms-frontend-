// src/pages/CoursesPage.jsx
import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Spin, message } from "antd";
import CardCourse from "../../components/CardCourse";
import courseService from "../../services/courseService";
import { AuthContext } from "../../context/AuthContext";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.role === "FORMATEUR") {
      fetchMyCoursesFormateur();
    } else {
      fetchAllCourses();
    }
  }, [user]);

  // ✅ Tous les cours (Apprenant / Admin)
  const fetchAllCourses = async () => {
    setLoading(true);
    try {
      const res = await courseService.getAll();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      message.error("Erreur chargement des cours");
    }
    setLoading(false);
  };

  // ✅ Seulement les cours du formateur connecté
  const fetchMyCoursesFormateur = async () => {
    setLoading(true);
    try {
      const res = await courseService.myCoursesFormateur();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      message.error("Erreur chargement de mes cours");
    }
    setLoading(false);
  };

  const handleEnroll = async (course) => {
    try {
      await courseService.enroll(course.id);
      message.success("Inscription réussie !");
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, enrolled: true } : c));
    } catch (err) {
      console.error(err);
      message.error("Erreur lors de l'inscription");
    }
  };

  const handleEdit = (course) => {
    message.info(`Modifier le cours: ${course.titre}`);
    // Ici tu peux ouvrir un modal
  };

  const handleDelete = async (course) => {
    if (!window.confirm(`Supprimer le cours "${course.titre}" ?`)) return;
    try {
      await courseService.remove(course.id);
      setCourses(prev => prev.filter(c => c.id !== course.id));
      message.success("Cours supprimé !");
    } catch (err) {
      console.error(err);
      message.error("Erreur suppression");
    }
  };

  if (loading) return <div className="p-8"><Spin size="large" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {user?.role === "FORMATEUR" ? "Mes cours" : "Tous les cours"}
      </h1>
      <Row gutter={[16, 16]}>
        {courses.map(course => (
          <Col xs={24} sm={12} lg={8} key={course.id}>
            <CardCourse
              course={course}
              currentRole={user?.role}
              onEnroll={handleEnroll}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
