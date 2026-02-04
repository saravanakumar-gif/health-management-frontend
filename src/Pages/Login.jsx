import React, { useState } from 'react'
import{useNavigate} from'react-router-dom';
import authService from '../Services/authService';
import'../Styles/Auth.css';
const Login = () => {


    const[email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const[error,setError]=useState('');
    const[loading,setLoading]=useState(false);
    const navigate= useNavigate();


const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    setLoading(true);

    try{
        const response=await authService.login({email,password});
        if(response.success){
            localStorage.setItem('user',JSON.stringify(response.user));
            navigate('/dashboard');
        }
    }catch(err){
        setError('Login failed. Please try again.');
        console.error(err);
    }finally{
        setLoading(false);
    }

};



  return (
    <div className='auth-container'>
        <div className='auth-card'>
            <h1>Health Management System</h1>
            <h2>Login</h2>

            {error&&<div className='error-message'>{error}</div>}
            <form onSubmit={handleSubmit}>


                <div className='form-group'>
                    <label htmlFor="eamil">Email</label>
                    <input type="email" value={email} placeholder='Enter Your email' required   onChange={(e)=>setEmail(e.target.value)}/>
                </div>


                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input type="password"  value={password}  placeholder='Enter Your password' required    onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <button type='submit' disabled={loading} className='btn-primary'>{loading?'Logging in...':'Login'}</button>
            </form>

            <p className='auth-footer'> Don't have an account?{' '} 
                <span onClick={()=>navigate('/register')} className='link'>Register here</span>
            </p>


        </div>
    </div>
  )
}

export default Login