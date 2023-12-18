import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../Assets/Spinner.gif";

const StudentProfileComponent = () => {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [AdmissionNumber, setAdmissionNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  function handleFormSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    console.log(AdmissionNumber);
    console.log(name);
    console.log(mobileNumber);
    setMobileNumber("");
    setName("");
    authContext.getStudentDetails(AdmissionNumber);
  }
 const DeleteFeeItemHandler = (feeId)=>{
  console.log("You are trying to delete id "+feeId._id);
  authContext.deleteStudentFeeDetails(AdmissionNumber,feeId._id); 
 }
 const DeleteAchievement = (achievement)=>{
    console.log("Trying to delete Achievement Id "+achievement._id);
    authContext.deleteAchievements(AdmissionNumber,achievement._id);
 }
 const DeleteAttendance = (month)=>{
  console.log("You are trying to delete month id : "+month._id);
  authContext.deleteAttendance(AdmissionNumber,month._id); 
}
  return (
    <div className="col-lg-7">
      <form className="form" onSubmit={(e) => handleFormSubmit(e)}>
       

        <div className="my-4">
          <label className="text text-danger">Admission Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Admission Number"
            onChange={(e) => setAdmissionNumber(e.target.value)}
          />
        </div>

       

        <button className="btn btn-md px-4 btn-info" type="submit">
          Search Now &nbsp;{" "}
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/color/48/search--v1.png"
            alt="search--v1"
          />
        </button>
      </form>
      <div className="mt-3">
        {authContext && authContext.loading ? <>
          <div style={{display:"flex",flexDirection:"column",gap:10,justifyContent:"flex-start",alignItems:"flex-start"}}>
               <img src={Spinner} alt="loading" style={{width:50,height:50}}/>
                <p>Loading Details</p>
          </div>
        </> : <>
        {formSubmitted &&
        authContext &&
        authContext.studentProfile.AdmissionNumber ? (
          authContext.studentProfile && (
            <>
              <div className="my-3 card">
                <div className="card-body">
                  <p> Name - {authContext.studentProfile.studentName}</p>
                  <p>
                    {" "}
                    Admission Number -{" "}
                    {authContext.studentProfile.AdmissionNumber}
                  </p>

                  <p>
                    {" "}
                   Class -{" "}
                    {authContext.studentProfile.className}
                  </p>

                  <p>
                    {" "}
                    Section -{" "}
                    {authContext.studentProfile.sectionName}
                  </p>
                  {authContext.studentProfile.personalDetails && (
                    <>
                      <p>
                        Address -{" "}
                        {authContext.studentProfile.personalDetails.address}
                      </p>
                      <p>
                        Aadhar Number -{" "}
                        {
                          authContext.studentProfile.personalDetails
                            .aadharNumber
                        }
                      </p>
                      <p>
                        Admission Date -{" "}
                        {
                          authContext.studentProfile.personalDetails
                            .admissionDate
                        }
                      </p>
                      <p>
                        Date of Birth -{" "}
                        {authContext.studentProfile.personalDetails.dob}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="my-3">
                <div className="card-body">
                  <h3>Results</h3>
                  {authContext &&
                    authContext.studentProfile.results &&
                    authContext.studentProfile.results.map((result) => (
                      <>
                        <div>
                          <div>
                            <>
                              
                              {result.exam && result.exam.marks && (
                                <>
                                  <table className="table table-bordered table-striped table-hover resultCard">
                                  <caption>{result.exam.examName}'s Result</caption>
                                    <thead>
                                      <tr className="table-success">
                                        <td className="text text-center">S.no</td>
                                        <td className="text text-dark text-center">Subject Name</td>
                                        <td className="text text-dark text-center">Marks Obtained</td>
                                        {/* <th scope="col">Handle</th> */}
                                      </tr>
                                    </thead>
                                      <tbody>
                                      <tr>
                                    <th className="text text-center">1</th>
                                      <td className="text text-center">Telugu</td>
                                      {<td className="text text-center">{result.exam.marks.telugu}</td>}
                                    </tr>

                                    <tr>
                                    <td className="text text-center">2</td>
                                      <td className="text text-center">Hindi</td>
                                      {<td className="text text-center">{result.exam.marks.hindi}</td>}
                                    </tr>


                                    <tr>
                                    <td className="text text-center">3</td>

                                      <td className="text text-center">English</td>
                                      {<td className="text text-center">{result.exam.marks.english}</td>}
                                    </tr>


                                    <tr>
                                    <td className="text text-center">4</td>

                                      <td className="text text-center">Maths</td>
                                      {<td className="text text-center">{result.exam.marks.maths}</td>}
                                    </tr>


                                    <tr>
                                    <td className="text text-center">5</td>

                                      <td className="text text-center">Physics</td>
                                      {<td className="text text-center">{result.exam.marks.physics}</td>}
                                    </tr>


                                    <tr>
                                    <td className="text text-center">6</td>

                                      <td className="text text-center">Biology</td>
                                      {<td className="text text-center">{result.exam.marks.biology}</td>}
                                    </tr>

                                    <tr>
                                    <td className="text text-center">7</td>

                                      <td className="text text-center">Social</td>
                                      {<td className="text text-center">{result.exam.marks.social}</td>}
                                    </tr>
                                      </tbody>

                                  </table>
                                  {/* <p>Physics {result.exam.marks.physics}</p> */}
                                </>
                              )}
                            </>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>

              <div className="my-4">
                <h4>Fee Details</h4>
                <div className="my-3">
                  <div>
                   <table className="table table-bordered table-hover resultCard">
                          <caption>{authContext && authContext.studentProfile.studentName}'s  Fee Details</caption>

                                 <tr className="table-success">
                                 <td className="text text-center">Amount</td>
                                  <td className="text text-center">Fee Type</td>
                                  <td className="text text-center">Date</td>
                                  <td className="text text-center">Actions</td>
                                 </tr>
                              
                   { authContext && authContext.studentProfile.feeDetails && (authContext.studentProfile.feeDetails.map((feeDetail)=>(
                          feeDetail && feeDetail.feeItem && (<>
                            <tr>
                              <td className="text text-primary text-center">{feeDetail.feeItem.amount}</td>
                              <td className="text text-success h6 text-center">{feeDetail.feeItem.feeType}</td>
                              <td className="text text-secondary h6 text-center">{feeDetail.feeItem.paymentDate}</td>
                              <td className="d-flex flex-row justify-content-end gap-3">
                                <button className="btn btn-sm">
                                Edit &nbsp; <img width="20" height="20" src="https://img.icons8.com/nolan/64/edit--v1.png" alt="edit--v1"/>
                                </button>
                                <button className="btn btn-sm"
                                onClick={(e)=>DeleteFeeItemHandler(feeDetail)}>Delete &nbsp; <img width="20" height="20" src="https://img.icons8.com/color/48/delete.png" alt="delete"/></button>
                              </td>
                            </tr>
                          </>)
                    )))}
                   </table>

                  </div>
                </div>
              </div>

              <div className="my-5">
                <h4>Complaints</h4>
                {authContext && authContext.studentProfile && (<>
                  <div>
                    {authContext.studentProfile.complaints.map((complaint)=>(<div className="card resultCard m-2">
                      <p className="p-4 m-2 text text-danger" style={{position:"relative"}}>
                      <span className="px-3">{complaint && complaint.issue && authContext.studentProfile.complaints.indexOf(complaint)+1}.</span>
                      {complaint && complaint.issue && (complaint.issue.reason)} </p>
                      <div style={{position:"absolute",marginTop:"3px",width:"100%",height:"100%",display:"flex",flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-start"}}>
                      <p className="px-2 text text-muted"> Date {complaint && complaint.issue && (complaint.issue.date)} </p>
                      <p> | </p>
                      <p className="px-2 text text-muted"> sent to {complaint && complaint.issue && (complaint.issue.sendTo)} </p>
                      </div>
                    </div>))}
                  </div>
                </>)}
              </div>

              <div className="my-5 pb-5">
                  <h4>Achievements</h4>
                  {authContext && authContext.studentProfile && (<>
                    <div>
                      <table className="table table-bordered table-striped table-hover resultCard">
                      <caption>{authContext && authContext.studentProfile.studentName}'s  Achievements</caption>
                        <tr className="table-info">
                          <td>S.no</td>
                          <td>Achievement Name</td>
                          <td>Achievement Date</td>
                          <td>Actions</td>
                        </tr>
                      
                        <tbody className="table-body">
                        {authContext.studentProfile.achievements.map((achievement)=>(<>
                        <tr>
                        <th scope="row">{achievement && achievement.achievementDetails && authContext.studentProfile.achievements.indexOf(achievement)+1}</th>
                        <td>{achievement && achievement.achievementDetails && achievement.achievementDetails.achievementName}</td>

                          <td>{achievement && achievement.achievementDetails && achievement.achievementDetails.achievementDate}</td>
                        
                          <td className="d-flex flex-row justify-content-around gap-3">
                                <button className="btn btn-sm btn-secondary">
                                Edit &nbsp; <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/edit--v1.png" alt="edit--v1"/>
                                </button>
                                <button className="btn btn-sm btn-danger"
                                onClick={(e)=>DeleteAchievement(achievement)}>Delete &nbsp; <img width="20" height="20" src="https://img.icons8.com/color/48/delete.png" alt="delete"/></button>
                              </td>
                        </tr>
                      
                      </>))}
                        </tbody>
                      </table>
                    </div>
                  </>)}
              </div>

              <div className="my-5 pb-5">
                  <h4>Attendance</h4>
                  {authContext && authContext.studentProfile && (<>
                    <div>
                      <table className="table table-bordered table-striped table-hover resultCard">
                      <caption>{authContext && authContext.studentProfile.studentName}'s Attendance</caption>
                        <tr className="table-success">
                          <td>S.no</td>
                          <td>Month</td>
                          <td>Working Days</td>
                          <td>Present</td>
                          <td>Absent</td>
                          <td>Actions</td>
                        </tr>

                        <tbody>
                          { authContext && authContext.studentProfile && (
                            authContext.studentProfile.attendance.map((item)=>(item && item.month && (
                              <>
                                <tr>
                                <th scope="row">{authContext.studentProfile.attendance.indexOf(item)+1}</th>
                                <td>{item.month.monthName}</td>
                                <td>{item.month.workingDays}</td>
                                <td>{item.month.presentDays}</td>
                                <td>{item.month.workingDays - item.month.presentDays}</td>
                                <td className="d-flex flex-row justify-content-around gap-3">
                                <button className="btn btn-sm btn-info">
                                Edit &nbsp; <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/48/edit--v1.png" alt="edit--v1"/>
                                </button>
                                <button className="btn btn-sm btn-danger"
                                onClick={(e)=>DeleteAttendance(item)}>Delete &nbsp; <img width="20" height="20" src="https://img.icons8.com/color/48/delete.png" alt="delete"/></button>
                              </td>
                                </tr>
                              </>
                            )))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>)}
              </div>
            </>
          )
        ) : formSubmitted ? (
          <p>No Student Details Found</p>
        ) : (
          ""
        )}
        </>}
      </div>
    </div>
  );
};

export default StudentProfileComponent;


// amount
// : 
// "40000"
// feeType
// : 
// "School Fee"
// paymentDate
// : 
// "12/10/23"
// {/* {achievement && achievement.achievementDetails && achievement.achievementDetails.achievementDate } */}
