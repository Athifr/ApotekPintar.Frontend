import api from './api';

/**
 * @typedef {Object} Category
 * @property {number} id
 * @property {string} categoryName
 */

/**
 * Mengambil daftar semua kategori
 * @returns {Promise<Category[]>}
 */
export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data kategori", error);
        throw error;
    }
};
