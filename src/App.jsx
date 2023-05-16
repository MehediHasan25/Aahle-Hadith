import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom";
import Login from './component/Login'
import Register from './component/Register';
import Details from './component/Details';
import 'react-notifications/lib/notifications.css';
import Test from './component/Test';
import MainLayout from './layout/MainLayout';
import Dashboard from './component/Dashboard';
// import { NotificationContainer } from 'react-notifications';

function App() {


  return (


    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/details" element={<Details/>}/>
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route  path="/test" element={ <MainLayout><Test/></MainLayout>}/>
    </Routes>



    
  )
}

export default App
