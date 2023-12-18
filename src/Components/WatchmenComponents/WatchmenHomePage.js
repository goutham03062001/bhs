import React from 'react'
import LeftSideNavigation from '../NavigationComponent/LeftSideNavigation';
import InandOutEntryComponent from './InandOutEntryComponent';
const WatchmenHomePage = () => {
  return (
    <>
        <div className='mainDiv'>
            <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "home"/>
            </div>
            <div className="right-part">
               <InandOutEntryComponent/>
               
              </div>
    </div>
    </>
  )
}

export default WatchmenHomePage