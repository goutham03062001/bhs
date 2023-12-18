import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import FeeDetailsComponent from '../Components/FeeDetailsComponents/FeeDetailsComponent';
const FeeDetailsScreen = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "feeDetails"/>
        </div>

        <div className='right-part'>
            
            <div className="feeDetailsRightDiv">

           <h3>Upload Fee Details</h3> 
            <FeeDetailsComponent/>
           
            </div>

        </div>
        </div>
  )
}

export default FeeDetailsScreen