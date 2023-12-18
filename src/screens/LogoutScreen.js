import React,{useContext} from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
// import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from '../context/AuthContext';
const LogoutScreen = () => {
  const authContext = useContext(AuthContext)
    // const { logout } = useAuth0();
        function logoutHandler(){
        // logout();
        authContext.logoutFun();
        
    }
  return (
    <div className='mainDiv'>
    <div className="left-side-navigation">
           <LeftSideNavigation activeTab = "logout"/>
    </div>

    <div className='right-part'>
        
        <div className="feeDetailsRightDiv">

       <h5>Logout Screen</h5> 
       
        <button className="btn btn-md btn-primary px-5 my-5" type="submit"
        onClick={ (e)=> logoutHandler()}>
        Logout Now <img width="25" height="25" src="https://img.icons8.com/windows/32/logout-rounded.png" alt="logout-rounded"/>
        </button>
       
        </div>

    </div>  
    </div>
  )
}

export default LogoutScreen