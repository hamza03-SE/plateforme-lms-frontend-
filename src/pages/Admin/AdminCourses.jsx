import { useState, useEffect } from "react";

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Simuler récupération des données
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses") || "[]");
    setCourses(savedCourses);
  }, []);

  const saveCourses = (newCourses) => {
    setCourses(newCourses);
    localStorage.setItem("courses", JSON.stringify(newCourses));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;

    if (editingId !== null) {
      const updated = courses.map(c => c.id === editingId ? { ...c, ...form } : c);
      saveCourses(updated);
      setEditingId(null);
    } else {
      const newCourse = { id: Date.now(), ...form };
      saveCourses([...courses, newCourse]);
    }

    setForm({ title: "", description: "" });
  };

  const handleEdit = (course) => {
    setForm({ title: course.title, description: course.description });
    setEditingId(course.id);
  };

  const handleDelete = (id) => {
    const updated = courses.filter(c => c.id !== id);
    saveCourses(updated);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestion des cours</h1>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingId !== null ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Titre</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2">{c.description}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-400 px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {courses.length === 0 && (
            <tr>
              <td colSpan="4" className="p-2 text-center text-gray-500">
                Aucun cours
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCourses;
