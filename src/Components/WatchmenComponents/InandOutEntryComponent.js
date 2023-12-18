import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const InandOutEntryComponent = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [reason, setReason] = useState("");
  const authContext = useContext(AuthContext);
  function handleSubmitForm(e) {
    e.preventDefault();
    const timeStamp = new Date().toLocaleTimeString();
    const date = new Date().toLocaleDateString();
    authContext.inAndOutEntry(name, address, timeStamp, mobileNumber, date, reason);
  }
  function sendWhatsAppMessageHandler(){
    authContext.sendWhatsAppMessage();
  }
  return (
    <>
      <div className="col-lg-8 mt-5">
        <form className="form" onSubmit={(e) => handleSubmitForm(e)}>
          <input
            type="text"
            className="form-control my-3"
            placeholder="Enter Person Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-3"
            placeholder="Enter Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-3"
            placeholder="Enter Mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-3"
            placeholder="Enter Reason"
            onChange={(e) => setReason(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-3"
            value={new Date().toLocaleDateString()}
          />

          {authContext && authContext.created ? (
            <>
              <button
                className="btn btn-md btn-success px-5 my-3"
                type="submit"
              >
                <span>Entry Uploaded &nbsp;</span>
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
                    <span>Upload Entry &nbsp;</span>
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

        <button className="btn btn-sm btn-warning" onClick={sendWhatsAppMessageHandler}>Send WhatsApp Message</button>
      </div>
    </>
  );
};

export default InandOutEntryComponent;
