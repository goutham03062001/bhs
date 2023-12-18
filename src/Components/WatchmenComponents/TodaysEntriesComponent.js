/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const TodaysEntriesComponent = () => {
  const authContext = useContext(AuthContext);
  const date = new Date().toLocaleDateString();
  useEffect(() => {
    authContext.getTodaysEntries(date);
  }, [date]);
  return (
    <>
      <div className="col-lg-11">
          {authContext && authContext.loading ? <div><p>Loading</p></div> : <>
          <table className="table table-hover table-bordered">
            <thead>
              <tr className="table-success text-center">
                <td className="text-danger">S.No</td>
                <td className="text-danger">Name</td>
                <td className="text-danger">Mobile</td>
                <td className="text-danger">Date (MM-DD-YY)</td>
                <td className="text-danger">Time</td>
                <td className="text-danger">Reason</td>
              </tr>
            </thead>
            <tbody>
              {authContext && authContext.watchmenEntries.length>0  && authContext.watchmenEntries[0].day.map((dayObj)=>(<>
                <tr>
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
          </>}
      </div>
    </>
  );
};

export default TodaysEntriesComponent;
