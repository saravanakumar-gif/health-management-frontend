import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import PatientList from './Pages/PatientList';
import PatientForm from'./Pages/PatientForm';

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
    </Routes>
      
    </BrowserRouter>
  );
}

export default App;
