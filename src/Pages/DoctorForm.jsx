import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import doctorService from'../Services/doctorService';
import'../Styles/DoctorForm.css';


const DoctorForm = () => {

  const {id}=useParams();
  const navigate=useNavigate();
  const isEditMode=Boolean(id);

  const[formData,setFormData]=useState({
    name:'',
    specialization:'',
    qualification:'',
    experience:'',
    phone:'',
    email:'',
    consultationFee:''
  });

  const[loading,setLoading]=useState(false);
  const[error,setError]=useState('');

  const specializations=[
        'Cardiology',
        'Dermatology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'General Medicine',
        'Gynecology',
        'Psychiatry',
        'ENT',
        'Ophthalmology',
        'Other',
  ];

  useEffect(()=>{
    if(isEditMode){
        fetchDoctor();
    }
  },[id]);

  const fetchDoctor=async()=>{
    try{
        setLoading(true);
        const data=await doctorService.getDoctorById(id);
        setFormData({
            name:data.name,
            specialization:data.specialization,
            qualification:data.qualification || '',
            experience:data.experience ||'',
            phone:data.phone,
            email:data.email||'',
            consultationFee: data.consultationFee ||'',
        });
    } catch (err){
        setError('Failed to load doctor details')
        console.error(err);
    }finally{
        setLoading(false);
    }
  };

  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value,
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);

    try{
        if(isEditMode){
            await doctorService.updateDoctor(id,formData);
            alert('Doctor updated successfully!');
        }else{
            await doctorService.createDoctor(formData);
            alert('Doctor created successfully!')
        }
        navigate('/doctors');
    }catch(err){
        setError(err.response?.data?.error||'OPeration failed');
        console.error(err);
    }finally{
        setLoading(false);
    }

  };


  return (
    <div className='form-container'>
        <div className='form-card doctor-form-card'>
            <h1>{isEditMode ?'Edit Doctor':'Add New Doctor'}</h1>
            {error && <div className='error-message'>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="">Doctor Name</label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Dr.John Smith' required />
                </div>

                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor="">Specialization</label>
                        <select name="specialization" value={formData.specialization} onChange={handleChange} required>
                            <option value="">Select Specialization</option>
                            {specializations.map(spec=>(<option key={spec} value={spec}>{spec}</option>))}
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="">Qualification</label>
                        <input type="text" name='qualification' value={formData.qualification} onChange={handleChange} placeholder='MBBS,MD' />
                    </div>
                </div>

                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor="">Experience(Years)</label>
                        <input type="number" name='experience' value={formData.experience} onChange={handleChange} placeholder='10' min='0' max='50' />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="">Consultation Fee (₹)</label>
                        <input type="number" name='consultationFee' value={formData.consultationFee} onChange={handleChange} placeholder='1000' min='0' step='100' />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor="">Phone Number</label>
                    <input type="tel" name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone Number' required />
                </div>

                <div className='form-group'>
                    <label htmlFor="">Email Address</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='doctor@hospital.com' />
                </div>

                <div className='form-actions'>
                    <button type='button' className='btn-cancel' onClick={()=>navigate('/doctors')}>Cancel</button>
                    <button type='submit' className='btn-submit' disabled={loading}>{loading?'Saving...':isEditMode?'Update Doctor':'Add Doctor'}</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default DoctorForm