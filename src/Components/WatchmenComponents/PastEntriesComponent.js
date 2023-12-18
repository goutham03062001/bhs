/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import LeftSideNavigation from "../NavigationComponent/LeftSideNavigation";
const PastEntriesComponent = () => {
  const authContext = useContext(AuthContext);
  const date = new Date().toLocaleDateString();
  const[userDate,setUserDate] = useState("");
  useEffect(() => {
    authContext.getTodaysEntries(date);
  }, [date]);
  function handleUserSelectedDate(e){
    setUserDate(e.target.value);
    function setFun(){
        setTimeout(()=>{
            authContext.getCustomDateEntries(userDate);
        },2000)
    }
    setFun();
  }
  return (
    <>
       <div className='mainDiv'>
    <div className="left-side-navigation">
       <LeftSideNavigation activeTab = "pastEntries"/>
    </div>
    <div className="right-part">
    {authContext && authContext.loading ? <div><p>Loading</p></div> : <div className="container">
    <input type="date" className='form-control col-lg-2 col-md-5 col-5 my-3'
        onChange={(e)=>handleUserSelectedDate(e)}
    />
    <h5>{userDate}</h5>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-success text-center">
                <td className="text-danger">S.No</td>
                <td className="text-danger">Name</td>
                <td className="text-danger">Mobile Number</td>
                <td className="text-danger">Date</td>
                <td className="text-danger">Address</td>
                <td className="text-danger">Reason</td>
              </tr>
            </thead>
            <tbody>
            {authContext && authContext.watchmenEntries.length>0  && authContext.watchmenEntries[0].day.map((dayObj)=>(<>
                <tr className="text text-center">
                  <td>{authContext.watchmenEntries[0].day.indexOf(dayObj)+1}</td>
                  <td>{dayObj.personObj.name}</td>
                  <td>{dayObj.personObj.mobileNumber}</td>
                  <td>{authContext.watchmenEntries[0].date}</td>
                  <td>{dayObj.personObj.timeStamp}</td>
                  <td>{dayObj.personObj.reason}</td>

                </tr>
              </>)) }
              
            </tbody>
          </table>
          </div>}
          
      </div>
</div>
    </>
  );
};

export default PastEntriesComponent;
