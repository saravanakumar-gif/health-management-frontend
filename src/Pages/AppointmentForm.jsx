import React, { useEffect, useReducer } from 'react'
import{data, useNavigate,useParams} from'react-router-dom';
import appointmentService from'../Services/appointmentService';
import patientService from'../Services/patientService';
import doctorService from'../Services/doctorService';
import'../Styles/AppointmentForm.css';

const AppointmentForm = () => {

const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                },
            };
        case 'SET_PATIENTS':
            return { ...state, patients: action.data };
        case 'SET_DOCTORS':
            return { ...state, doctors: action.data };
        case 'SET_FILTERED_DOCTORS':
            return { ...state, filteredDoctors: action.data };
        case 'SET_LOADING':
            return { ...state, loading: action.value };
        case 'SET_ERROR':
            return { ...state, error: action.value };
        case 'LOAD_APPOINTMENT':
            return {
                ...state,
                formData: action.data,
                loading: false,
            };
        default:
            return state;
    }
};

const initialState = {
    formData: {
        patient: { id: '' },
        doctor: { id: '' },
        appointmentDate: '',
        appointmentTime: '',
        reason: '',
        notes: '',
    },
    patients: [],
    doctors: [],
    filteredDoctors: [],
    loading: false,
    error: '',
};

const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [state, dispatch] = useReducer(formReducer, initialState);

    useEffect(() => {
        fetchPatientsAndDoctors();
        if (isEditMode) {
            fetchAppointment();
        }
    }, [id]);

    const fetchPatientsAndDoctors = async () => {
        try {
            const [patientsData, doctorsData] = await Promise.all([
                patientService.getAllPatients(),
                doctorService.getAllDoctors(),
            ]);
            dispatch({ type: 'SET_PATIENTS', data: patientsData });
            dispatch({ type: 'SET_DOCTORS', data: doctorsData });
            dispatch({ type: 'SET_FILTERED_DOCTORS', data: doctorsData });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', value: 'Failed to load patients and doctors' });
        }
    };

    const fetchAppointment = async () => {
        try {
            dispatch({ type: 'SET_LOADING', value: true });
            const data = await appointmentService.getAppointmentById(id);
            
            dispatch({
                type: 'LOAD_APPOINTMENT',
                data: {
                    patient: { id: data.patient.id },
                    doctor: { id: data.doctor.id },
                    appointmentDate: data.appointmentDate,
                    appointmentTime: data.appointmentTime,
                    reason: data.reason || '',
                    notes: data.notes || '',
                },
            });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', value: 'Failed to load appointment' });
        }
    };

    const handleChange = (field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });

        if (field === 'patient') {
            
            dispatch({ type: 'SET_FILTERED_DOCTORS', data: state.doctors });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'SET_ERROR', value: '' });
        dispatch({ type: 'SET_LOADING', value: true });

        
        if (!state.formData.patient.id || !state.formData.doctor.id) {
            dispatch({ type: 'SET_ERROR', value: 'Please select both patient and doctor' });
            dispatch({ type: 'SET_LOADING', value: false });
            return;
        }

        try {
            const appointmentData = {
                patient: { id: parseInt(state.formData.patient.id) },
                doctor: { id: parseInt(state.formData.doctor.id) },
                appointmentDate: state.formData.appointmentDate,
                appointmentTime: state.formData.appointmentTime,
                reason: state.formData.reason,
                notes: state.formData.notes,
            };

            if (isEditMode) {
                await appointmentService.updateAppointment(id, appointmentData);
                alert('Appointment updated successfully!');
            } else {
                await appointmentService.createAppointment(appointmentData);
                alert('Appointment booked successfully!');
            }
            navigate('/appointments');
        } catch (err) {
            dispatch({
                type: 'SET_ERROR',
                value: err.response?.data?.error || 'Operation failed',
            });
        } finally {
            dispatch({ type: 'SET_LOADING', value: false });
        }
    };

    
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };



     return (
        <div className="form-container">
            <div className="form-card appointment-form-card">
                <h1>{isEditMode ? 'Edit Appointment' : 'Book Appointment'}</h1>

                {state.error && <div className="error-message">{state.error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Select Patient *</label>
                        <select
                            value={state.formData.patient.id}
                            onChange={(e) => handleChange('patient', { id: e.target.value })}
                            required
                        >
                            <option value="">Choose a patient...</option>
                            {state.patients.map(patient => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.name} - {patient.phone}
                                </option>
                            ))}
                        </select>
                        {state.patients.length === 0 && (
                            <small className="help-text">
                                No patients found. <span 
                                    className="link" 
                                    onClick={() => navigate('/patients/add')}
                                >
                                    Add a patient first
                                </span>
                            </small>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Select Doctor *</label>
                        <select
                            value={state.formData.doctor.id}
                            onChange={(e) => handleChange('doctor', { id: e.target.value })}
                            required
                        >
                            <option value="">Choose a doctor...</option>
                            {state.filteredDoctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name} - {doctor.specialization} (₹{doctor.consultationFee})
                                </option>
                            ))}
                        </select>
                        {state.doctors.length === 0 && (
                            <small className="help-text">
                                No doctors found. <span 
                                    className="link" 
                                    onClick={() => navigate('/doctors/add')}
                                >
                                    Add a doctor first
                                </span>
                            </small>
                        )}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Appointment Date *</label>
                            <input
                                type="date"
                                value={state.formData.appointmentDate}
                                onChange={(e) => handleChange('appointmentDate', e.target.value)}
                                min={getMinDate()}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Appointment Time *</label>
                            <input
                                type="time"
                                value={state.formData.appointmentTime}
                                onChange={(e) => handleChange('appointmentTime', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Reason for Visit *</label>
                        <textarea
                            value={state.formData.reason}
                            onChange={(e) => handleChange('reason', e.target.value)}
                            placeholder="Describe the reason for appointment..."
                            rows="3"
                            
                        />
                    </div>

                    <div className="form-group">
                        <label>Additional Notes</label>
                        <textarea
                            value={state.formData.notes}
                            onChange={(e) => handleChange('notes', e.target.value)}
                            placeholder="Any additional information..."
                            rows="2"
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => navigate('/appointments')}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn-submit" 
                            disabled={state.loading}
                        >
                            {state.loading 
                                ? 'Saving...' 
                                : isEditMode 
                                ? 'Update Appointment' 
                                : 'Book Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AppointmentForm