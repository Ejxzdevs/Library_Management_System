// src/services/api.ts
import axios from 'axios';

// Axios client setup
const apiClient = axios.create({
  baseURL: 'http://localhost:8080',  // Base URL for API
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET ALL REPORTS
export const getAllReport = async () => {
  try {
    const response = await apiClient.get('/report');
    return response.data; 
  } catch (error) {
    console.error('Error fetching Report:', error);
    throw error;
  }
}


// INSERT REPORTS
export const insertReport = async (data: { report_name: string; }) => {
  try {
    const response = await apiClient.post('/report/add', data);
    return response.data; 
  } catch (error) {
    console.error('Error while inseting report:', error);
    throw error; 
  }
};
