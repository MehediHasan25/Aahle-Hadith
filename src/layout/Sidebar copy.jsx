import { MdKeyboardArrowRight } from "react-icons/md";

import { Link, NavLink } from "react-router-dom";
import menu from "../constant/navs";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

// const activeLink = ({ isActive }) => (isActive ? "active" : "link");
// const activeSublink = ({ isActive }) => (isActive ? "active" : "link");
const Sidebar = ({ isOpen }) => {
  // const [expandMenu, setExpandMenu] = useState(false);
  // const showSubItem = () => {
  //   setExpandMenu(!expandMenu);
  // };

  return (
    <div className="sidebar vh-100 shadow " style={{ width: isOpen ? '235px' : '50px' }}>
      <div className="inner_content">

        {
          menu.map((item, index) => <SidebarItem key={index} item={item} />)
        }
      </div>

    </div>
  );
};

export default Sidebar;
