import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7094/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getMedicines = async () => {
  const response = await api.get("/medicines");
  return response.data;
};

export const addMedicine = async (medicineData) => {
  const response = await api.post("/medicines", medicineData);
  return response.data;
};

export const sellMedicine = async (saleData) => {
  const response = await api.post("/sales/sell", saleData);
  return response.data;
};

export const updateMedicine = async (id, medicineData) => {
  const response = await api.put(`/medicines/${id}`, medicineData);
  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await api.delete(`/medicines/${id}`);
  return response.data;
};

export const importMedicines = async (formData) => {
  const response = await api.post("/medicines/import-csv", formData);
  return response.data;
};

export const exportRevenueReport = async () => {
  const response = await api.get("/sales/export-revenue", {
    responseType: "blob", // Important for downloading files
  });
  return response.data;
};

export const getDailySummary = async () => {
  const response = await api.get("/dashboard/daily-summary");
  return response.data;
};

export const getSalesHistory = async () => {
  const response = await api.get("/sales/history");
  return response.data;
};

export const searchMedicines = async (query) => {
  const response = await api.get("/medicines/search", {
    params: { name: query },
  });
  return response.data;
};

export const checkout = async (data) => {
  const response = await api.post("/sales/checkout", data);
  return response.data;
};

export default api;
