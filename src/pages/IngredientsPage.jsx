import React, { useState } from "react";
import { drugIngredients } from "../utils/drugData";
import { Search, BookOpen } from "lucide-react";

const IngredientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = drugIngredients.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.function.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <BookOpen className="text-teal-600" size={32} />
            Kandungan & Fungsi Obat
          </h1>
          <p className="text-gray-500 mt-1">
            Daftar referensi kandungan aktif untuk kasir
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari kandungan atau fungsi..."
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Nama Kandungan
                </th>
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Kegunaan / Fungsi Utama
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-teal-50/40 transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-teal-700 group-hover:text-teal-800 transition-colors">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 leading-relaxed">
                    {item.function}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="text-gray-400" size={30} />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              Data tidak ditemukan
            </p>
            <p className="text-gray-400 text-sm">
              Coba kata kunci lain atau periksa ejaan Anda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientsPage;
