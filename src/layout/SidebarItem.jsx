import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'

const SidebarItem = ({item}) => {
    const [open, setopen] = useState(false)
  return (
    <div className={open ? "sidebar-item open":"sidebar-item"}>
      {
        item.childrens? <div className="sidebar-title" onClick={()=>setopen(!open)}>
          <Link to={item.path}>
          <span className="icon">
            {item.icon}
            <span className='title'>{item.title}</span>       
        </span>
          </Link>
        
        <div className="arrow-icon toggle_btn" onClick={()=>setopen(!open)}>
            <MdKeyboardArrowRight  size={25} color="white"/>
        </div>
    </div> : 
    
    <div className="sidebar-title">
        <Link to={item.path}>
          <span className="icon">
            {item.icon}
            <span className='title'>{item.title}</span>       
        </span>
          </Link>
    </div>
      }
        
        <div className="sidebar-content">
           {/* <small>hello</small> */}
           {
            item.childrens?.map((child,index) => (

                <div key={index} className="s-child">
                <NavLink to={child.path}>
                  <div className="sidebar-item">
                    <div className="sidebar-title">
                      <span>
                        {child.icon && (
                          <div className="icon">{child.icon}</div>
                        )}
                        <div>{child.title}</div>
                      </span>
                    </div>
                  </div>
                </NavLink>
              </div>
            )
            
            )
           }
        </div>
    </div>
  )
}

export default SidebarItem