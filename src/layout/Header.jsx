import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate  } from "react-router-dom";

const Header = ({toggle}) => {
  const [isLoggedin, setIsLoggedin] = useState(true);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("AuthToken");
    // console.log('logout');
    setIsLoggedin(false)
    // window.location.replace("/")
    navigate('/',{ replace: true });
  }
  return (
    <div className="header p-3 d-flex justify-content-between">
        <div className="logo d-flex gap-3">
           <h4> Ahle Hadith</h4>
    <div onClick={toggle}><FaBars style={{cursor:'pointer'}}/></div>
    </div>

    <div className="d-flex align-items-center gap-2 cursor-pointer pe-5">
      <span className="icon">
        <RiLogoutCircleRLine/>
      </span>
      <span onClick={logout}>Logout</span>
    </div>
        </div>
  )
}

export default Header