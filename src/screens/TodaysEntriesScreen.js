import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import TodaysEntriesComponent from '../Components/WatchmenComponents/TodaysEntriesComponent';
const TodaysEntriesScreen = () => {
  return (
    <>
          <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "todaysEntries"/>
        </div>

        <div className='right-part'>
            <div className="appointmentRightDiv">
            <div className="d-flex flex-row justify-content-center align-items-center ">
            <h3 className="px-3">Todays Entries</h3>
            </div>
            <TodaysEntriesComponent/>
            </div>
        </div>
    </div>
    </>
  )
}

export default TodaysEntriesScreen