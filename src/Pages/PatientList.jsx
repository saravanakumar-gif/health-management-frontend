import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import patientService from '../Services/patientService';
import LoadingSpinner from '../Components/LoadingSpinner';
import ConfirmModal from '../Components/ConfirmModal';
import EmptyState from '../Components/EmptyState';
import Pagination from '../Components/Pagination';
import { exportToExcel } from '../utils/exportToExcel';
import '../Styles/PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const data = await patientService.getAllPatients();
            setPatients(data);
            setError('');
        } catch (err) {
            setError('Failed to load patients');
            toast.error('Failed to load patients');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (patient) => {
        setPatientToDelete(patient);
        setShowDeleteModal(true);
    };

    const confirmDelete = async (id) => {
        try {
            await patientService.deletePatient(patientToDelete.id);
            await fetchPatients();
            toast.success('Patient and associated appointments deleted successfully!');
        } catch (err) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Failed to delete patient';
            toast.error(errorMessage);
            console.error(err);
        } finally {
            setShowDeleteModal(false);
            setPatientToDelete(null);
        }
    };

    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (patient.phone && patient.phone.includes(searchTerm))
    );

    const handleExport = () => {
        const exportData = patients.map(p => ({
            ID: p.id,
            Name: p.name,
            Age: p.age,
            Gender: p.gender,
            Phone: p.phone,
            Address: p.address
        }));
        exportToExcel(exportData, 'patients');
        toast.success('Exported to Excel!');
    };

    const handlePrint = () => {
        window.print();
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

    return (
        <div className='patient-list-container'>
            <div className='page-header'>
                <div>
                    <h1>Patient Management</h1>
                    <p className='subtitle'>{patients.length} Total Patients</p>
                </div>
                <div className='header-actions'>
                    <button className='btn-export' onClick={handleExport}>
                        📊 Export
                    </button>
                    <button className='btn-print' onClick={handlePrint}>
                        🖨️ Print
                    </button>
                    <button className='btn-add' onClick={() => navigate('/patients/add')}>
                        + Add New Patient
                    </button>
                </div>
            </div>

            <div className='search-box'>
                <input 
                    type="text" 
                    placeholder='🔍 Search by name or phone...' 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading && <LoadingSpinner message="Loading patients..." />}
            {error && <div className='error-message'>{error}</div>}

            {!loading && !error && (
                filteredPatients.length === 0 ? (
                    <EmptyState
                        icon="👥"
                        title="No Patients Found"
                        message={searchTerm ? "No patients match your search" : "Start by adding your first patient to the system"}
                        actionLabel={!searchTerm ? "Add Patient" : undefined}
                        onAction={!searchTerm ? () => navigate('/patients/add') : undefined}
                    />
                ) : (
                    <>
                        <div className='table-container'>
                            <table className='patient-table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentPatients.map(patient => (
                                        <tr key={patient.id}>
                                            <td>{patient.id}</td>
                                            <td className='patient-name'>
                                                <strong>{patient.name}</strong>
                                            </td>
                                            <td>{patient.age || 'N/A'}</td>
                                            <td>{patient.gender || 'N/A'}</td>
                                            <td>{patient.phone}</td>
                                            <td>{patient.address || 'N/A'}</td>
                                            <td className='actions'>
                                                <button 
                                                    className='btn-edit' 
                                                    onClick={() => navigate(`/patients/edit/${patient.id}`)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button 
                                                    className='btn-delete' 
                                                    onClick={() => handleDeleteClick(patient)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )
            )}

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete Patient"
                message={`Are you sure you want to delete ${patientToDelete?.name}? This will also delete all their appointments.`}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

            <div className='footer-actions'>
                <button className='btn-back' onClick={() => navigate('/dashboard')}>
                    ← Back to Dashboard
                </button>
            </div>

            <style>{`
                @media print {
                    .btn-add, .btn-export, .btn-print, 
                    .search-box, .footer-actions, 
                    .btn-edit, .btn-delete, .header-actions {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default PatientList;