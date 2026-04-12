import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Centered confirmation dialog.
 * 
 * Props:
 * - isVisible: boolean
 * - title: string
 * - message: string
 * - onConfirm: () => void
 * - onCancel: () => void
 * - confirmText: string (default: 'Hapus')
 * - cancelText: string (default: 'Batal')
 */
const ConfirmDialog = ({
    isVisible,
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin?',
    onConfirm,
    onCancel,
    confirmText = 'Hapus',
    cancelText = 'Batal',
}) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsShowing(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setIsShowing(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isShowing) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
                    isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onCancel}
            />

            {/* Dialog */}
            <div
                className={`
                    relative max-w-sm w-full bg-white rounded-2xl shadow-2xl overflow-hidden
                    transition-all duration-300 ease-out
                    ${isAnimating
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-90 translate-y-4'
                    }
                `}
            >
                {/* Header with icon */}
                <div className="flex flex-col items-center pt-8 pb-4 px-6">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 text-center">{title}</h3>
                    <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">{message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 px-6 pb-6 pt-2">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl
                                   hover:bg-gray-50 transition-all duration-200"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold rounded-xl
                                   hover:from-red-600 hover:to-rose-600 transition-all duration-200
                                   shadow-lg shadow-red-500/25"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
