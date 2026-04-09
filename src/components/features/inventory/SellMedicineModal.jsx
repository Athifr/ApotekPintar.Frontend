import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SellMedicineModal = ({ isOpen, onClose, onSell, medicine }) => {
    const [qty, setQty] = useState(1);
    const [cashierName, setCashierName] = useState('MASUKKAN NAMA KASIR');

    // Reset form when modal opens with new medicine
    useEffect(() => {
        if (isOpen) {
            setQty(1);
            setCashierName('MASUKKAN NAMA KASIR');
        }
    }, [isOpen, medicine]);

    if (!isOpen || !medicine) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (qty < 1 || qty > 1000) {
            alert("Quantity must be between 1 and 1000");
            return;
        }
        if (!cashierName || cashierName.trim() === '' || cashierName === 'MASUKKAN NAMA KASIR') {
            alert("masukan nama kasir");
            return;
        }

        onSell({
            medicineId: medicine.id,
            qty: parseInt(qty),
            cashierName: cashierName
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Process Sale</h2>

                <div className="mb-4 bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Selling:</p>
                    <p className="font-semibold text-lg">{medicine.medicineName}</p>
                    <p className="text-sm text-gray-500">Stock Available: {medicine.stock}</p>
                    <p className="text-sm text-gray-500">Price: Rp {medicine.price.toLocaleString()}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="qty">
                            Quantity (1-1000)
                        </label>
                        <input
                            type="number"
                            id="qty"
                            min="1"
                            max="1000"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cashierName">
                            Cashier Name
                        </label>
                        <input
                            type="text"
                            id="cashierName"
                            value={cashierName}
                            onChange={(e) => setCashierName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-150"
                        >
                            Confirm Sale
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SellMedicineModal;
