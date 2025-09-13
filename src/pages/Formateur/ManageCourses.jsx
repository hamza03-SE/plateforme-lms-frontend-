// src/pages/Formateur/ManageCourses.jsx
import React, { useEffect, useState } from "react";
import courseService from "../../services/courseService";
import CourseForm from "../../components/CourseForm";
import CardCourse from "../../components/CardCourse";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [formateurs, setFormateurs] = useState([]); // si admin -> récupérer la liste des formateurs

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await courseService.getAll();
      setCourses(res.data);
      // Optionnel: fetch formateurs si besoin
    } catch (err) { console.error(err); alert("Erreur chargement cours"); }
    setLoading(false);
  };

  const openCreate = () => { 
    
    console.log("Bouton Ajouter cliqué"); 
    setEditCourse(null); 
    setModalOpen(true);
    console.log("modalOpen =", true)
  
  };
  const openEdit = (course) => { setEditCourse(course); setModalOpen(true); };

  const handleSubmit = async (payload) => {
    try {
      if (editCourse) {
        await courseService.update(editCourse.id, payload);
      } else {
        await courseService.create(payload);
      }
      setModalOpen(false);
      fetch();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Erreur lors de la sauvegarde");
    }
  };

  const handleDelete = async (course) => {
    if (!confirm(`Supprimer le cours "${course.titre}" ?`)) return;
    try {
      await courseService.remove(course.id);
      setCourses(prev => prev.filter(c => c.id !== course.id));
    } catch (err) {
      console.error(err);
      alert("Erreur suppression");
    }
  };

  if (loading) return <div className="p-8">Chargement...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gérer les cours</h1>
        <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded">➕ Ajouter un cours</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(c => (
          <CardCourse
            key={c.id}
            course={c}
            currentRole="FORMATEUR"
            onEdit={() => openEdit(c)}
            onDelete={() => handleDelete(c)}
          />
        ))}
      </div>

      <CourseForm
        visible={modalOpen}
        initialValues={editCourse}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        formateurs={formateurs}
      />
    </div>
  );
}
