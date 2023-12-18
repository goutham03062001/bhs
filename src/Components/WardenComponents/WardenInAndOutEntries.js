/* eslint-disable react-hooks/exhaustive-deps */
import React,{useContext,useEffect} from 'react'
import LeftSideNavigation from '../NavigationComponent/LeftSideNavigation';
import { AuthContext } from '../../context/AuthContext';
const WardenInAndOutEntries = () => {
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.getHostelWardenEntries();
    },[])
  return (
    <div className='mainDiv'>
    <div className="left-side-navigation">
       <LeftSideNavigation activeTab = "todaysEntries"/>
    </div>
    <div className="right-part">
    {authContext && authContext.loading ? <div><p>Loading</p></div> : <div className="container">
    <input type="date" className='form-control col-lg-2 col-md-5 col-5 my-3'/>

          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-success text-center">
                <td className="text-danger">S.No</td>
                <td className="text-danger">Name</td>
                <td className="text-danger">Admission Number</td>
                <td className="text-danger">Date (MM-DD-YY)</td>
                <td className="text-danger">Time</td>
                <td className="text-danger">Class</td>
                <td className="text-danger">Section</td>
                <td className="text-danger">Pass Type</td>
                <td className="text-danger">Reason</td>
              </tr>
            </thead>
            <tbody>
              {authContext && authContext.watchmenEntries.length>0  && authContext.watchmenEntries[0].day.map((dayObj)=>(<>
                <tr>
                  <td>{authContext.watchmenEntries[0].day.indexOf(dayObj)+1}</td>
                  <td>{dayObj.personObj.name}</td>
                  <td>{dayObj.personObj.AdmissionNumber}</td>
                  <td>{authContext.watchmenEntries[0].date}</td>
                  <td>{dayObj.personObj.timeStamp && dayObj.personObj.timeStamp}</td>
                  <td>{dayObj.personObj.currentClass}</td>
                  <td>{dayObj.personObj.currentSection}</td>
                  <td>{dayObj.personObj.passType}</td>
                  <td>{dayObj.personObj.reason}</td>

                </tr>
              </>)) }
            </tbody>
          </table>
          </div>}
          
      </div>
</div>
  )
}

export default WardenInAndOutEntries