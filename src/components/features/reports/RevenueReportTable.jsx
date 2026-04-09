import React from 'react';
import { Calendar, TrendingUp, Award, Package } from 'lucide-react';

const RevenueReportTable = ({ data }) => {
    const groupedData = data.reduce((acc, item) => {
        const date = new Date(item.date);
        const monthYear = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(item);
        return acc;
    }, {});

    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mt-8 border border-gray-100">
            {/* Header Laporan */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                    <Calendar className="w-6 h-6" />
                    <h2 className="text-xl font-bold uppercase tracking-wider">Revenue Analysis Report</h2>
                </div>
                <div className="text-blue-100 text-sm italic">
                    Updated real-time
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Transactions</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Top Product</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Daily Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {Object.keys(groupedData).length > 0 ? (
                            Object.entries(groupedData).map(([month, items]) => (
                                <React.Fragment key={month}>
                                    {/* Sub-Header Bulan */}
                                    <tr className="bg-blue-50 border-y border-blue-100">
                                        <td colSpan="4" className="px-6 py-3 text-sm font-black text-blue-800 uppercase tracking-widest">
                                            {month}
                                        </td>
                                    </tr>
                                    
                                    {items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {new Date(item.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {item.total_sales} Trx
                                                </span>
                                            </td>
                                            {/* KOLOM TOP PRODUCT - Kembali Beraksi */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Package className="w-3.5 h-3.5 text-orange-400" />
                                                    <span className="truncate max-w-[150px] font-medium italic">
                                                        {item.top_product || "-"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="text-sm font-bold text-gray-900">
                                                    Rp {item.total_revenue?.toLocaleString() || 0}
                                                </div>
                                                {/* PERBAIKAN: Menggunakan avg_per_trx sesuai BE */}
                                                <div className="text-[10px] text-gray-400 flex items-center justify-end gap-1">
                                                    <TrendingUp className="w-3 h-3 text-green-400" />
                                                    Avg: Rp {(item.avg_per_trx || 0).toLocaleString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                                    No data available for the selected period.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Grand Total Summary */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
                <div className="flex justify-end items-center gap-6">
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Total Accumulation</p>
                        <p className="text-2xl font-black text-blue-700">
                            Rp {data.reduce((sum, i) => sum + (i.total_revenue || 0), 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueReportTable;