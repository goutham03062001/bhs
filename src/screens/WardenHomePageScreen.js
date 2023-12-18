import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import HostelInAndOut from '../Components/WardenComponents/HostelInAndOut';
const WardenHomePageScreen = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "home"/>
        </div>

        <div className='right-part'>
            <div className="appointmentRightDiv">
            <HostelInAndOut/>
            </div>
        </div>
    </div>
  )
}

export default WardenHomePageScreen