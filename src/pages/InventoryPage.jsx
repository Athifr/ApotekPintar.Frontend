import React, { useState } from 'react';
import { useMedicines } from '../hooks/useMedicines';
import InventoryHeader from '../components/features/inventory/InventoryHeader';
import MedicineTable from '../components/features/inventory/MedicineTable';
import AddMedicineModal from '../components/features/inventory/AddMedicineModal';
import EditMedicineModal from '../components/features/inventory/EditMedicineModal';
import ImportCsvModal from '../components/features/inventory/ImportCsvModal';
import ToastNotification from '../components/ui/ToastNotification';
import ConfirmDialog from '../components/ui/ConfirmDialog';

const InventoryPage = () => {
    // State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

    // Toast state
    const [toast, setToast] = useState({ visible: false, type: 'info', title: '', message: '' });

    // Confirm dialog state
    const [confirmDialog, setConfirmDialog] = useState({ visible: false, id: null, name: '' });

    const showToast = (type, title, message, duration = 3000) => {
        setToast({ visible: true, type, title, message, duration });
    };

    const hideToast = () => {
        setToast(prev => ({ ...prev, visible: false }));
    };

    // Custom Hooks
    const {
        medicines,
        loading,
        error,
        addMedicine,
        updateMedicine,
        deleteMedicine,
        importMedicines,
        searchMedicines
    } = useMedicines();

    // Handlers
    const handleAddMedicine = async (newMedicine) => {
        const result = await addMedicine(newMedicine);
        if (result.success) {
            setIsAddModalOpen(false);
            showToast('success', 'Berhasil! ✅', 'Obat baru berhasil ditambahkan ke inventaris.');
        } else {
            showToast('error', 'Gagal Menambahkan', result.message);
        }
    };

    const handleUpdateMedicine = async (id, updatedData) => {
        const result = await updateMedicine(id, updatedData);
        if (result.success) {
            setIsEditModalOpen(false);
            showToast('success', 'Update Berhasil! ✅', 'Data obat berhasil diperbarui.');
        } else {
            showToast('error', 'Gagal Update', result.message);
        }
    };

    const handleDeleteClick = (id, name) => {
        setConfirmDialog({ visible: true, id, name });
    };

    const handleConfirmDelete = async () => {
        const { id } = confirmDialog;
        setConfirmDialog({ visible: false, id: null, name: '' });

        const result = await deleteMedicine(id);
        if (result.success) {
            showToast('success', 'Obat Dihapus! 🗑️', 'Data obat berhasil dihapus dari inventaris.');
        } else {
            showToast('error', 'Gagal Menghapus', result.message);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDialog({ visible: false, id: null, name: '' });
    };

    const handleImport = async (formData) => {
        return await importMedicines(formData);
    };

    const handleSearch = (query) => {
        searchMedicines(query);
    };

    const openEditModal = (medicine) => {
        setSelectedMedicine(medicine);
        setIsEditModalOpen(true);
    };

    return (
        <div className="animate-fade-in">
            <InventoryHeader
                onImportClick={() => setIsImportModalOpen(true)}
                onAddClick={() => setIsAddModalOpen(true)}
                onSearch={handleSearch}
            />

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                </div>
            ) : (
                <MedicineTable
                    medicines={medicines}
                    onEditClick={openEditModal}
                    onDeleteClick={handleDeleteClick}
                />
            )}

            {/* Modals */}
            <AddMedicineModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddMedicine}
            />

            <EditMedicineModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onUpdate={handleUpdateMedicine}
                medicine={selectedMedicine}
            />

            <ImportCsvModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImport={handleImport}
            />

            {/* Toast Notification */}
            <ToastNotification
                isVisible={toast.visible}
                type={toast.type}
                title={toast.title}
                message={toast.message}
                duration={toast.duration}
                onClose={hideToast}
            />

            {/* Confirm Delete Dialog */}
            <ConfirmDialog
                isVisible={confirmDialog.visible}
                title="Hapus Obat"
                message={`Apakah Anda yakin ingin menghapus "${confirmDialog.name}" dari inventaris? Tindakan ini tidak dapat dibatalkan.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default InventoryPage;
