import { FaTh, FaRegChartBar, FaCommentAlt, FaUser } from "react-icons/fa";
import { BiImageAdd,BiHomeAlt } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { AiOutlineFileText,AiOutlineUser } from "react-icons/ai";


const menu = [
  {
        title: 'Dashboard',
        icon:<BiHomeAlt/>,
    path: "/dashboard",
  },
  {
    title: "Basic Setup",
    icon: <AiOutlineUser />,
    childrens: [
      {
        title: "Division",
        path: "/division",
      },
      {
        title: "District",
        path: "/district",
      },
      {
        title: "Upazila",
        path: "/upazila",
      },
      {
        title: "Mosque",
        path: "/mosque",
      },
      {
        title: "Occupation",
        path: "/occupation",
      },
      {
        title: "Education",
        path: "/Education",
      },

      {
        title: "Donation Amount",
        path: "/donation-amount",
      },
         
   
      
    ],
  },
  {
    title: "Donation Setup",
    icon: <RiMoneyDollarCircleLine />,
    childrens: [      
      {
        title: "Donar Enrollment",
        path: "/donar",
      },
      {
        title: "Donar Payment",
        path: "/donar-payment",
      },
      {
        title: "Monthly Donar Payment",
        path: "/donar-payment-list",
      }
      
    ],
  },
  {
    title: "Reports ",
    icon: <AiOutlineFileText />,
    childrens: [      
      {
        title: "Upazila Name Report",
        path: "/upazila-name-rpt",
      },
      {
        title: "Upazila Wise Payment Report",
        path: "/upazila-payment-rpt",
      },
      {
        title: "Mosque Name Report",
        path: "/upazila-payment-rpt",
      },
      {
        title: "Month Wise Payment Details",
        path: "/month-payment-rpt",
      },
      {
        title: "Donar Enrollment List Report",
        path: "/donar-rpt",
      }
      
    ],
  },
  // {
  //   title: "Add Product",
  //   icon: <BiImageAdd />,
  //   path: "/add-product",
  // },
  // {
  //   title: "Account",
  //   icon: <FaRegChartBar />,
  //   childrens: [
  //     {
  //       title: "Profile",
  //       path: "/profile",
  //     },
  //     {
  //       title: "Edit Profile",
  //       path: "/edit-profile",
  //     },
  //     {
  //       title: "Change Password",
  //       path: "/changePassword",
  //     },
  //   ],
  // },
  // {
  //   title: "Report Bug",
  //   icon: <FaCommentAlt />,
  //   path: "/contact-us",
  // },
];

export default menu;