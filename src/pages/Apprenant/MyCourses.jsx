import React, { useEffect, useState, useContext } from "react";
import { message, Modal, Spin, Row, Col } from "antd";
import CardCourse from "../../components/CardCourse";
import courseService from "../../services/courseService";
import { AuthContext } from "../../context/AuthContext";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    setLoading(true);
    try {
      const res = await courseService.myCoursesApprenant();
      // marquer tous comme "enrolled"
      setCourses(res.data.map(c => ({ ...c, enrolled: true })));
    } catch (err) {
      console.error(err);
      message.error("Erreur chargement des cours");
    }
    setLoading(false);
  };

  const handleQuitCourse = (course) => {
    Modal.confirm({
      title: `Voulez-vous vraiment quitter le cours "${course.titre}" ?`,
      okText: "Oui",
      cancelText: "Non",
      okType: "danger",
      onOk: async () => {
        try {
          await courseService.unenroll(course.id);
          message.success("Cours quitté avec succès !");
          setCourses(prev => prev.filter(c => c.id !== course.id));
        } catch (err) {
          console.error(err);
          message.error("Erreur lors de la désinscription");
        }
      }
    });
  };

  if (loading) return <div className="p-8"><Spin size="large" /></div>;
  if (courses.length === 0) return <div className="p-8">Vous n'êtes inscrit à aucun cours.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mes cours</h1>
      <Row gutter={[16, 16]}>
        {courses.map(course => (
          <Col xs={24} sm={12} lg={8} key={course.id}>
            <CardCourse
              course={course}
              currentRole={user?.role}
              onQuit={handleQuitCourse} // ✅ bouton Quitter
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
