import { useState } from 'react';
import { checkout as apiCheckout } from '../api/medicineService';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [cashierName, setCashierName] = useState('MASUKKAN NAMA KASIR');
  const [amountPaid, setAmountPaid] = useState(0);
  const [loading, setLoading] = useState(false);

  const addToCart = (medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.id === medicine.id 
            ? { ...item, qty: item.qty + 1 } 
            : item
        );
      }
      return [...prev, { ...medicine, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const processCheckout = async () => {
    if (cart.length === 0) return { success: false, message: "Keranjang kosong!" };
    if (!cashierName || cashierName.trim() === '' || cashierName.toUpperCase() === 'MASUKKAN NAMA KASIR') {
        return { success: false, message: "masukan nama kasir" };
    }
    
    setLoading(true);
    try {
      const payload = {
        cashierName,
        amountPaid: Number(amountPaid),
        items: cart.map(item => ({
          medicineId: item.id,
          qty: item.qty
        }))
      };
      
      const response = await apiCheckout(payload);
      clearCart();
      setAmountPaid(0);
      return { success: true, message: "Transaksi Berhasil!", invoice: response.invoice };
    } catch (err) {
      return { success: false, message: "Checkout Gagal: " + (err.response?.data?.message || err.message) };
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    cashierName,
    setCashierName,
    amountPaid,
    setAmountPaid,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    calculateTotal,
    processCheckout,
    loading
  };
};
