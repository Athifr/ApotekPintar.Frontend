import React from 'react';
import { History } from 'lucide-react';

const SalesHistoryTable = ({ history }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
            <div className="flex items-center gap-2 mb-4">
                <History className="text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Recent Sales History</h2>
            </div>

            <div className="overflow-x-auto max-h-96">
                <table className="min-w-full leading-normal">
                    <thead className="sticky top-0 z-10">
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Invoice
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Cashier
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Medicines
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Total Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="bg-gray-100 text-gray-800 py-1 px-2 rounded-full text-xs font-mono">
                                        {item.invoiceNumber || item.invoicenumber || item.id || item.Id}
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(item.createdAt || item.createdat).toLocaleString('id-ID')}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap capitalize">
                                        {item.cashierName || item.cashiername || '-'}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    {(item.items || item.Items) && (item.items || item.Items).length > 0 ? (
                                        <ul className="list-disc list-inside text-xs text-gray-700">
                                            {(item.items || item.Items).map((med, idx) => (
                                                <li key={idx}>
                                                    {med.medicine_name || med.medicineName || med.MedicineName} (x{med.qty || med.Qty})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-gray-400 text-xs">-</span>
                                    )}
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 font-bold whitespace-no-wrap">
                                        Rp {(item.totalAmount || item.totalamount)?.toLocaleString()}
                                    </p>
                                </td>
                            </tr>
                        ))}
                        {history.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">
                                    No sales history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesHistoryTable;
