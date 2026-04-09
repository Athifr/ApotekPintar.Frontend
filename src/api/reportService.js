import api from "./axiosInstance";

export const getDailySummary = async () => {
  const response = await api.get("/dashboard/daily-summary");
  return response.data;
};

export const getSalesHistory = async () => {
  const response = await api.get("/sales/report");
  return response.data;
};

export const exportRevenueReport = async () => {
  // Matching Backend: [HttpGet("export-revenue")]
  const response = await api.get("/sales/export-revenue", {
    responseType: "blob", // Important for file download
  });

  // Return the blob data directly
  return response.data;
};

export const getRevenueReportData = async () => {
  const response = await api.get("/sales/revenue-report");
  return response.data;
};
