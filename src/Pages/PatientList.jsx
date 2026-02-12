import React, { useEffect, useState } from 'react'
import{useNavigate}from'react-router-dom';
import patientService from'../Services/patientService';
import'../Styles/PatientList.css';


const PatientList = () => {

    const[patients,setPatients]=useState([]);
    const[loading,setLoading]=useState(true);
    const[error, setError]=useState('');
    const[searchTerm,setSearchTerm]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        fetchPatients();
    },[]);

    const fetchPatients=async()=>{
        try{
            setLoading(true);
            const data=await patientService.getAllPatients();
            setPatients(data);
            setError('');
        }
        catch (err){
            setError('Failed to load patients');
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    };

    const handleDelete=async(id)=>{
        if(window.confirm('Are you sure you want to delete this patient?')){
            try{
                await patientService.deletePatient(id);
                fetchPatients();
                alert('Patient deleted successfully!');
            }
            catch(err){
                alert('Failed to delete patient');
                console.error(err);
            }
        }
    };


    const filteredPatients=patients.filter(patient=> patient.name.toLowerCase().includes(searchTerm.toLowerCase())||
    (patient.phone && patient.phone.includes(searchTerm))

);



    return (
    <div className='patient-list-container'>
        <div className='page-header'>
            <h1>Patient Management</h1>
            <button className='btn-add' onClick={()=>navigate('/patients/add')}>+ Add New Patient</button>
        </div>

        <div className='search-box'>
            <input type="text" placeholder='Search by name or phone...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>


        {loading&&<div className='loading'>Loading patients...</div>}
        {error && <div className='error-message'>{error}</div>}


        {! loading && !error &&(

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
                        {filteredPatients.length===0 ?(
                            <tr>
                                <td colSpan='7' style={{textAlign:'center',padding:'40px'}}>No patients found</td>
                            </tr>
                        ):(

                            filteredPatients.map(patient=>(
                                <tr key={patient.id}>
                                    <td>{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.age || 'N/A'}</td>
                                    <td>{patient.gender || 'N/A'}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.address || 'N/A'}</td>
                                    <td className='actions'>
                                        <button className='btn-edit' onClick={()=>navigate(`/patients/edit/${patient.id}`)}>Edit</button>
                                        <button className='btn-delete' onClick={()=>handleDelete(patient.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        )}

        <div className='footer-actions'>
            <button className='btn-back' onClick={()=> navigate('/dashboard')}>
                Back to Dashboard
            </button>
        </div>








    </div>
  )
};

export default PatientList