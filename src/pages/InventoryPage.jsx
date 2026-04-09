import React, { useState } from 'react';
import { useMedicines } from '../hooks/useMedicines';
import InventoryHeader from '../components/features/inventory/InventoryHeader';
import MedicineTable from '../components/features/inventory/MedicineTable';
import AddMedicineModal from '../components/features/inventory/AddMedicineModal';
import EditMedicineModal from '../components/features/inventory/EditMedicineModal';

const InventoryPage = () => {
    // State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null);

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
            alert(result.message);
        } else {
            alert(result.message);
        }
    };

    const handleUpdateMedicine = async (id, updatedData) => {
        const result = await updateMedicine(id, updatedData);
        if (result.success) {
            setIsEditModalOpen(false);
            alert(result.message);
        } else {
            alert(result.message);
        }
    };

    const handleDeleteMedicine = async (id) => {
        if (window.confirm("Are you sure you want to delete this medicine?")) {
            const result = await deleteMedicine(id);
            alert(result.message);
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const result = await importMedicines(file);
        alert(result.message);
        e.target.value = null;
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
                onImport={handleImport}
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
                    onDeleteClick={handleDeleteMedicine}
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
        </div>
    );
};

export default InventoryPage;
