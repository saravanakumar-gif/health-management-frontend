import React, { useState } from 'react';
import{useNavigate}from'react-router-dom';
import authService from'../Services/authService';
import'../Styles/Auth.css';

const Register = () => {
    
    const[formData,setFormData]=useState({

        name:'',
        email:'',
        phone:'',
        age:'',
        gender:'Male',
        address:'',
    });

    const[error,setError]=useState('');
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value,
        });
    };
    

     const handleSubmit=async (e)=>{
        e.preventDefault();
        setError('');
        setLoading(true);
    
    try{
        await authService.register(formData);
        alert('Registration successful! please login.');
        navigate('/login');
    }catch (err){
        setError('Registration failed. please try again.');
        console.error(err);
    }finally{
        setLoading(false);
    }

    }





  return (
    <div className='auth-container'>
        <div className='auth-card'>
            <h1>Health Management System</h1>
            <h2>Register</h2>

            {error&&<div className='error-message'>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name='name'  value={formData.name} onChange={handleChange}   placeholder='Enter Your full name' required/>
                </div>


                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={formData.email}   onChange={handleChange}        placeholder='Enter Your email' required />
                </div>


                <div className='form-group'>
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" name='phone' value={formData.phone} onChange={handleChange} placeholder='Enter your phone number' required/>
                </div>

                <div className='form-row'>
                    <div className='form-group'>
                        <label htmlFor="">Age</label>
                        <input type="number" name='age' value={formData.age} onChange={handleChange} placeholder='Age' />
                    </div>
                </div>

                <div className='form-group'>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>


                <div   className='form-group'>
                    <label htmlFor="">Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder='Enter your address' rows='3'></textarea>
                     
                </div>

                <button type='submit' disabled={loading} className='btn-primary'>{loading?'Registering...':'Register'}</button>

            </form>

            <p className='auth-footer'>
                Already have an account?{''}
                <span onClick={()=>navigate('/login')} className='link'>Login here</span>

            </p>





        </div>
    </div>
  )
}

export default Register