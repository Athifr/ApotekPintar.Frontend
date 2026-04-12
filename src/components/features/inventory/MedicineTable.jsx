import React from 'react';
import { ShoppingCart, Pencil, Trash2 } from 'lucide-react';

const MedicineTable = ({ medicines, onSellClick, onEditClick, onDeleteClick }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category ID</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SKU</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unit</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Expiry Date</th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine) => (
                        <tr key={medicine.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{medicine.id}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{medicine.medicineName}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{medicine.categoryId}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{medicine.sku}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-teal-900 leading-tight">
                                    <span aria-hidden className="absolute inset-0 bg-teal-200 opacity-50 rounded-full"></span>
                                    <span className="relative">{medicine.unit || '-'}</span>
                                </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">{medicine.stock}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">Rp {medicine.price.toLocaleString()}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {medicine.expiryDate ? new Date(medicine.expiryDate).toLocaleDateString() : '-'}
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEditClick(medicine)}
                                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded focus:outline-none transition duration-150 ease-in-out text-xs"
                                        title="Edit"
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteClick(medicine.id, medicine.medicineName)}
                                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded focus:outline-none transition duration-150 ease-in-out text-xs"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                        Del
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {medicines.length === 0 && (
                        <tr>
                            <td colSpan="9" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                                No medicines found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MedicineTable;