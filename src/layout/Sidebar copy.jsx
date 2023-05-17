import { MdKeyboardArrowRight } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";
import menu from "../constant/navs";
import { useState } from "react";

// const activeLink = ({ isActive }) => (isActive ? "active" : "link");
// const activeSublink = ({ isActive }) => (isActive ? "active" : "link");
const Sidebar = ({ isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);
  const showSubItem = () => {
    setExpandMenu(!expandMenu);
  };

  return (
    <>
      {/* <NavLink to={item.path} className={activeLink}>
    
 </NavLink> */}
      <div
        className={
          expandMenu ? "sidebar-item s-parent open" : "sidebar-item s-parent"
        }
      >
        {menu.map((item, index) => (
          <div key={index} className="p-2">
            <div className="sidebar-title">
              <div className="item d-flex gap-2">
                {item?.icon && <div className="icon">{item?.icon}</div>}
                {isOpen && (
                  <div>
                    <Link to={item.path}>{item.title}</Link>
                  </div>
                )}
              </div>

              {item.childrens ? (
                <MdKeyboardArrowRight
                  size={25}
                  className="arrow-icon"
                  onClick={showSubItem}
                />
              ) : null}
            </div>

            <div className="sidebar-content">
              {item.childrens?.map((child, index) => {
                return (
                  <div key={index} className="s-child">
                    <NavLink to={child.path}>
                      <div className="sidebar-item">
                        <div className="sidebar-title">
                          <span>
                            {child.icon && (
                              <div className="icon">{child.icon}</div>
                            )}
                            {isOpen && <div>{child.title}</div>}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
