import React from 'react'
import { useNavigate } from 'react-router-dom';
import'../Styles/Dashboard.css';
const Dashboard = () => {

    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user')||'{}');

    const handleLogout=()=>{
        localStorage.removeItem('user');
        navigate('/login');
    }

  return (


    
    <div className='dashboard'>

        <header className='dashboard-header'>
            <h1>Health Management System</h1>
            <div className='user-info'>
                <span>Welcome, {user.name || 'User'}!</span>
                <button onClick={handleLogout} className='btn-logout'>Logout</button>
            </div>
        </header>
         <div className='quick-actions'>
            <h3>Quick Actions</h3>
            <div className='action-buttons'>
                <button onClick={()=>navigate('/patients')} className='action-btn'>📋Manage Patients</button>
                <button onClick={()=>navigate('/doctors')} className='action-btn'>👨‍⚕️Manage Doctors</button>
                <button onClick={()=>navigate('/appointments')} className='action-btn'>📅Appointments</button>
            </div>
        </div>


        <div className='dashboard-content'>
            <h2>Dashboard</h2>
            <div className='stats-grid'>
                <div className='stat-card'>
                    <h3>Total Patients</h3>
                    <p className='stat-number'>0</p>
                </div>
                <div className='stat-card' >
                    <h3>Total Doctors</h3>
                    <p className='stat-number'>0</p>
                </div>
                <div className='stat-card'>
                    <h3>Appointments Today</h3>
                    <p className='stat-number'>0</p>
                </div>

                <div className='stat-card'>
                    <h3>Total Appointments</h3>
                    <p className='stat-number'>0</p>
                </div>
            </div>
            <p style={{marginTop:'30px', textAlign:'center',color:'#666'}}>More features coming soon!</p>

        </div>
    </div>
  )
}

export default Dashboard