import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import StudentProfileComponent from '../Components/StudentProfileComponent/StudentProfileComponent';
const StudentProfileScreen = () => {
  return (
    <div className='mainDiv'>
    <div className="left-side-navigation">
           <LeftSideNavigation activeTab = "studentProfiles"/>
    </div>

    <div className='right-part'>
        
        <div className="feeDetailsRightDiv">

       <h3>Search Student Profiles</h3> 
       <small>Enter any of the input fields to begin search</small>
        <StudentProfileComponent/>
       
        </div>

    </div>
    </div>
  )
}

export default StudentProfileScreen