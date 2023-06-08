import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'


const MainLayout = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="layout w-100">
      <Header  toggle={toggle}/>
      <div className="main">
       {/* <div className="sidebar vh-100 shadow " style={{width:isOpen ?'235px':'50px'}}> */}
        <Sidebar isOpen={isOpen}/>
       {/* </div> */}
       <div className="content" style={{paddingLeft:isOpen ?'256px':'60px'}}> 
        <div style={{backgroundImage: `url("http://localhost:5173/assets/bg.png")`}}>
       
          {children}
          </div>
       </div>
      </div>
    </div>
  )
}

export default MainLayout