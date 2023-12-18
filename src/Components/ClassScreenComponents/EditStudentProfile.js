import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../Styles/styles.css";
import { AuthContext } from "../../context/AuthContext";
const EditStudentProfile = () => {
  const {
    studentName,
    dob,
    AdmissionNumber,
    mobileNumber,
    aadharNumber,
    transportation,
    sectionName,
    address,
  } = useParams();
  const authContext = useContext(AuthContext);
  const [editStudentDetails, setEditStudentDetails] = useState({
      dob: dob,
      studentName: studentName,
      AdmissionNumber: AdmissionNumber,
      mobileNumber: mobileNumber,
      aadharNumber: aadharNumber,
      address: address,
      transportation: transportation,
      sectionName: sectionName,
  });
  function handleFeeDetailsFormControl(e) {
    e.preventDefault();
    const formData = {
        studentName,AdmissionNumber,mobileNumber,aadharNumber,address,transportation,sectionName
    }
    authContext.updateStudentProfile(formData);
  }
  return (
    <div className="EditStudentProfileDiv">
      <div className="col-lg-5">
      <h5 className="my-5 text-center">Editing Details of {editStudentDetails.studentName}</h5>
        <form onSubmit={(e) => handleFeeDetailsFormControl(e)}>
          <div className="col-lg-11 my-2">
            <label>Admission Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Admission Number"
              value={editStudentDetails.AdmissionNumber}
            />
          </div>

          <div className="col-lg-11 my-2">
            <label>Student Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Admission Number"
              value={editStudentDetails.studentName}
              onChange={(e)=>setEditStudentDetails({...editStudentDetails,studentName:e.target.value})}
            />
          </div>

          <div className="col-lg-11 my-2">
            <label>Mobile Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Admission Number"
              onChange={(e)=>setEditStudentDetails({...editStudentDetails,mobileNumber:e.target.value})}

              value={editStudentDetails.mobileNumber}

            />
          </div>

          <div className="col-lg-11 my-2">
            <label>Dob</label>
            <input
              type="date"
              className="form-control"
              placeholder="Enter Admission Number"
              value={editStudentDetails.dob}
              onChange={(e)=>setEditStudentDetails({...editStudentDetails,dob:e.target.value})}

            />
          </div>

          <div className="col-lg-11 my-2">
            <label>Aadhar Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Admission Number"
              value={editStudentDetails.aadharNumber}
              onChange={(e)=>setEditStudentDetails({...editStudentDetails,aadharNumber:e.target.value})}

            />
          </div>

          <div className="col-lg-11 my-2">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Admission Number"
              value={editStudentDetails.address}
              onChange={(e)=>setEditStudentDetails({...editStudentDetails,address:e.target.value})}

            />
          </div>

          <div className="col-lg-11 my-2">
            <label>Accommodation</label>
            {/* <input
              type="text"
              className="form-control"
              placeholder="Enter Admission Number"
              value={editStudentDetails.transportation}
              onChange={(e)=>setEditStudentDetails({...editStudentDetails,transportation:e.target.value})}
            /> */}
            <select value={editStudentDetails.transportation} className="form-control"
            onChange={(e)=>setEditStudentDetails({...editStudentDetails,transportation:e.target.value})}>
                <option value="Hostler">Hostler</option>
                <option value="Day Scholar">Day Scholar</option>
            </select>
          </div>

          <div className="">
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
                    >
                      <span>Update Details &nbsp;</span>
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
  );
};

export default EditStudentProfile;
