import { FaBars } from "react-icons/fa";

const Header = ({toggle}) => {
  return (
    <div className="header p-3 d-flex gap-3">
        <div className="logo">
           <h4> Ahle Hadith</h4>
        </div>
    <div onClick={toggle}><FaBars style={{cursor:'pointer'}}/></div>
    </div>
  )
}

export default Header