import { useState, useEffect, useCallback } from "react";
import {
  getDailySummary,
  getSalesHistory,
  exportRevenueReport as apiExport,
  getRevenueReportData,
} from "../api/reportService";

export const useReports = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [salesHistory, setSalesHistory] = useState([]);

  const fetchReports = useCallback(async () => {
    try {
      const reportListData = await getRevenueReportData();
      setRevenueData(reportListData);
    } catch (err) {
      console.error("Failed to fetch report list data:", err);
    }
    try {
      const summary = await getDailySummary();
      setDailySummary(summary);
    } catch (err) {
      console.error("Failed to fetch daily summary:", err);
    }

    try {
      const historyData = await getSalesHistory();
      setSalesHistory(historyData);
    } catch (err) {
      console.error("Failed to fetch sales history:", err);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const exportRevenueReport = async () => {
    try {
      const blob = await apiExport();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Laporan_Pendapatan_${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return { success: true, message: "Download successful!" };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Export failed." };
    }
  };

  return {
    revenueData,
    dailySummary,
    salesHistory,
    fetchReports,
    exportRevenueReport,
  };
};
