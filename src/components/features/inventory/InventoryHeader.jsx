import React from 'react';
import { Plus, Upload, Search } from 'lucide-react';

const InventoryHeader = ({ onImport, onAddClick, onSearch }) => {
    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
                <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow cursor-pointer transition transform hover:scale-105">
                        <Upload size={18} />
                        Import Obat
                        <input type="file" accept=".csv" onChange={onImport} className="hidden" />
                    </label>
                    <button
                        onClick={onAddClick}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition transform hover:scale-105"
                    >
                        <Plus size={18} />
                        Tambahkan Obat
                    </button>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Cari obat di inventaris..."
                    onChange={(e) => onSearch && onSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                />
            </div>
        </div>
    );
};

export default InventoryHeader;
