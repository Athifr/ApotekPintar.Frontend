import api from './axiosInstance';

export const getMedicines = async () => {
    const response = await api.get('/medicines');
    return response.data;
};

export const addMedicine = async (medicine) => {
    const response = await api.post('/medicines', medicine);
    return response.data;
};

export const updateMedicine = async (id, medicine) => {
    const response = await api.put(`/medicines/${id}`, medicine);
    return response.data;
};

export const deleteMedicine = async (id) => {
    const response = await api.delete(`/medicines/${id}`);
    return response.data;
};

export const importMedicines = async (formData) => {
    // Matching Backend: [HttpPost("import-csv")]
    const response = await api.post('/medicines/import-csv', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const searchMedicines = async (query) => {
    const response = await api.get('/medicines/search', { params: { name: query } });
    return response.data;
};

export const getLookup = async () => {
    const response = await api.get('/medicines/lookup');
    return response.data;
};

export const checkout = async (data) => {
    const response = await api.post('/sales/checkout', data);
    return response.data;
};
