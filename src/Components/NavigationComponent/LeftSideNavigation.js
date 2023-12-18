import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import "../../Styles/styles.css";
import { AuthContext } from '../../context/AuthContext';
const LeftSideNavigation = ({activeTab}) => {
  const authContext = useContext(AuthContext);
  return (
    <>
      {authContext && authContext.currentRole==="frontOffice" && (<>
      <ul className="navbar-inner-style">
       <Link to="/" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="home" ? `active` : ``}`}>
            <img width="23" height="23" src="https://img.icons8.com/ios/50/home--v1.png" alt="home--v1"/>
            <p>Home</p>
        </li>
       </Link>
      

       <Link to="/ViewAllClasses" style={{textDecoration:"none"}}>
       <li  className={`list-item ${activeTab==="Classes" ? `active` : ``}`}>
       <img width="23" height="23" src="https://img.icons8.com/ios/50/classroom.png" alt="appointment-scheduling"/>
       <p>Classes</p> 
        </li>
       </Link>


        {/* <Link to="/uploadAttendance" style={{textDecoration:"none"}}>
        <li className={`list-item ${activeTab==="uploadAttendance" ? `active` : ``}`}>
        <img width="23" height="23" src="https://img.icons8.com/windows/32/attendance-mark.png" alt="attendance-mark"/>
        <p>Attendance</p>
        </li>
        </Link> */}
       {/* <Link to="/feeDetails" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="feeDetails" ? `active` : ``}`}>
            <img width="23" height="23" src="https://img.icons8.com/ios/50/refund-2.png" alt="refund-2"/>
            <p>Fee Details</p>
        </li>
       </Link> */}
       <Link to="/complaints" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="complaints" ? `active` : ``}`}>
        <img width="23" height="23" src="https://img.icons8.com/ios/50/complaint.png" alt="complaint"/>
        <p>
        Complaints
        </p>
        </li>
       </Link>

       <Link to="/eventNotification" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="eventNotification" ? `active` : ``}`}>
       <img width="23" height="23" src="https://img.icons8.com/ios/50/event-accepted.png" alt="event-accepted"/>
        <p>
        Event Notifications
        </p>
        </li>
       </Link>

       <Link to="/studentProfiles" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="studentProfiles" ? `active` : ``}`}>
        <img width="23" height="23" src="https://img.icons8.com/ios/50/complaint.png" alt="complaint"/>
        <p>
        Students Profiles
        </p>
        </li>
       </Link>


       <Link to="/logout" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="logout" ? `active` : ``}`}>
       <img width="23" height="23" src="https://img.icons8.com/windows/32/logout-rounded.png" alt="logout-rounded"/>
        <p>
        Logout
        </p>
        </li>
       </Link>

       
    </ul>
    </>)}
    {
      authContext && authContext.currentRole==="watchmen" && (<>
        <ul className="navbar-inner-style">
       <Link to="/" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="home" ? `active` : ``}`}>
            <img width="23" height="23" src="https://img.icons8.com/ios/50/home--v1.png" alt="home--v1"/>
            <p>Home</p>
        </li>
       </Link>

       <Link to="/todaysEntries" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="todaysEntries" ? `active` : ``}`}>
       <img width="23" height="23" src="https://img.icons8.com/ios/50/list--v1.png" alt="list--v1"/>
            <p>Today's Entries</p>
        </li>
       </Link>

       <Link to="/pastEntries" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="pastEntries" ? `active` : ``}`}>
       <img width="23" height="23" src="https://img.icons8.com/ios/50/list--v1.png" alt="list--v1"/>
            <p>View Past Entries</p>
        </li>
       </Link>
       <Link to="/logout" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="logout" ? `active` : ``}`}>
            <img width="23" height="23" src="https://img.icons8.com/windows/32/logout-rounded.png" alt="home--v1"/>
            <p>Logout</p>
        </li>
       </Link>
       </ul>
      </>)
    }

    {
      authContext && authContext.currentRole==="warden" && (<>
        <ul className="navbar-inner-style">
       <Link to="/" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="home" ? `active` : ``}`}>
            <img width="23" height="23" src="https://img.icons8.com/ios/50/home--v1.png" alt="home--v1"/>
            <p>Home</p>
        </li>
       </Link>

       <Link to="/warden/todaysEntries" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="todaysEntries" ? `active` : ``}`}>
       <img width="23" height="23" src="https://img.icons8.com/ios/50/list--v1.png" alt="list--v1"/>
            <p>Today's Entries</p>
        </li>
       </Link>

       <Link to="/logout" style={{textDecoration:"none"}}>
       <li className={`list-item ${activeTab==="logout" ? `active` : ``}`}>
            <img width="23" height="23" src="https://img.icons8.com/windows/32/logout-rounded.png" alt="home--v1"/>
            <p>Logout</p>
        </li>
       </Link>
       </ul>
      </>)
    }
    </>
  )
}

export default LeftSideNavigation