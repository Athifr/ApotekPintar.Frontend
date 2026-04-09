import React from 'react';
import { Package, BarChart3, Pill, ShoppingCart, FileText } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange }) => {
    return (
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col z-10 transition-all duration-300 ease-in-out hidden md:flex">
            <div className="p-6 border-b flex items-center gap-3">
                <div className="bg-teal-600 p-2 rounded-lg">
                    <Pill className="text-white" size={24} />
                </div>
                <span className="font-bold text-xl text-gray-800 tracking-tight">Apotek Pintar</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => onTabChange('inventory')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'inventory'
                            ? 'bg-teal-50 text-teal-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <Package size={20} />
                    <span>Inventory</span>
                </button>

                <button
                    onClick={() => onTabChange('pos')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'pos'
                            ? 'bg-teal-50 text-teal-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <ShoppingCart size={20} />
                    <span>Penjualan (POS)</span>
                </button>

                <button
                    onClick={() => onTabChange('revenue')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${activeTab === 'revenue'
                            ? 'bg-teal-50 text-teal-600 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                >
                    <FileText size={20} />
                    <span>Laporan</span>
                </button>
            </nav>

            <div className="p-4 border-t text-xs text-gray-400 text-center">
                &copy; 2026 Apotek Pintar v2.0
            </div>
        </div>
    );
};

export default Sidebar;
