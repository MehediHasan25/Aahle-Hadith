import { FaTh, FaRegChartBar, FaCommentAlt, FaUser } from "react-icons/fa";
import { BiImageAdd,BiHomeAlt } from "react-icons/bi";

const menu = [
  {
        title: 'Dashboard',
        icon:<BiHomeAlt/>,
    path: "/dashboard",
  },
  {
    title: "Basic Setup",
    icon: <FaUser />,
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
        title: "Upozilla",
        path: "/upozilla",
      },
      {
        title: "Mosque",
        path: "/mosque",
      },
    ],
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
      },
      {
        title: "Change Password",
        path: "/changePassword",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;