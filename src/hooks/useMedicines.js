import { useState, useEffect, useCallback } from 'react';
import { 
  getMedicines, 
  addMedicine as apiAdd, 
  updateMedicine as apiUpdate, 
  deleteMedicine as apiDelete, 
  importMedicines as apiImport,
  searchMedicines as apiSearch
} from '../api/medicineService';

export const useMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
      setMedicines(data);
      setError(null); // Clear error on success
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
      setError("Failed to load medicines. Please check backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  const addMedicine = async (newMedicine) => {
    try {
      await apiAdd(newMedicine);
      await fetchMedicines();
      return { success: true, message: "Medicine added successfully!" };
    } catch (err) {
      return { success: false, message: "Failed to add medicine: " + (err.response?.data?.message || err.message) };
    }
  };

  const updateMedicine = async (id, updatedData) => {
    try {
      await apiUpdate(id, updatedData);
      await fetchMedicines();
      return { success: true, message: "Medicine updated successfully!" };
    } catch (err) {
      return { success: false, message: "Failed to update medicine: " + (err.response?.data?.message || err.message) };
    }
  };

  const deleteMedicine = async (id) => {
    try {
        await apiDelete(id);
        await fetchMedicines();
        return { success: true, message: "Medicine deleted successfully!" };
    } catch (err) {
        return { success: false, message: "Failed to delete medicine: " + (err.response?.data?.message || err.message) };
    }
  };

// Removed unused sellMedicine import and function

  const importMedicines = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await apiImport(formData);
        await fetchMedicines();
        return { success: true, message: response.message || "Import successful!" };
      } catch (err) {
        return { success: false, message: "Import failed: " + (err.response?.data?.message || err.message) };
      }
  };

  const searchMedicines = useCallback(async (query) => {
      try {
          if (!query) {
              await fetchMedicines();
              return;
          }
          setLoading(true);
          // Using imported apiSearch
          const results = await apiSearch(query);
          setMedicines(results);
      } catch (err) {
          console.error("Search failed:", err);
      } finally {
          setLoading(false);
      }
  }, [fetchMedicines]);

  return {
    medicines,
    loading,
    error,
    fetchMedicines,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    importMedicines,
    searchMedicines
  };
};
