import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import{ToastContainer}from'react-toastify';
import'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import PatientList from './Pages/PatientList';
import PatientForm from'./Pages/PatientForm';
import DoctorForm from './Pages/DoctorForm';
import DoctorList from './Pages/DoctorList';
import AppointmentForm from './Pages/AppointmentForm';
import AppointmentList from'./Pages/AppointmentList';
function App() {
  return (
    <BrowserRouter>
    
     <Routes>
      <Route path='/' element={<Navigate to={'/login'}/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>

      <Route path='/patients' element={<PatientList/>}></Route>
      <Route path='/patients/add' element={<PatientForm/>}></Route>
      <Route path='/patients/edit/:id' element={<PatientForm/>}></Route>

      <Route path='/doctors' element={<DoctorList/>}></Route>
      <Route path='/doctors/add' element={<DoctorForm/>}></Route>
      <Route path='/doctors/edit/:id' element={<DoctorForm/>}></Route>


      <Route path='/appointments' element={<AppointmentList/>}></Route>
      <Route path='/appointments/book' element={<AppointmentForm/>}></Route>
      <Route path='/appointments/edit/:id' element={<AppointmentForm/>}></Route>

    </Routes>
    <ToastContainer position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick rtl={false}
    pauseOnFoucsLoss draggable pasuseOnHover theme={"colored"}/>
      
    </BrowserRouter>
  );
}

export default App;
