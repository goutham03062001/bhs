import React from "react";
import LeftSideNavigation from "../Components/NavigationComponent/LeftSideNavigation";
const WatchmenScreen = () => {
  return (
    <>
    <div className='mainDiv'>
            <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "home"/>
            </div>
    </div>
    </>
  );
};

export default WatchmenScreen;
