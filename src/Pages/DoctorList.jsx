import React, { useEffect, useState } from 'react'
import{useNavigate}from'react-router-dom';
import doctorService from'../Services/doctorService';
import'../Styles/DoctorList.css';

const DoctorList = () => {

    const[doctors, setDoctors]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error,setError]=useState('');
    const[searchTerm,setSearchTerm]=useState('');
    const[filterSpecialization,setFilterSpecialization]=useState('All');
    const navigate=useNavigate();

    useEffect(()=>{
        fetchDoctors();
    },[]);

    const fetchDoctors=async()=>{
        try{
            setLoading(true);
            const data =await doctorService.getAllDoctors();
            setDoctors(data);
            setError('');
        }catch (err){
            setError('Failed to load doctors');
            console.error(err);
        }finally{
            setLoading(false);
        }
    };

    const handleDelete=async (id)=>{
        if(window.confirm('Are you sure you want to delete this doctro')){
            try{
                await doctorService.deleteDoctor(id);
                fetchDoctors();
                alert('Doctor deleted successfully!');
            }catch (err){
                alert('Failed to delete doctor');
                console.error(err);
            }
        }
    };

    const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];
    
    const filteredDoctors=doctors.filter(doctor=>{

        const matchesSearch=doctor.name.toLowerCase().includes(searchTerm.toLowerCase())||
        doctor.sepecialization.toLowerCase().includes(searchTerm.toLowerCase())||(doctor.phone&&doctor.phone.includes(searchTerm));


       const matchesFilter= filterSpecialization==='All'||doctor.sepecialization===filterSpecialization;

       return matchesSearch&&matchesFilter;


    });




  return (
    <div className='doctor-list-container'>
        <div className='page-header'>
            <div>
                <h1>Doctor Management</h1>
                <p className='subtitle'>{DoctorList.length} Doctors • {specializations.length-1} Specializations</p>
            </div>
            <button className='btn-add' onClick={()=>navigate('/doctors/add')}>+Add New Doctor</button>
        </div>
        <div className='filters-section'>
            <div className='search-box'>
                <input type="text" placeholder='Search by name, specialization, or phone...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
            </div>


            <div className='filter-box'>
                <label htmlFor="">Filter by Specialization:</label>
                <select value={filterSpecialization} onChange={(e)=>setFilterSpecialization(e.target.value)}>
                    {specializations.map(spec=>(<option key={spec} value={spec}>{spec}</option>))}
                </select>
            </div>
        </div>

        {loading&&<div className='loading'>Loading doctors...</div>}
        {error&&<div className='error-message'>{error}</div>}

        {!loading && !error &&(
            <div className='doctors-grid'>
                {filteredDoctors.length===0 ?(
                    <div className='no-data'> <p>No doctors found</p></div>
                ):(
                    filteredDoctors.map(doctor=>(
                        <div key={doctor.id} className='doctor-card'>
                            <div className='doctor-header'>
                                <div className='doctor-avatar'>
                                    👨‍⚕️
                                </div>
                                <div className='doctor-info'>
                                    <h3>{doctor.name}</h3>
                                    <span className='specialization-badge'>
                                        {doctor.sepecialization}
                                    </span>
                                </div>
                            </div>

                            <div className='doctor-details'>
                                <div className='detail-item'>
                                    <span className='label'>Qualification:</span>
                                    <span className='value'>{doctor.qualification||'N/A'}</span>
                                </div>
                                <div className='detail-item'>
                                    <span className='label'>Phone:</span>
                                    <span className='value'>{doctor.phone}</span>
                                </div>

                                <div className='detail-item'>
                                    <span className='label'>Email:</span>
                                    <span className='value'>{doctor.email||'N/A'}</span>
                                </div>

                                <div className='detail-item'>
                                    <span className='label'>Consultation Fee:</span>
                                    <span className='value fee'>₹{doctor.consultationFee || 0}</span>
                                </div>
                            </div>


                            <div className='doctor-actions'>
                                <button className='btn-edit' onClick={()=>navigate (`/doctors/edit/${doctor.id}`)}>Edit</button>
                                <button className='btn-delete' onClick={()=>handleDelete(doctor.id)}>Delete</button>
                            </div>

                             </div>
                    ))
                )}
            </div>
        )}
        <div className='footer-actions'>
            <button className='btn-back' onClick={()=>navigate('/dashboard')}>← Back to Dashboard</button>
        </div>

    </div>
  )
}

export default DoctorList