import React from "react";
import { NavLink } from "react-router-dom";
import {
  Package,
  Pill,
  ShoppingCart,
  FileText,
  Layers,
  BookOpen,
} from "lucide-react";

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-teal-50 text-teal-600 font-semibold"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col z-10 hidden md:flex">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="bg-teal-600 p-2 rounded-lg">
          <Pill className="text-white" size={24} />
        </div>
        <span className="font-bold text-xl text-gray-800 tracking-tight">
          Apotek Pintar
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink title="Inventory" to="/inventory" className={navLinkClass}>
          <Package size={20} />
          <span>Inventory</span>
        </NavLink>

        <NavLink title="Kategori" to="/categories" className={navLinkClass}>
          <Layers size={20} />
          <span>Kategori</span>
        </NavLink>

        <NavLink title="POS" to="/pos" className={navLinkClass}>
          <ShoppingCart size={20} />
          <span>Penjualan (POS)</span>
        </NavLink>

        <NavLink title="Laporan" to="/reports" className={navLinkClass}>
          <FileText size={20} />
          <span>Laporan</span>
        </NavLink>

        <NavLink title="Kandungan" to="/ingredients" className={navLinkClass}>
          <BookOpen size={20} />
          <span>Kandungan Obat</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t text-xs text-gray-400 text-center">
        &copy; 2026 Apotek Pintar v2.0
      </div>
    </div>
  );
};

export default Sidebar;
