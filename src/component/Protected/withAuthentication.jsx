import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthentication = (WrappedComponent) => {
  const EnhancedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(()=>{
        navFunc();
    },[]);

    const navFunc = () =>{
          // Check for token in your preferred storage (e.g., cookies, local storage)
    const token = localStorage.getItem('AuthToken');
    // console.log("tokencall1",token);


    if (!token) {
        // console.log("tokenCall2");
      // No token found, initiate logout
      // Clear any user data and redirect to logout or login page
      localStorage.removeItem('AuthToken');
      // Additional cleanup if needed (e.g., clear user profile data)
      navigate('/'); // Redirect to logout or login page
      return null; // Render nothing until the redirect occurs
    }
    }

    

    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};

export default withAuthentication;
