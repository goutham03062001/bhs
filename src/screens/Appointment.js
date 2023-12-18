import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import "../Styles/styles.css";
import AppointmentComponent from '../Components/AppointmentComponents/Appointment';
const Appointment = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "appointment"/>
        </div>

        <div className='right-part'>
            <div className="appointmentRightDiv">
            <div className="d-flex flex-row justify-content-center align-items-center ">
            <h3 className="px-3">Create Appointment</h3>
            <img src={require("../Assets/Appointment.jpg")} style={{width:"75px",height:"75px",borderRadius:"50%"}} alt="appointment"/>
            </div>
            <AppointmentComponent/>
            </div>
        </div>
    </div>
  )
}

export default Appointment