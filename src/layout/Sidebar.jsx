import { MdKeyboardArrowRight } from "react-icons/md";

import { Link, NavLink, useNavigate } from "react-router-dom";
import menu from "../constant/navs";

import SidebarItem from "./SidebarItem";
import { Menu } from "antd";
import { BiHomeAlt } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineFileText, AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate()
  // const [collapsed, setCollapsed] = useState(false);

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  return (
    <div className="sidebar vh-100 shadow " style={{ width: isOpen ? '256px' : '60px' }}>
      <div className={isOpen ? 'inner_content' : "inner_content collap"} style={{ width: isOpen ? '256px' : '60px' }}>

        <Menu
          mode="inline"

          onClick={({ key }) => { navigate(key) }}
          defaultOpenKeys={['donation']}
          defaultSelectedKeys={['donation']}
          theme="dark"
          items={[
            { label: "Dashboard", icon: <BiHomeAlt />, key: "/dashboard", },
            {
              label: "Basic Setup", icon: <AiOutlineUser />,
              children: [
                {
                  label: "Division",
                  key: "/division",
                },
                {
                  label: "District",
                  key: "/district",
                },
                {
                  label: "Upazila",
                  key: "/upazila",
                },
                {
                  label: "Mosque",
                  key: "/mosque",
                },
                {
                  label: "Occupation",
                  key: "/occupation",
                },
                {
                  label: "Education",
                  key: "/Education",
                },

                {
                  label: "Donation Amount",
                  key: "/donation-amount",
                },
              ]
            },

            {
              label: "Donation Setup", icon: <RiMoneyDollarCircleLine />, key: "donation", danger: true,
              children: [
                {
                  label: "Donar Enrollment",
                  key: "/donar",
                  danger: true,
                },
                {
                  label: "Donar Payment",
                  key: "/donar-payment",
                },
                {
                  label: "Monthly Donar Payment",
                  key: "/donar-payment-list",
                }

              ],

            },
            {
              label: "Reports", icon: <AiOutlineFileText />,
              children: [
                {
                  label: "Upazila Name Report",
                  key: "/upazila-name-rpt",
                },
                {
                  label: "Upazila Wise Payment Report",
                  key: "/upazila-payment-rpt",
                },
                {
                  label: "Mosque Name Report",
                  key: "/mosque-name-rpt",
                },
                {
                  label: "Month Wise Payment Details",
                  key: "/month-payment-rpt",
                },
                {
                  label: "Donar Enrollment List Report",
                  key: "/donar-enroll-rpt",
                }

              ],
            },
          ]}

        >

        </Menu>


        {/* {
    menu.map((item, index) =>  <SidebarItem key={index} item={item} />)
  } */}
      </div>

    </div>
  );
};

export default Sidebar;
