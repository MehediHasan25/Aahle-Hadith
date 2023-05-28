import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Routes,Route} from "react-router-dom";
import Login from './component/Login'
import Register from './component/Register';
import Details from './component/Details';
import 'react-notifications/lib/notifications.css';
// import Test from './component/Test';
import MainLayout from './layout/MainLayout';
import Dashboard from './component/Dashboard';
import Division from './component/user/basicSetup/Division';
import District from './component/user/basicSetup/District';
import Upazila from './component/user/basicSetup/Upazila';
import Mosque from './component/user/basicSetup/Mosque';
import DonarEnrollment from './component/user/basicSetup/DonarEnrollment';
import Occupation from './component/user/basicSetup/Occupation';
import Education from './component/user/basicSetup/Education';
import DonationAmount from './component/user/basicSetup/DonationAmount';
import UpdateDataEnrollment from './component/Enrollment/UpdateDataEnrollment';
import toast, { Toaster } from 'react-hot-toast';
import DonarPayment from './component/user/basicSetup/DonarPayment';
import DonarPaymentList from './component/user/basicSetup/DonarPaymentList';

///import UpazilaDistrict from './component/Enrollment/UpazilaDistrict';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';





function App() {


  return (
<>

    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/details" element={<Details/>}/>
      <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route  path="/division" element={ <MainLayout><Division/></MainLayout>}/>
      <Route  path="/district" element={ <MainLayout><District/></MainLayout>}/>
      <Route  path="/upazila" element={ <MainLayout><Upazila/></MainLayout>}/>
      <Route  path="/mosque" element={ <MainLayout><Mosque/></MainLayout>}/>
      <Route  path="/donar" element={ <MainLayout><DonarEnrollment/></MainLayout>}/>
      <Route  path="/donar-update" element={ <MainLayout><UpdateDataEnrollment/></MainLayout>}/>
      <Route  path="/occupation" element={ <MainLayout><Occupation/></MainLayout>}/>
      <Route  path="/education" element={ <MainLayout><Education/></MainLayout>}/>
      <Route  path="/donation-amount" element={ <MainLayout><DonationAmount/></MainLayout>}/>
      <Route  path="/donar-payment" element={ <MainLayout><DonarPayment/></MainLayout>}/>
      <Route  path="/donar-payment-list" element={ <MainLayout><DonarPaymentList/></MainLayout>}/>
    </Routes>
    {/* <ToastContainer  closeButton={false}/> */}
    <Toaster />
    </>
    
  )
}

export default App
