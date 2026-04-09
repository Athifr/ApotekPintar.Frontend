import React, { useEffect } from 'react';
import { useReports } from '../hooks/useReports';
import RevenueReportTable from '../components/features/reports/RevenueReportTable';
import SalesHistoryTable from '../components/features/reports/SalesHistoryTable';
import { Download } from 'lucide-react';

const ReportsPage = () => {
    const {
        revenueData,
        salesHistory,
        fetchReports,
        exportRevenueReport
    } = useReports();

    // Fetch reports on mount
    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleExport = async () => {
        const result = await exportRevenueReport();
        if (!result.success) {
            alert(result.message);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Laporan & Pendapatan</h1>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow transition transform hover:scale-105"
                >
                    <Download size={18} />
                    Download Laporan
                </button>
            </div>

            <RevenueReportTable data={revenueData} />
            <SalesHistoryTable history={salesHistory} />
        </div>
    );
};

export default ReportsPage;
