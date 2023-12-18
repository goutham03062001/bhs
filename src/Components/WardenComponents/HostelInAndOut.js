import React,{useState,useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
const HostelInAndOut = () => {
  const authContext = useContext(AuthContext);
    const[name,setName] = useState("");
    const[AdmissionNumber,setAdmissionNumber] = useState('');
    const[currentClass,setCurrentClass] = useState("1");
    const[currentSection,setCurrentSection] = useState("FC");
    const[passType,setPassType] = useState("out");
    const[reason,setReason] = useState("");
    function handleFormSubmit(e){
        e.preventDefault();
        console.log(name,AdmissionNumber,currentClass,currentSection,passType,reason);
        authContext.uploadHostelWardenEntries(name,AdmissionNumber,currentClass,currentSection,passType,reason);
    }
  return (
    <div className="col-lg-8">
      <form className="form" onSubmit={(e)=>handleFormSubmit(e)}>
        <div className="my-3">
        <label className="text text-danger">Student Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Student Name"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>

        <div className="my-3">
        <label className="text text-danger">Admission Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Admission Number"
            onChange={(e)=>setAdmissionNumber(e.target.value)}
          />
        </div>

        <div className="my-3">
        <label className="text text-danger">Choose Class</label>

          <select className="form-control" onChange={(e)=>setCurrentClass(e.target.value)} >
            <option value="1">Class - 1</option>
            <option value="2">Class - 2</option>
            <option value="3">Class - 3</option>
            <option value="4">Class - 4</option>
            <option value="5">Class - 5</option>
            <option value="6">Class - 6</option>
            <option value="7">Class - 7</option>
            <option value="8">Class - 8</option>
            <option value="9">Class - 9</option>
            <option value="10">Class - 10</option>
          </select>
        </div>

        <div className="my-3">
        <label className="text text-danger">Choose Section</label>

          <select className="form-control" onChange={(e)=>setCurrentSection(e.target.value)}>
            <option value="1">FC</option>
            <option value="2">AC</option>
            <option value="3">BS</option>
            <option value="4">SP</option>
          </select>
        </div>

        <div className="my-3">
        <label className="text text-danger">Choose Pass Type</label>
        <select className="form-control" onChange={(e)=>setPassType(e.target.value)}>
            <option value="out">Out</option>
            <option value="in">In</option>
        </select>
        </div>

        {passType === "out" && (<>
          <div className="my-3">
        <label className="text text-danger">Enter Reason</label>
        <input type="text" className="form-control" placeholder="Enter Reason" onChange={(e)=>setReason(e.target.value)}/>
        </div>
        </>)}
        {authContext && authContext.created ? <>
            <button className="btn btn-md btn-success px-5 my-3" type='submit'>
           <span>
            Entry Uploaded &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/ios/50/ok--v1.png" alt="ok--v1"/>
            </button>
           </> : <>
           {authContext && authContext.loading ? <>
            <button className="btn btn-md btn-secondary btn-muted px-5  my-3" type='submit'>
           <span>
           Loading &nbsp;
           </span> 
           <img width="23" height="23" src={require("../../Assets/Loader.gif")} alt="paper-plane"/>
            </button>
           </> : <>
           <button className="btn btn-md btn-dark px-5 my-3" type='submit'>
           <span>
           Upload Entry &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/ultraviolet/40/upload--v1.png" alt="upload--v1"/>
            </button>
           </>}
           </>}
      </form>
    </div>
  );
};

export default HostelInAndOut;
