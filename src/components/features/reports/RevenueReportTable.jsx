import React, { useState } from 'react';
import { Calendar, TrendingUp, Package, ChevronDown, ChevronRight } from 'lucide-react';

const RevenueReportTable = ({ data }) => {
    // State untuk menyimpan bulan mana saja yang sedang terbuka (bisa buka banyak sekaligus)
    const [openMonths, setOpenMonths] = useState({});

    const groupedData = data.reduce((acc, item) => {
        const date = new Date(item.date);
        const monthYear = date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
        
        if (!acc[monthYear]) {
            acc[monthYear] = [];
        }
        acc[monthYear].push(item);
        return acc;
    }, {});

    const toggleMonth = (month) => {
        setOpenMonths(prev => ({
            ...prev,
            [month]: !prev[month]
        }));
    };

    return (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden mt-8 border border-gray-100">
            {/* Header Laporan */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold uppercase tracking-wider leading-none">Revenue Analysis</h2>
                        <p className="text-blue-100 text-[10px] mt-1 italic uppercase tracking-widest">Real-time Data Monitoring</p>
                    </div>
                </div>
            </div>

            {/* Container dengan Scroll Vertikal & Horizontal */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-20 bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-tighter border-b">Date</th>
                            <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-tighter border-b">Transactions</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-tighter border-b">Top Product</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-tighter border-b">Daily Revenue</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {Object.keys(groupedData).length > 0 ? (
                            Object.entries(groupedData).map(([month, items]) => {
                                const isExpanded = openMonths[month];
                                const monthTotal = items.reduce((sum, i) => sum + (i.total_revenue || 0), 0);

                                return (
                                    <React.Fragment key={month}>
                                        {/* Row Header Bulan (Accordion Trigger) */}
                                        <tr 
                                            onClick={() => toggleMonth(month)}
                                            className="bg-blue-50/80 hover:bg-blue-100 transition-colors cursor-pointer sticky z-10"
                                            style={{ top: '56px' }} // nempel tepat di bawah thead
                                        >
                                            <td colSpan="3" className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    {isExpanded ? <ChevronDown className="w-4 h-4 text-blue-600" /> : <ChevronRight className="w-4 h-4 text-blue-600" />}
                                                    <span className="text-sm font-black text-blue-800 uppercase tracking-widest">{month}</span>
                                                    <span className="text-[10px] bg-blue-200 text-blue-700 px-2 py-0.5 rounded-full">
                                                        {items.length} Days
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-right">
                                                <span className="text-xs font-bold text-blue-700">
                                                    Total: Rp {monthTotal.toLocaleString()}
                                                </span>
                                            </td>
                                        </tr>
                                        
                                        {/* Baris Detail (Hanya muncul jika isExpanded true) */}
                                        {isExpanded && items.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4 whitespace-nowrap border-l-4 border-transparent group-hover:border-blue-500">
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {new Date(item.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {item.total_sales} Trx
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Package className="w-3.5 h-3.5 text-orange-400" />
                                                        <span className="truncate max-w-[150px] font-medium italic">
                                                            {item.total_sales > 1 ? (item.top_product || "-") : "N/A"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="text-sm font-bold text-gray-900">
                                                        Rp {item.total_revenue?.toLocaleString() || 0}
                                                    </div>
                                                    <div className="text-[10px] text-gray-400 flex items-center justify-end gap-1 font-medium">
                                                        <TrendingUp className="w-3 h-3 text-green-500" />
                                                        Avg: Rp {(item.avg_per_trx || 0).toLocaleString()}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </React.Fragment>
                                );
                            })
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
                <div className="flex justify-between items-center">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Grand Total Accumulation</p>
                        <p className="text-3xl font-black text-blue-700 leading-none">
                            Rp {data.reduce((sum, i) => sum + (i.total_revenue || 0), 0).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueReportTable;