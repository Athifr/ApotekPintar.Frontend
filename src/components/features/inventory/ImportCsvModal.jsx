import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ImportCsvModal = ({ isOpen, onClose, onImport }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [importState, setImportState] = useState('idle'); // idle | loading | success | error
    const [resultMessage, setResultMessage] = useState('');
    const fileInputRef = useRef(null);

    const resetState = () => {
        setSelectedFile(null);
        setIsDragging(false);
        setImportState('idle');
        setResultMessage('');
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const validateFile = (file) => {
        if (!file) return false;
        const extension = file.name.split('.').pop().toLowerCase();
        if (extension !== 'csv') {
            setImportState('error');
            setResultMessage('Format file tidak valid. Hanya file .csv yang diterima.');
            return false;
        }
        return true;
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
            setImportState('idle');
            setResultMessage('');
        }
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && validateFile(file)) {
            setSelectedFile(file);
            setImportState('idle');
            setResultMessage('');
        }
    }, []);

    const handleUpload = async () => {
        if (!selectedFile) return;

        setImportState('loading');
        setResultMessage('');

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const result = await onImport(formData);

            if (result.success) {
                setImportState('success');
                setResultMessage(result.message || 'Import berhasil!');
            } else {
                setImportState('error');
                // Check if it's a 400 error for header mismatch
                if (result.status === 400) {
                    setResultMessage(
                        'Format header CSV tidak sesuai. Pastikan file CSV memiliki kolom: NAMA OBAT, HARGA JUAL, STOK AKHIR, SKU/NO.BATCH, dan ED.'
                    );
                } else {
                    setResultMessage(result.message || 'Import gagal. Silakan coba lagi.');
                }
            }
        } catch (err) {
            setImportState('error');
            setResultMessage('Terjadi kesalahan saat mengimport. Silakan coba lagi.');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="import-csv-modal">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                <Upload size={22} className="text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Import Data Obat</h2>
                                <p className="text-sm text-teal-100 mt-0.5">Upload file CSV untuk import data</p>
                            </div>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                            id="import-csv-close-btn"
                        >
                            <X size={20} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Drag & Drop Zone */}
                    {importState !== 'success' && (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                                transition-all duration-300 ease-in-out group
                                ${isDragging
                                    ? 'border-teal-500 bg-teal-50 scale-[1.02]'
                                    : 'border-gray-300 hover:border-teal-400 hover:bg-gray-50'
                                }
                                ${importState === 'loading' ? 'pointer-events-none opacity-60' : ''}
                            `}
                            id="csv-drop-zone"
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".csv"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="csv-file-input"
                            />

                            <div className={`
                                mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4
                                transition-all duration-300
                                ${isDragging
                                    ? 'bg-teal-100 text-teal-600 scale-110'
                                    : 'bg-gray-100 text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-500'
                                }
                            `}>
                                <Upload size={28} />
                            </div>

                            <p className="text-gray-700 font-semibold mb-1">
                                {isDragging ? 'Lepaskan file di sini...' : 'Drag & drop file CSV di sini'}
                            </p>
                            <p className="text-sm text-gray-400">
                                atau <span className="text-teal-600 font-medium underline">klik untuk memilih file</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-3">
                                Hanya menerima file .csv
                            </p>
                        </div>
                    )}

                    {/* Selected File Info */}
                    {selectedFile && importState !== 'success' && (
                        <div className="mt-4 flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="p-2 bg-teal-100 rounded-lg">
                                <FileText size={20} className="text-teal-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-800 truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                            </div>
                            {importState !== 'loading' && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                        setImportState('idle');
                                        setResultMessage('');
                                    }}
                                    className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    <X size={16} className="text-gray-400" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Expected Columns Info */}
                    {importState === 'idle' && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                            <p className="text-xs font-semibold text-blue-700 mb-1.5">📋 Kolom yang diharapkan:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {['NAMA OBAT', 'HARGA JUAL', 'STOK AKHIR', 'SKU / NO.BATCH', 'ED'].map((col) => (
                                    <span
                                        key={col}
                                        className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-md"
                                    >
                                        {col}
                                    </span>
                                ))}
                            </div>
                            <p className="text-xs text-blue-500 mt-2">
                                Kirimkan file CSV asli tanpa modifikasi. Format mata uang dan tanggal akan diproses otomatis oleh server.
                            </p>
                        </div>
                    )}

                    {/* Loading State */}
                    {importState === 'loading' && (
                        <div className="mt-6 flex flex-col items-center gap-3 py-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
                                <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>
                            </div>
                            <p className="text-sm font-medium text-gray-600">Sedang mengimport data...</p>
                            <p className="text-xs text-gray-400">Mohon tunggu, jangan tutup halaman ini</p>
                        </div>
                    )}

                    {/* Success State */}
                    {importState === 'success' && (
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center animate-bounce-in">
                                <CheckCircle size={36} className="text-green-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-gray-800">Import Berhasil! 🎉</p>
                                <p className="text-sm text-gray-500 mt-1">{resultMessage}</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {importState === 'error' && (
                        <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-700">Import Gagal</p>
                                <p className="text-sm text-red-600 mt-1">{resultMessage}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex gap-3">
                    {importState === 'success' ? (
                        <button
                            onClick={handleClose}
                            className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl
                                       hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-teal-500/25"
                            id="import-csv-done-btn"
                        >
                            Selesai
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleClose}
                                className="flex-1 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl
                                           hover:bg-gray-50 transition-all duration-300"
                                disabled={importState === 'loading'}
                                id="import-csv-cancel-btn"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || importState === 'loading'}
                                className={`
                                    flex-1 py-3 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2
                                    ${selectedFile && importState !== 'loading'
                                        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:from-teal-700 hover:to-emerald-700 shadow-lg shadow-teal-500/25'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }
                                `}
                                id="import-csv-upload-btn"
                            >
                                {importState === 'loading' ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Mengimport...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} />
                                        Upload & Import
                                    </>
                                )}
                            </button>
                        </>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes bounce-in {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
                }
            `}</style>
        </div>
    );
};

export default ImportCsvModal;
