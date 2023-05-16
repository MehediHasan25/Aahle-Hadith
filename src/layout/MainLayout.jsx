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
       <div className="sidebar vh-100 shadow " style={{width:isOpen ?'235px':'60px'}}>
        <Sidebar isOpen={isOpen}/>
       </div>
       <div className="content" style={{paddingLeft:isOpen ?'235px':'60px'}}> 
        <div>{children}</div>
       </div>
      </div>
    </div>
  )
}

export default MainLayout