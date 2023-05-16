import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './component/Login'
import Register from './component/Register';
import Details from './component/Details';
import 'react-notifications/lib/notifications.css';
// import { NotificationContainer } from 'react-notifications';

function App() {
  //const [count, setCount] = useState(0)

  return (
    
   <Router>
   {/* <div> */}
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/details" element={<Details/>}/>
    </Routes>
   {/* </div> */}
   {/* <NotificationContainer/> */}
  </Router>


    
  )
}

export default App
