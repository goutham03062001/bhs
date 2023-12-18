import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import EventNotificationsComponent from '../Components/EventNotificationsComponent/EventNotifications';
const EventNotifications = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "eventNotification"/>
        </div>

        <div className='right-part'>
            <div className="appointmentRightDiv">
            <h3>Event Notification</h3>
            <EventNotificationsComponent/>
            </div>
        </div>
    </div>
  )
}

export default EventNotifications