import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import ViewClasses from '../Components/ClassScreenComponents/ViewClasses';
const ClassScreen = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "Classes"/>
        </div>

       <div className='right-part'>
       <div className='container '>
            <ViewClasses/>
            
            
        </div>
       </div>
    </div>
  )
}

export default ClassScreen