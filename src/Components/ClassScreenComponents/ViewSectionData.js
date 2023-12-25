/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { useParams ,Link} from "react-router-dom";
import LeftSideNavigation from "../NavigationComponent/LeftSideNavigation";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../Assets/Spinner.gif";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../utils/Util";
const ViewSectionData = () => {
  const router = useParams();
  const authContext = useContext(AuthContext);
  let className = router.className;
  let sectionName = router.sectionName;
  const [showModal, handleShowModal] = useState(false);
  const[formSubmitted,setFormSubmitted] = useState(false);
  // const[showFeeDetails,handleShowFeeDetails] = useState(false);
  // const[selectedStudent,setSelectedStudent] = useState({AdmissionNumber:"",studentName : "",mobileNumber1 : "",mobileNumber2:""});
  // const[showResultsModal,setShowResultModal] = useState(false);
  const[showFileUpload,handleShowFileUpload] = useState(false);
  const[chooseStudents,setChooseStudents] = useState([]);
  const[isReady,setIsReady] = useState(true);
  // const[showEditDetailsModal,setShowEditDetailsModal] = useState(false);
  const[file,setFile] = useState("");
  const [formData, setFormData] = useState({
    studentName: "",
    AdmissionNumber: "",
    dob: "",
    mobileNumber1: "",
    mobileNumber2:"",
    admissionDate: "",
    aadharNumber: "",
    address: "",
    transportation: "Hostler",
  });
  // const [feeFormData,setFeeFormData] = useState({
  //   paymentDate:"",
  //   amount : "",
  //   feeType:"Exam Fee"
  // });
  // const[examFormData,setExamFormData] = useState({
  //   examName : "FA-1",
  //   telugu:"",
  //   hindi:"",
  //   english:"",
  //   maths:"",
  //   physics:"",
  //   biology:"",
  //   social:"",
  //   evs:""
  // })
  useEffect(() => {
    authContext.getStudentsDataBySectionName(className, sectionName);
    const socket = io(BACKEND_URL, { path: '/socket.io' });
    socket.on("wbReady", (data) => {
      // setQrCodeData(data.qr);
      console.log("whatsapp web ready message",data.message);
      setIsReady(false); //enable button
    });
  }, [className, sectionName]);
  function handleFormControl(e) {
    e.preventDefault();
    console.log("Hello World!");
    console.log(formData);
    setFormSubmitted(true);
    authContext.uploadStudentDetailsByClassName(
      formData,
      className,
      sectionName
    );
    setFormData({
      studentName: "",
      AdmissionNumber: "",
      dob: "",
      mobileNumber: "",
      admissionDate: "",
      aadharNumber: "",
      address: "",
      transportation: "",
      amount:""
    });

  }
 
// function handleShowFeeDetailsHandler(student){
//   handleShowFeeDetails(true);
//   setSelectedStudent({...selectedStudent,AdmissionNumber:student.AdmissionNumber,studentName:student.studentName,mobileNumber1 : student.personalDetails.mobileNumber1,mobileNumber2:student.personalDetails.mobileNumber2});
//   console.log("You are trying to upload fee details of "+student.AdmissionNumber+" "+student.studentName);
// }
  function updateWarningPromptHandler(){
    authContext.updateWarningPromptFun();
  }

  function removeStudentDetails(student){
    console.log(student);
    authContext.deleteStudentDetailsByAdmission(student.AdmissionNumber,className,sectionName);
  }
  // function handleFeeDetailsFormControl(e){
  //   e.preventDefault();
  // }
  // function uploadExamMarksHandler(e){
  //   e.preventDefault();
  //   authContext.uploadExamMarksByStudent(selectedStudent.AdmissionNumber,examFormData);
  //   setExamFormData({ 
  //   examName : "FA-1",
  //   telugu:"",
  //   hindi:"",
  //   english:"",
  //   maths:"",
  //   physics:"",
  //   biology:"",
  //   social:"",
  //   evs:""})
  // }
  // function removeAllMarksFieldsHandler(){
  //   setExamFormData({ 
  //     examName : "FA-1",
  //     telugu:"",
  //     hindi:"",
  //     english:"",
  //     maths:"",
  //     physics:"",
  //     biology:"",
  //     social:"",
  //     evs:""})
  // }
function uploadStudentDetails(e){
  e.preventDefault();
  authContext.uploadStudentDetailsByClassName(formData,className);
}
function handleFileChange(e){
  setFile(e.target.files[0]);
  console.log(e.target.files[0])
}
function handleFileUpload(){
  const formData = new FormData();
  formData.append("file",file);
  authContext.uploadExcelSheet(formData);
}


// function handleStudentFeeDetailsByAdmission(){

//   // authContext.uploadFeeDetails(selectedStudent.AdmissionNumber,feeFormData.feeType,feeFormData.amount,feeFormData.paymentDate)
// }

function listChosenStudentsData(){
    console.log("chosen student data",chooseStudents);
    // console.log("")
    if(chooseStudents.length<1){
      alert("Please choose atleast one student ");
      return;
    }else{

      authContext.sendWhatsAppMessage(chooseStudents);
    }
}

function handleCheckBoxChange(studentDetails){
  const selectedIndex = chooseStudents.some(student=>student.AdmissionNumber === studentDetails.AdmissionNumber)
  console.log("selectedIndex status - ",selectedIndex);
  if(selectedIndex){
    
    setChooseStudents(chooseStudents.filter(student=>student.AdmissionNumber!==studentDetails.AdmissionNumber));
  }else{
    console.log("Adding studentId - ",studentDetails.AdmissionNumber)
   if(studentDetails.personalDetails.mobileNumber!=="" && studentDetails.personalDetails.mobileNumber2===""){
    setChooseStudents([...chooseStudents,{AdmissionNumber:studentDetails.AdmissionNumber,mobileNumber:studentDetails.personalDetails.mobileNumber1,studentName:studentDetails.studentName}]);
   }if(studentDetails.personalDetails.mobileNumber2!=="" && studentDetails.personalDetails.mobileNumber===""){
    setChooseStudents([...chooseStudents,{AdmissionNumber:studentDetails.AdmissionNumber,mobileNumber:studentDetails.personalDetails.mobileNumber2,studentName:studentDetails.studentName}]);
   }
   if(studentDetails.personalDetails.mobileNumber1!=="" && studentDetails.personalDetails.mobileNumber2!==""){
    setChooseStudents([...chooseStudents,{AdmissionNumber:studentDetails.AdmissionNumber,mobileNumber:studentDetails.personalDetails.mobileNumber1,studentName:studentDetails.studentName}]);

   }
  }
  console.log("selected student ",chooseStudents);
}
  return (
    <div className="mainDiv">
      <div className="left-side-navigation">
        <LeftSideNavigation activeTab="Classes" />
      </div>

      <div className="right-part">
        {authContext && authContext.loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={Spinner}
              alt="loading"
              style={{ width: 50, height: 50 }}
            />
            <p>Loading... Please Wait!</p>
          </div>
        ) : (
          <div className="container">
            {authContext && authContext.allStudents.length > 0 ? (
              <>
                <div className="d-flex justify-content-end my-4">
                  {!showFileUpload && (<>
                    <button
                    className="btn btn-warning"
                    onClick={(e) => handleShowModal(true)}
                    data-toggle="modal"
                    data-target="#exampleModal"
                    type="button"
                  >
                    Add Students{" "}
                    <img
                      src="https://img.icons8.com/ios/50/add--v1.png"
                      alt="addIcon"
                      style={{ width: 25, height: 25 }}
                    />{" "}
                  </button>
                  </>)}
                <button className="btn btn-sm btn-info ml-3" onClick={(e)=>handleShowFileUpload(!showFileUpload)}>Upload Excel Sheets</button>
                
                </div>
                {showFileUpload && (<>
                  <input type="file" className="form-control col-lg-6"
                    onChange={(e)=>handleFileChange(e)}
                  />
                  {/* <button onClick={handleFileUpload}>Upload File Now</button> */}
                  {authContext && authContext.created ? (
            <>
              <button
                className="btn btn-md btn-success px-5 my-3"
                type="submit"
                onClick={handleFileUpload}
              >
                <span>Data Uploaded Successfully &nbsp;</span>
                <img
                  width="23"
                  height="23"
                  src="https://img.icons8.com/ios/50/ok--v1.png"
                  alt="ok--v1"
                />
              </button>
            </>
          ) : (
            <>
              {authContext && authContext.loading ? (
                <>
                  <button
                    className="btn btn-md btn-secondary btn-muted px-5  my-3"
                    type="submit"
                  >
                    <span>Loading &nbsp;</span>
                    <img
                      width="23"
                      height="23"
                      src={require("../../Assets/Loader.gif")}
                      alt="paper-plane"
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-md btn-dark px-5 my-3"
                    type="submit"
                    onClick={handleFileUpload}
                  >
                    Upload File Now 
                    <img
                      width="23"
                      height="23"
                      src="https://img.icons8.com/office/16/paper-plane.png"
                      alt="paper-plane"
                    />
                  </button>
                </>
              )}
            </>
          )}
                </>)}
                {!showFileUpload && (
                  <table className="table table-bordered">
                  <thead>
                    <tr>
                    <td>Select</td>
                      <td>S.no</td>
                      <td>Name</td>
                      <td>Admission Number</td>
                      <td>Mobile Number</td>
                     
                      <td>Aadhar Number</td>
                      <td>Address</td>
                      {/* <td>Is Absent</td> */}
                      {/* <td>Results</td> */}
                      {/* <td>Complaints</td> */}
                      <td>Actions</td>  
                    </tr>
                  </thead>
                  <tbody>
                    {authContext.allStudents.map((student) => (
                      <>
                        <tr>
                        <td>
                          <input type="checkbox" onChange={()=>handleCheckBoxChange(student)}
                            // checked={chooseStudents.includes(student.AdmissionNumber)}
                          />
                        </td>
                          <td>
                            {authContext.allStudents.indexOf(student) + 1}
                          </td>
                          <td>{student.studentName}</td>
                          <td>{student.AdmissionNumber}</td>
                          <td>{student.personalDetails.mobileNumber1!=="" ? student.personalDetails.mobileNumber1 : student.personalDetails.mobileNumber2!=="" ? student.personalDetails.mobileNumber2 : "No Mobile Provided"}</td>
                          {/* <td>{student.personalDetails.dob}</td> */}
                          <td>{student.personalDetails.aadharNumber}</td>
                          <td>{student.personalDetails.address}</td>
                          {/* <td>
                            <button className="btn btn-sm btn-dark"
                            onClick={(e)=>{handleShowFeeDetailsHandler(student)}}
                            data-toggle="modal"
                      data-target="#absenteesModal"
                      type="button"
                            >
                              Send WA Message &nbsp;<img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp"/>
                            </button>
                          </td> */}
                          {/* <td>
                            <button className="btn btn-sm btn-dark"
                             onClick={(e)=>{handleShowResultsModalController(student)}}
                            data-toggle="modal"
                      data-target="#ResultsModal"
                      type="button"
                            >
                              Upload Result
                            </button>
                          </td> */}
                          {/* <td>
                            <button className="btn btn-sm btn-dark">
                              Send WA Message &nbsp;<img width="25" height="25" src="https://img.icons8.com/3d-fluency/94/whatsapp.png" alt="whatsapp"/>
                            </button>
                          </td> */}
                          <td className="d-flex flex-row justify-content-around align-items-around">
                            <button className="btn btn-sm btn-danger" onClick={(e)=>removeStudentDetails(student)}>Remove</button>
                            <Link to={`/editStudentDetails/${student.studentName}/${student.personalDetails.dob}/${student.AdmissionNumber}/${student.personalDetails.mobileNumber}/${student.personalDetails.aadharNumber}/${student.personalDetails.address}/${student.personalDetails.transportation}/${student.sectionName}`}>
                              <button className="btn btn-sm btn-success px-3"
                              // onClick={(e)=>editStudentDetailsHandler(student)}
                              // data-toggle="modal"
                              // data-target="#editDetailsModal"
                              // type="button"
                              >Edit</button>
                            </Link>
                          </td>
                        </tr>
                      </>
                    ))}
                   
                  </tbody>
                  
                </table>
                
                )}
                <button className="btn btn-md btn-primary px-3"
                onClick={listChosenStudentsData}
                disabled={isReady}
                >Send Absent Message</button>
              </>
            ) : (
              <>
                <div
                  style={{
                    width: "100%",
                    height: "90vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <p>No Students Data Found.</p>
                  <div className="d-flex justify-content-end my-4">
                    <button
                      className="btn btn-warning"
                      onClick={(e) => handleShowModal(true)}
                      data-toggle="modal"
                      data-target="#exampleModal"
                      type="button"
                    >
                      Add Students{" "}
                      <img
                        src="https://img.icons8.com/ios/50/add--v1.png"
                        alt="addIcon"
                        style={{ width: 25, height: 25 }}
                      />{" "}
                    </button>


                <button className="btn btn-sm btn-info ml-3" onClick={(e)=>handleShowFileUpload(!showFileUpload)}>Upload Excel Sheets</button>
                  </div>
                  {showFileUpload && (<>
                  <input type="file" className="form-control col-lg-6"
                    onChange={(e)=>handleFileChange(e)}
                  />
                  
          {authContext && authContext.created ? (
            <>
              <button
                className="btn btn-md btn-success px-5 my-3"
                type="submit"
              >
                <span>Data Uploaded Successfully &nbsp;</span>
                <img
                  width="23"
                  height="23"
                  src="https://img.icons8.com/ios/50/ok--v1.png"
                  alt="ok--v1"
                />
              </button>
            </>
          ) : (
            <>
              {authContext && authContext.loading ? (
                <>
                  <button
                    className="btn btn-md btn-secondary btn-muted px-5  my-3"
                    type="submit"
                  >
                    <span>Loading &nbsp;</span>
                    <img
                      width="23"
                      height="23"
                      src={require("../../Assets/Loader.gif")}
                      alt="paper-plane"
                    />
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-md btn-dark px-5 my-3"
                    type="submit"
                    onClick={handleFileUpload}
                  >
                    Upload File Now
                    <img
                      width="23"
                      height="23"
                      src="https://img.icons8.com/office/16/paper-plane.png"
                      alt="paper-plane"
                    />
                  </button>
                </>
              )}
            </>
          )}
                </>)}
                </div>
              </>
            )}


            
          </div>
        )}

        {showModal && (
          <>
            <div
              className="modal fade"
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <b>
                      You adding student details to - {className}
                      {className > 3
                        ? "th"
                        : className === 2
                        ? "nd"
                        : className === "1"
                        ? "st"
                        : ""}{" "}
                      {sectionName}
                    </b>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={updateWarningPromptHandler}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {formSubmitted && (authContext.warningsPrompt!==""? <p className="text text-danger h4">{authContext.warningsPrompt}</p>:<p></p>)}
                  <div className="modal-body">
                    <form onSubmit={(e) => handleFormControl(e)}>
                      <div className="col-lg-11 my-2">
                        <label>Student Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Student Name"
                          value={formData.studentName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              studentName: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Admission Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Admission Number"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              AdmissionNumber: e.target.value,
                            })
                          }
                          value={formData.AdmissionNumber}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Choose Date of Birth"
                          onChange={(e) =>
                            setFormData({ ...formData, dob: e.target.value })
                          }
                          value={formData.dob}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Mobile Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Parents Mobile Numbers"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              mobileNumber: e.target.value,
                            })
                          }
                          value={formData.mobileNumber}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Aadhar Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Aadhar Number"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              aadharNumber: e.target.value,
                            })
                          }
                          value={formData.aadharNumber}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Admission Date</label>
                        <input
                          type="date"
                          className="form-control"
                          placeholder="Enter Admission Date"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              admissionDate: e.target.value,
                            })
                          }
                          value={formData.admissionDate}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Address"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          value={formData.address}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Choose Accommodation</label>
                        <select
                          className="form-control"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              transportation: e,
                            })
                          }
                          value={formData.transportation}
                        >
                          <option value="Hostler">Hostler</option>
                          <option value="Day Scholar">Day Scholar</option>
                        </select>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                      onClick={updateWarningPromptHandler}

                        >
                          Close
                        </button>
                        {authContext && authContext.created ? (
                          <>
                            <button
                              className="btn btn-md btn-success px-5 my-3"
                              type="submit"
                            >
                              <span>Student Details Uploaded &nbsp;</span>
                              <img
                                width="23"
                                height="23"
                                src="https://img.icons8.com/ios/50/ok--v1.png"
                                alt="ok--v1"
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            {authContext && authContext.loading ? (
                              <>
                                <button
                                  className="btn btn-md btn-secondary btn-muted px-5  my-3"
                                  type="submit"
                                >
                                  <span>Loading &nbsp;</span>
                                  <img
                                    width="23"
                                    height="23"
                                    src={require("../../Assets/Loader.gif")}
                                    alt="paper-plane"
                                  />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn btn-md btn-dark px-5 my-3"
                                  type="submit"
                                  onClick={uploadStudentDetails}
                                >
                                  <span>Upload Student Details &nbsp;</span>
                                  <img
                                    width="23"
                                    height="23"
                                    src="https://img.icons8.com/ultraviolet/40/upload--v1.png"
                                    alt="upload--v1"
                                  />
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        

        {/* {showResultsModal && (<>
          <div
              className="modal fade"
              id="ResultsModal"
              role="dialog"
              aria-labelledby="ResultsModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <b className="text text-info">
                      You uploading Results of {selectedStudent.studentName} with Admission Number {selectedStudent.AdmissionNumber}
                     
                    </b>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={updateWarningPromptHandler}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  {formSubmitted && (authContext.warningsPrompt!==""? <p className="text text-danger h4">{authContext.warningsPrompt}</p>:<p></p>)}
                  <div className="modal-body">
                    <form 
                    onSubmit={(e) => uploadExamMarksHandler(e)}
                    >
                     

                      <div className="col-lg-11 my-2">
                        <label>Admission Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Admission Number"
                          value={selectedStudent.AdmissionNumber}
                        />
                      </div>

                      <div className="col-lg-11 my-2">
                      <label>Select Exam Type</label>
                      <select className="form-control"
                       onChange={(e)=>setExamFormData({...examFormData,examName:e.target.value})}
                       value={examFormData.examName}
                       >
                        <option value="FA-1">FA-1</option>
                        <option value="FA-2">FA-2</option>
                        <option value="FA-3">FA-3</option>
                        <option value="FA-4">FA-4</option>
                        <option value="SA-1">SA-1</option>
                        <option value="SA-2">SA-2</option>
                      </select>
                      </div>

                      

                      <div className="col-lg-11 my-2">
                        <label>Telugu</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks"    
                          onChange={(e)=>setExamFormData({...examFormData,telugu:e.target.value})}   
                       value={examFormData.telugu}

                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Hindi</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks"  
                          onChange={(e)=>setExamFormData({...examFormData,hindi:e.target.value})}  
                       value={examFormData.hindi}

                        />
                      </div>


                      <div className="col-lg-11 my-2">
                        <label>English</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks"   
                          onChange={(e)=>setExamFormData({...examFormData,english:e.target.value})}     
                       value={examFormData.english}

                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Maths</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks" 
                          onChange={(e)=>setExamFormData({...examFormData,maths:e.target.value})} 
                       value={examFormData.maths}

                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>EVS</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks" 
                          onChange={(e)=>setExamFormData({...examFormData,evs:e.target.value})}  
                       value={examFormData.evs}

                        />
                      </div>
                      <div className="col-lg-11 my-2">
                        <label>Physics</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks"
                          onChange={(e)=>setExamFormData({...examFormData,physics:e.target.value})}
                       value={examFormData.physics}

                        />
                      </div>


                      <div className="col-lg-11 my-2">
                        <label>Biology</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks" 
                          onChange={(e)=>setExamFormData({...examFormData,biology:e.target.value})}    
                       value={examFormData.biology}

                        />
                      </div>

                      <div className="col-lg-11 my-2">
                        <label>Social</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Marks" 
                          onChange={(e)=>setExamFormData({...examFormData,social:e.target.value})}   
                       value={examFormData.social}

                        />
                      </div>

                     
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                      onClick={removeAllMarksFieldsHandler}

                        >
                          Close
                        </button>
                        {authContext && authContext.created ? (
                          <>
                            <button
                              className="btn btn-md btn-success px-5 my-3"
                              type="submit"
                            >
                              <span>Exam Results Uploaded &nbsp;</span>
                              <img
                                width="23"
                                height="23"
                                src="https://img.icons8.com/ios/50/ok--v1.png"
                                alt="ok--v1"
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            {authContext && authContext.loading ? (
                              <>
                                <button
                                  className="btn btn-md btn-secondary btn-muted px-5  my-3"
                                  type="submit"
                                >
                                  <span>Loading &nbsp;</span>
                                  <img
                                    width="23"
                                    height="23"
                                    src={require("../../Assets/Loader.gif")}
                                    alt="paper-plane"
                                  />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  className="btn btn-md btn-dark px-5 my-3"
                                  type="submit"
                                >
                                  <span>Upload Results  &nbsp;</span>
                                  <img
                                    width="23"
                                    height="23"
                                    src="https://img.icons8.com/ultraviolet/40/upload--v1.png"
                                    alt="upload--v1"
                                  />
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </>)} */}

      </div>
    </div>
  );
};

export default ViewSectionData;
