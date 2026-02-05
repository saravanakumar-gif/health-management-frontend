import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import'../Styles/Dashboard.css';
import appointmentService from '../Services/appointmentService';
import patientService from '../Services/patientService';
import doctorService from '../Services/doctorService';
const Dashboard = () => {

    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user')||'{}');
    const[stats,setStats]=useState({
        totalPatients:0,
        totalDoctors:0,
        totalAppointments:0,
        todayAppointments:0
    });


    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        fetchStats();
    },[]);

    const fetchStats=async ()=>{
        try{
            const[patients,doctors,appointments]=await Promise.all([
                patientService.getAllPatients(),
                doctorService.getAllDoctors(),
                appointmentService.getAllAppointments()
            ]);
            const today=new Date().toISOString().split('T')[0];
            const todayAppts=appointments.filter(
                apt=>apt.appointmentDate===today
            );
            setStats({
                totalPatients:patients.length,
                totalDoctors:doctors.length,
                todayAppointments:appointments.length,
                totalAppointments:todayAppts.length

            })
        } catch (err){
            console.error('Failed to fetch stats:',err);
        }finally{
            setLoading(false);
        }
    }
    const handleLogout=()=>{
        localStorage.removeItem('user');
        navigate('/login');
    }



  return (

 <div className="dashboard">
            <header className="dashboard-header">
                <h1>Health Management System</h1>
                <div className="user-info">
                    <span>Welcome, {user.name || 'User'}!</span>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <h2>Dashboard</h2>
                
                {loading ? (
                    <p>Loading statistics...</p>
                ) : (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>Total Patients</h3>
                            <p className="stat-number">{stats.totalPatients}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Doctors</h3>
                            <p className="stat-number">{stats.totalDoctors}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Appointments Today</h3>
                            <p className="stat-number">{stats.todayAppointments}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Appointments</h3>
                            <p className="stat-number">{stats.totalAppointments}</p>
                        </div>
                    </div>
                )}

                <div className="quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="action-buttons">
                        <button onClick={() => navigate('/patients')} className="action-btn">
                            📋 Manage Patients
                        </button>
                        <button onClick={() => navigate('/doctors')} className="action-btn">
                            👨‍⚕️ Manage Doctors
                        </button>
                        <button onClick={() => navigate('/appointments')} className="action-btn">
                            📅 Appointments
                        </button>
                    </div>
                </div>
            </div>
        </div>     
  )
}

export default Dashboard