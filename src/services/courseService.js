let courses = [
  {
    id: "1",
    titre: "Mathématiques 3ème",
    niveau: "Collège",
    description: "Cours de maths pour les collégiens",
    professeur: "Mme Amina",
    dateHeure: "2025-09-01T10:00",
    duree: 60,
  },
];

export const getCourses = () => Promise.resolve([...courses]);

export const addCourse = (course) => {
  course.id = Date.now().toString();
  courses.push(course);
  return Promise.resolve(course);
};

export const updateCourse = (id, updatedCourse) => {
  courses = courses.map((c) => (c.id === id ? updatedCourse : c));
  return Promise.resolve(updatedCourse);
};

export const deleteCourse = (id) => {
  courses = courses.filter((c) => c.id !== id);
  return Promise.resolve();
};
