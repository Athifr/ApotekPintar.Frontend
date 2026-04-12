import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EditMedicineModal = ({ isOpen, onClose, onUpdate, medicine }) => {
    const [formData, setFormData] = useState({
        medicineName: '',
        categoryId: '',
        sku: '',
        unit: 'Strip',
        stock: '',
        price: '',
        expiryDate: ''
    });

    useEffect(() => {
        if (medicine) {
            let formattedDate = '';
            if (medicine.expiryDate) {
                formattedDate = new Date(medicine.expiryDate).toISOString().split('T')[0];
            }

            setFormData({
                medicineName: medicine.medicineName || '',
                categoryId: medicine.categoryId || '',
                sku: medicine.sku || '',
                unit: medicine.unit || 'Strip',
                stock: medicine.stock || '',
                price: medicine.price || '',
                expiryDate: formattedDate
            });
        }
    }, [medicine]);

    if (!isOpen || !medicine) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.medicineName || !formData.categoryId || !formData.sku || !formData.stock || !formData.price) {
            alert("Semua field kecuali Expiry Date wajib diisi!");
            return;
        }

        onUpdate(medicine.id, {
            ...formData,
            id: medicine.id,
            categoryId: parseInt(formData.categoryId),
            stock: parseInt(formData.stock),
            price: parseFloat(formData.price),
            expiryDate: formData.expiryDate ? formData.expiryDate : null
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Medicine</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="medicineName">
                            Medicine Name
                        </label>
                        <input
                            type="text"
                            name="medicineName"
                            value={formData.medicineName}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryId">
                            Category ID
                        </label>
                        <input
                            type="number"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
                            SKU
                        </label>
                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                            Satuan
                        </label>
                        <select
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="Tablet">Tablet</option>
                            <option value="Strip">Strip</option>
                            <option value="Kotak">Kotak</option>
                            <option value="Botol">Botol</option>
                            <option value="Pcs">Pcs</option>
                        </select>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                            Expiry Date (ED)
                        </label>
                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                                Stock
                            </label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
                        >
                            Update Medicine
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditMedicineModal;