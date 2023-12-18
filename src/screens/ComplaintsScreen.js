import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import ComplaintsComponent from '../Components/ComplaintsComponent/ComplaintsComponent';
const ComplaintsScreen = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "complaints"/>
        </div>

        <div className='right-part'>
            <div className="appointmentRightDiv">
            <h3>Create Complaint</h3>
            <ComplaintsComponent/>
            </div>
        </div>
    </div>
  )
}

export default ComplaintsScreen