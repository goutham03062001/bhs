import React from 'react'
import  "../Styles/styles.css";
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
// import { AuthContext } from '../context/AuthContext';
const LandingPage = () => {
    // const authContext = useContext(AuthContext)
  return (
 
        <div className='mainDiv'>
            <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "home"/>
            </div>
            <div className='right-part'>
                <div className="card dashboardCard">
                <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                            <p>Make Announcement</p>
                            {/* <p>{authContext.currentRole}</p> */}
                            <img src = {require("../Assets/Announcemnt.png")} alt="Announcenmnt"
                                style={{width:"35px",height:"35px"}}
                            />
                        </div>
                    <div className="card-body">
                        <p className="card-text text-muted">
                            Make announcement that will be sent to all the faculty and parents
                        </p>
                        
                    </div>
                </div>

                <div className="card dashboardCard">
                <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                            <p>Today's Attendance</p>
                            <img src = {require("../Assets/Attendance.png")} alt="Announcenmnt"
                                style={{width:"35px",height:"35px"}}
                            />
                </div>
                    <div className="card-body">
                        <div className="card-description">
                            <p className="text-muted">
                               Overall Attendance
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card dashboardCard">
                <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                            <p>Today's Appointments</p>
                            <img src = {require("../Assets/Appointment.png")} alt="Announcenmnt"
                                style={{width:"35px",height:"35px"}}
                            />
                </div>
                    <div className="card-body">
                        <div className="card-description">
                            <p className="text-muted">
                                Below are the today's appointment
                            </p>
                        </div>
                    </div>
                </div>


                <div className="card dashboardCard">
                <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                            <p>View Class Wise Student Details</p>
                            <img src = {require("../Assets/GroupOfPeople.png")} alt="Announcenmnt"
                                style={{width:"35px",height:"35px"}}
                            />
                </div>
                    <div className="card-body">
                        <div className="card-description">
                            <p className="text-muted">
                                Click the button to view more
                            </p>
                            <button className='btn btn-sm btn-primary px-5'>
                                View Details
                            </button>
                        </div>
                    </div>
                </div>


                <div className="card dashboardCard">
                <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                            <p>This Month Expenditure</p>
                            <img src = {require("../Assets/Expenditure.png")} alt="Announcenmnt"
                                style={{width:"35px",height:"35px"}}
                            />
                </div>
                    <div className="card-body">
                        <div className="card-description">
                            <p className="text-muted">
                                Daily,Weekly,Monthly
                            </p>
                            
                        </div>
                    </div>
                </div>


                <div className="card dashboardCard">
                <div className='card-header d-flex flex-row justify-content-between align-items-center'>
                            <p>Faculty Leaves</p>
                            <img src = {require("../Assets/Leave.png")} alt="Announcenmnt"
                                style={{width:"35px",height:"35px"}}
                            />
                </div>
                    <div className="card-body">
                        <div className="card-description">
                            <p className="text-muted">
                               Today's Faculty Leaves
                            </p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
 
  )
}

export default LandingPage