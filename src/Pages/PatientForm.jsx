import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import patientService from'../Services/patientService';
import'../Styles/PatientForm.css';

const PatientForm = () => {


    const{id}=useParams();
    const navigate=useNavigate();
    const isEditMode=Boolean(id);

    const[formData,setFormData]=useState({
        name:'',
        age:'',
        gender:'Male',
        phone:'',
        address:'',
    });
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState('');

    useEffect(()=>{
        if(isEditMode){
            fetchPatient();
        }
    },[id]);

    const fetchPatient=async ()=>{
        try{
            setLoading(true);
            const data=await patientService.getPatientById(id);
            setFormData({
                name:data.name,
                age:data.age||'',
                gender:data.gender||'Male',
                phone:data.phone,
                address:data.address||'',
            });
        }
        catch (err){
            setError('Failed to load patient details');
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    };

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            if(isEditMode){
                await patientService.updatePatient(id,formData);
                alert('Patient updated successfully!')
            }
            else{
                await patientService.createPatient(formData);
                alert('Patient created successfully!')
            }
            navigate('/patients');
        }
        catch (err){
            setError(err.response?.data?.error ||'Operation failed');
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }









  return (
    <div className='form-container'>
        <div className='form-card'>
            <h1> {isEditMode ?'Edit Patient' :'Add New Patient'}</h1>
            {error&& <div className='error-message'>{error}</div>}

            <form onSubmit={handleSubmit}>

                <div className='form-group'>
                    <label htmlFor="name">Full Name</label>
                
                        <input type="text" name='name'placeholder='Enter patient name' required  value={formData.name} onChange={handleChange} />
                   </div>


                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor="age">Age</label>
                        <input type="number"  name='age' placeholder='Age' min='0' max='150'  value={formData.age} onChange={handleChange}/>
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender"  value={formData.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" name='phone' placeholder='Enter phone number' required  value={formData.phone} onChange={handleChange}/>
                </div>


                <div className='form-group'>
                    <label htmlFor="address">Address</label>
                    <textarea name="address" placeholder='Enter address' rows='3' value={formData.address} onChange={handleChange}/>
                </div>

                <div className='form-actions'>
                    <button type='button' className='btn-cancel' onClick={()=>Navigate('/patients')}>cancel</button>
                    <button type='submit' className='btn-submit' disabled={loading}>{loading ?'Saving...':isEditMode ?'Update Patient':'Add Patient'}</button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default PatientForm