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
        title: "Donar Enrollment",
        path: "/donar",
      },
      {
        title: "Donar Payment",
        path: "/donar-payment",
      },
      {
        title: "Donation Amount",
        path: "/donation-amount",
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