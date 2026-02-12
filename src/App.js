<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
      
    </BrowserRouter>
>>>>>>> a2e65dde3f7fa0653cb823605088f35908b2045f
  );
}

export default App;
