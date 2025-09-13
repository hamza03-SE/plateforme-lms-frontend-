import api from "./api";

const resource = "/cours";

export default {
  getAll: () => api.get(resource),
  create: (course) => api.post(resource, course),
  update: (id, course) => api.put(`${resource}/${id}`, course),
  remove: (id) => api.delete(`${resource}/${id}`),

  enroll: (idCours) => api.post(`${resource}/${idCours}/inscrire/me`),
  unenroll: (idCours) => api.delete(`${resource}/${idCours}/desinscrire/me`),

  myCoursesApprenant: () => api.get(`${resource}/mes-cours-apprenant`),
  myCoursesFormateur: () => api.get(`${resource}/mes-cours-formateur`)
};
