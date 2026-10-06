import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// Automatically attach the logged-in user's JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("sanrakshan_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const analyzeSymptoms = async (data) => {
  const response = await API.post(
    "/api/assessment/",
    data
  );

  return response.data;
};

export const getAssessmentHistory = async () => {
  const response = await API.get(
    "/api/assessment/history"
  );

  return response.data;
};

export default API;
