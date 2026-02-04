import api from "./api";

const doctorService = {

  getAllDoctors: async () => {
    const response = await api.get('/doctors');
    return response.data;
  },

  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  getDoctorBySpecialization: async (specialization) => {
    const response = await api.get(`/doctors/specialization/${specialization}`);
    return response.data;
  },

  createDoctor: async (doctorData) => {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  },

  updateDoctor: async (id, doctorData) => {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  },

  deleteDoctor: async (id) => {
    await api.delete(`/doctors/${id}`);
  }

};

export default doctorService;
