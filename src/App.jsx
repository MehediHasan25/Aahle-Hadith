import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom";
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
import DonarPaymentList from './component/user/basicSetup/MonthlyDonarPaymentList';
import PrivateRoute from './component/Protected/PrivateRoute';

///import UpazilaDistrict from './component/Enrollment/UpazilaDistrict';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>

      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        {/* <Route element={<PrivateRoute/>}> */}
          <Route exact path="/details" element={<Details />} />
          <Route exact path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route exact path="/division" element={<MainLayout><Division /></MainLayout>} />
          <Route exact path="/district" element={<MainLayout><District /></MainLayout>} />
          <Route exact path="/upazila" element={<MainLayout><Upazila /></MainLayout>} />
          <Route exact path="/mosque" element={<MainLayout><Mosque /></MainLayout>} />
          <Route exact path="/donar" element={<MainLayout><DonarEnrollment /></MainLayout>} />
          <Route exact path="/donar-update" element={<MainLayout><UpdateDataEnrollment /></MainLayout>} />
          <Route exact path="/occupation" element={<MainLayout><Occupation /></MainLayout>} />
          <Route exact path="/education" element={<MainLayout><Education /></MainLayout>} />
          <Route exact path="/donation-amount" element={<MainLayout><DonationAmount /></MainLayout>} />
          <Route exact path="/donar-payment" element={<MainLayout><DonarPayment /></MainLayout>} />
          <Route exact path="/donar-payment-list" element={<MainLayout><DonarPaymentList /></MainLayout>} />
        {/* </Route> */}

      </Routes>
      {/* <ToastContainer  closeButton={false}/> */}
      <Toaster />
    </>

  )
}

export default App
