
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import appointmentService from'../Services/appointmentService';
import patientService from'../Services/patientService';
import doctorService from'../Services/doctorService';
import'../Styles/AppointmentList.css';
function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterValue, setFilterValue] = useState('');
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [appointmentsData, patientsData, doctorsData] = await Promise.all([
                appointmentService.getAllAppointments(),
                patientService.getAllPatients(),
                doctorService.getAllDoctors(),
            ]);
            setAppointments(appointmentsData);
            setPatients(patientsData);
            setDoctors(doctorsData);
            setError('');
        } catch (err) {
            setError('Failed to load data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = async () => {
        if (filterType === 'all') {
            fetchInitialData();
            return;
        }

        try {
            setLoading(true);
            let data;
            
            switch (filterType) {
                case 'patient':
                    data = await appointmentService.getAppointmentsByPatient(filterValue);
                    break;
                case 'doctor':
                    data = await appointmentService.getAppointmentsByDoctor(filterValue);
                    break;
                case 'date':
                    data = await appointmentService.getAppointmentsByDate(filterValue);
                    break;
                case 'status':
                    data = await appointmentService.getAppointmentsByStatus(filterValue);
                    break;
                default:
                    data = await appointmentService.getAllAppointments();
            }
            
            setAppointments(data);
            setError('');
        } catch (err) {
            setError('Failed to filter appointments');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await appointmentService.updateAppointmentStatus(id, newStatus);
            fetchInitialData(); 
            alert('Status updated successfully!');
        } catch (err) {
            alert('Failed to update status');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await appointmentService.deleteAppointment(id);
                fetchInitialData();
                alert('Appointment deleted successfully!');
            } catch (err) {
                alert('Failed to delete appointment');
                console.error(err);
            }
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'SCHEDULED':
                return 'status-scheduled';
            case 'COMPLETED':
                return 'status-completed';
            case 'CANCELLED':
                return 'status-cancelled';
            case 'NO_SHOW':
                return 'status-noshow';
            default:
                return '';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (timeString) => {
        if (!timeString) return 'N/A';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="appointment-list-container">
            <div className="page-header">
                <div>
                    <h1>Appointment Management</h1>
                    <p className="subtitle">{appointments.length} Total Appointments</p>
                </div>
                <button 
                    className="btn-add"
                    onClick={() => navigate('/appointments/book')}
                >
                    + Book Appointment
                </button>
            </div>

            <div className="filters-section">
                <div className="filter-group">
                    <label>Filter by:</label>
                    <select 
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            setFilterValue('');
                        }}
                    >
                        <option value="all">All Appointments</option>
                        <option value="patient">By Patient</option>
                        <option value="doctor">By Doctor</option>
                        <option value="date">By Date</option>
                        <option value="status">By Status</option>
                    </select>
                </div>

                {filterType === 'patient' && (
                    <div className="filter-group">
                        <select 
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {filterType === 'doctor' && (
                    <div className="filter-group">
                        <select 
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} - {doctor.specialization}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {filterType === 'date' && (
                    <div className="filter-group">
                        <input 
                            type="date"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        />
                    </div>
                )}

                {filterType === 'status' && (
                    <div className="filter-group">
                        <select 
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="SCHEDULED">Scheduled</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                            <option value="NO_SHOW">No Show</option>
                        </select>
                    </div>
                )}

                {filterType !== 'all' && (
                    <button 
                        className="btn-filter"
                        onClick={handleFilterChange}
                        disabled={!filterValue}
                    >
                        Apply Filter
                    </button>
                )}
            </div>

            {loading && <div className="loading">Loading appointments...</div>}
            {error && <div className="error-message">{error}</div>}

            {!loading && !error && (
                <div className="appointments-grid">
                    {appointments.length === 0 ? (
                        <div className="no-data">
                            <p>No appointments found</p>
                        </div>
                    ) : (
                        appointments.map(appointment => (
                            <div key={appointment.id} className="appointment-card">
                                <div className="card-header">
                                    <div className="appointment-id">
                                        Appointment #{appointment.id}
                                    </div>
                                    <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>
                                        {appointment.status}
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="info-row">
                                        <span className="icon">👤</span>
                                        <div>
                                            <div className="label">Patient</div>
                                            <div className="value">{appointment.patient?.name || 'N/A'}</div>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="icon">👨‍⚕️</span>
                                        <div>
                                            <div className="label">Doctor</div>
                                            <div className="value">
                                                {appointment.doctor?.name || 'N/A'}
                                                <span className="spec-tag">
                                                    {appointment.doctor?.specialization}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="icon">📅</span>
                                        <div>
                                            <div className="label">Date & Time</div>
                                            <div className="value">
                                                {formatDate(appointment.appointmentDate)} at {formatTime(appointment.appointmentTime)}
                                            </div>
                                        </div>
                                    </div>

                                    {appointment.reason && (
                                        <div className="info-row">
                                            <span className="icon">📝</span>
                                            <div>
                                                <div className="label">Reason</div>
                                                <div className="value">{appointment.reason}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="card-actions">
                                    <select 
                                        className="status-selector"
                                        value={appointment.status}
                                        onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                                    >
                                        <option value="SCHEDULED">Scheduled</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                        <option value="NO_SHOW">No Show</option>
                                    </select>

                                    <button
                                        className="btn-edit"
                                        onClick={() => navigate(`/appointments/edit/${appointment.id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(appointment.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <div className="footer-actions">
                <button className="btn-back" onClick={() => navigate('/dashboard')}>
                    ← Back to Dashboard
                </button>
            </div>
        </div>
    );
}

export default AppointmentList;