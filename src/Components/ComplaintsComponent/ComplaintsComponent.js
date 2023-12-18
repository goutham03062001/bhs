import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
const ComplaintsComponent = () => {
  const authContext = useContext(AuthContext);
  const [complaint, setComplaint] = useState("");
  const [sendTo, setSendTo] = useState({
    principal: false,
    correspondent: false,
    classTeacher: false,
    parent: false,
  });
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [date, setDate] = useState("");
  function handleFormSubmission(e) {
    e.preventDefault();
    console.log(complaint, sendTo, admissionNumber, sendTo);
    authContext.createComplaint(admissionNumber, complaint, sendTo, date);
  }
  return (
    <div className="col-lg-8">
      {authContext && authContext.created ? (
        <>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Complaint Sent to {sendTo} Successfully!
          </Alert>
        </>
      ) : (
        <></>
      )}
      <form className="form" onSubmit={(e) => handleFormSubmission(e)}>
        <div className="my-3">
          <label>Event Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Admission Number"
            onChange={(e) => setAdmissionNumber(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label>Write Event Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="What is Complaint about?"
            onChange={(e) => setComplaint(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label>Choose Date</label>
          <input
            type="date"
            className="form-control"
            placeholder="Choose Date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label>Send to</label>
          {/* <select className="form-control" value={sendTo} onChange = {(e)=>setSendTo(e.target.value)}>
                    <option value="Principal">Principal</option>
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Hostel Warden">Hostel Warden</option>
                </select> */}
          <div className="my-2">
            <input
              type="checkbox"
              className="my-2"
              value="principal"
              onChange={(e) =>
                setSendTo((prevDetails) => ({
                  ...prevDetails,
                  principal: true,
                }))
              }
            />{" "}
            &nbsp; Principal
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              className="my-2"
              value="correspondent"
              onChange={(e) =>
                setSendTo((prevDetails) => ({
                  ...prevDetails,
                  correspondent: true,
                }))
              }
            />{" "}
            &nbsp; Correspondent
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              className="my-2"
              value="classTeacher"
              onChange={(e) =>
                setSendTo((prevDetails) => ({
                  ...prevDetails,
                  classTeacher: true,
                }))
              }
            />{" "}
            &nbsp; Class Teacher
          </div>
          <div className="my-2">
            <input
              type="checkbox"
              className="my-2"
              value="parent"
              onChange={(e) =>
                setSendTo((prevDetails) => ({ ...prevDetails, parent: true }))
              }
            />{" "}
            &nbsp; Parent
          </div>
        </div>

        {authContext && authContext.created ? (
          <>
            <button className="btn btn-md btn-success px-5 my-3" type="submit">
              <span>Complaint Sent to {sendTo} &nbsp;</span>
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
                <button className="btn btn-md btn-dark px-5 my-3" type="submit">
                  <span>Proceed &nbsp;</span>
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
      </form>
    </div>
  );
};

export default ComplaintsComponent;
