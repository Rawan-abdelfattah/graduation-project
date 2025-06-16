import Api from '../config/api';
import axios from 'axios';

export const doctorClinicService = {
  searchPatients: async (doctorId, searchTerm) => {
    try {
      const response = await Api.get(`/doctor-clinic/search-patient`, {
        params: { doctorId, searchTerm }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addPatientHistory: async (data) => {
    try {
      const response = await Api.post('/doctor-clinic/patient-history', {
        reservationId: data.reservationId,
        doctorId: data.doctorId,
        diagnosis: data.diagnosis,
        medication: data.medication,
        notes: data.notes
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPatientHistory: async (reservationId, doctorId) => {
    try {
      const response = await Api.get(`/doctor-clinic/patient-history/${reservationId}/${doctorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPatientHistorySummary(historyEntries, summaryType = 'comprehensive', maxLength = 300) {
    try {
      const response = await axios.post('https://chatbot.pevidea.com/api/v1/summarize', {
        patient_history: historyEntries,
        summary_type: summaryType,
        max_length: maxLength
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get patient history summary');
    }
  },
}; 