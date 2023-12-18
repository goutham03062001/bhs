import React from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import "../Styles/styles.css";
import ClassCard from '../Components/AttendanceComponents/ClassCard';
const AttendanceScreen = () => {
  return (
    <div className='mainDiv'>
        <div className="left-side-navigation">
               <LeftSideNavigation activeTab = "uploadAttendance"/>
        </div>

        <div className='right-part'>
            
            
            <ClassCard currentClass="1"/>
            <ClassCard currentClass="2"/>
            <ClassCard currentClass="3"/>
            <ClassCard currentClass="4"/>
            <ClassCard currentClass="5"/>
            <ClassCard currentClass="6"/>
            <ClassCard currentClass="7"/>
            <ClassCard currentClass="8"/>
            <ClassCard currentClass="9"/>
            <ClassCard currentClass="10"/>
           
        </div>
    </div>
  )
}

export default AttendanceScreen