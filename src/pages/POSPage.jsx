import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useMedicines } from '../hooks/useMedicines';
import { Search, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const POSPage = () => {
    const {
        cart,
        cashierName,
        setCashierName,
        amountPaid,
        setAmountPaid,
        addToCart,
        removeFromCart,
        updateQty,
        calculateTotal,
        processCheckout,
        loading: checkoutLoading
    } = useCart();

    const { medicines, searchMedicines, loading: medicinesLoading } = useMedicines();
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search
    useEffect(() => {
        if (!searchTerm.trim()) {
            // Immediately fetch all if search is cleared
            searchMedicines('');
            return;
        }

        const timer = setTimeout(() => {
            searchMedicines(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]); // Only run when searchTerm changes, ignore searchMedicines to prevent loop

    const handleCheckout = async () => {
        const result = await processCheckout();
        alert(result.message);
        if (result.success) {
            // Refresh stock data freshly from server
            searchMedicines('');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-theme('spacing.24'))] gap-4 animate-fade-in">
            {/* Left Side: Product List */}
            <div className="md:w-2/3 flex flex-col gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-2">
                    <Search className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari obat berdasarkan nama atau SKU..."
                        className="w-full focus:outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50 p-2 rounded-lg border border-gray-200">
                    {medicinesLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {medicines.map((medicine) => (
                                <div key={medicine.id}
                                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
                                    onClick={() => addToCart(medicine)}>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-sm line-clamp-2">{medicine.medicineName} {medicine.unit ? `(${medicine.unit})` : ''}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{medicine.sku}</p>
                                    </div>
                                    <div className="flex justify-between items-end mt-2">
                                        <span className="font-bold text-teal-600 text-sm">Rp {medicine.price.toLocaleString()}</span>
                                        <div className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                                            Stok: {medicine.stock}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side: Cart */}
            <div className="md:w-1/3 bg-white rounded-lg shadow-lg flex flex-col h-full">
                <div className="p-4 border-b bg-teal-600 text-white rounded-t-lg">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <ShoppingCart size={20} />
                        Keranjang Penjualan
                    </h2>
                </div>

                <div className="p-4 border-b">
                    <label className="block text-gray-700 text-xs font-bold mb-1">Nama Kasir</label>
                    <input
                        type="text"
                        value={cashierName}
                        onChange={(e) => setCashierName(e.target.value)}
                        className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:border-teal-500"
                    />
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center bg-gray-50 p-2 rounded border">
                            <div className="flex-1">
                                <h4 className="font-semibold text-sm text-gray-800">{item.medicineName} {item.unit ? `(${item.unit})` : ''}</h4>
                                <p className="text-xs text-gray-500">Rp {item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => updateQty(item.id, item.qty - 1)} className="p-1 hover:bg-gray-200 rounded text-gray-600">
                                    <Minus size={14} />
                                </button>
                                <span className="text-sm font-bold w-6 text-center">{item.qty}</span>
                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="p-1 hover:bg-gray-200 rounded text-gray-600">
                                    <Plus size={14} />
                                </button>
                                <button onClick={() => removeFromCart(item.id)} className="p-1 hover:bg-red-100 rounded text-red-500 ml-1">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {cart.length === 0 && (
                        <p className="text-center text-gray-400 text-sm mt-10">Keranjang kosong.</p>
                    )}
                </div>

                <div className="p-4 border-t bg-gray-50 rounded-b-lg space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-600">Total</span>
                        <span className="font-bold text-2xl text-teal-700">Rp {calculateTotal().toLocaleString()}</span>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-xs font-bold mb-1">Uang Tunai</label>
                        <input
                            type="number"
                            value={amountPaid || ''}
                            onChange={(e) => setAmountPaid(e.target.value)}
                            className="w-full border rounded px-2 py-2 text-lg focus:outline-none focus:border-teal-500 font-bold"
                            placeholder="0"
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm border-t pt-2 border-gray-200">
                        <span className="font-bold text-gray-600">Kembalian</span>
                        <span className={`font-bold text-lg ${(Number(amountPaid || 0) - calculateTotal()) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            Rp {(Number(amountPaid || 0) - calculateTotal()).toLocaleString()}
                        </span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={checkoutLoading || cart.length === 0 || Number(amountPaid || 0) < calculateTotal()}
                        className={`w-full py-3 mt-2 rounded-lg font-bold text-white shadow transition
                            ${checkoutLoading || cart.length === 0 || Number(amountPaid || 0) < calculateTotal() ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'}
                        `}
                    >
                        {checkoutLoading ? 'Memproses...' : 'Proses Transaksi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default POSPage;
