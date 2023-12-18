import React,{useState,useContext} from 'react'
import { useParams } from 'react-router-dom';
import LeftSideNavigation from '../NavigationComponent/LeftSideNavigation';
import "../../Styles/styles.css";
import { AuthContext } from '../../context/AuthContext';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
const ViewClassAttendance = () => {
    const authContext = useContext(AuthContext);
    const {currentClass} = useParams();
    const[option,setOption] = useState("");
    const[status,setStatus] = useState("");
    var date = new Date().toLocaleDateString();
   
    const[AdmissionNumber,setAdmissionNumber] = useState("");
    const handleSubmitForm = (e)=>{
        e.preventDefault();
        authContext.uploadDailyAttendance(AdmissionNumber,status,date);
    }
  return (
    <div className='mainDiv'>
    <div className="left-side-navigation">
           <LeftSideNavigation activeTab = "uploadAttendance"/>
    </div>

    <div className='right-part'>

    {option && option ==="Upload" ? <>
        <div className='my-3 col-lg-8'>
        {authContext && authContext.created ? <>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Today's Attendance Upload Successfully!
      </Alert>
      
    </> : <></>}
        <p className="text text-right text-info">Today's Date - {date}</p>
            <form className="form my-5" onSubmit={(e)=>handleSubmitForm(e)}>
                <div className="my-2">
                <label className="text text-danger">Admission Number</label>
                    <input type="text" placeholder='enter student admission number' className='form-control'
                        onChange = { (e)=>setAdmissionNumber(e.target.value)}
                    />
                </div>

                <div className="my-2">
                <label className="text text-danger">Choose Status</label>
                  <select className="form-control" onChange={(e)=>setStatus(e.target.value)}>
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                  </select>
                </div>
                {authContext && authContext.created ? <>
            <button className="btn btn-md btn-success px-5 my-3" type='submit'>
           <span>
           Attendance Uploaded &nbsp;
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
           Upload Now &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/upload.png" alt="upload"/>
            </button>
           </>}
           </>}

            </form>
        </div>
    </> : <>
    { option ==="View" ? <>


<div className="col-lg-10 mt-5">
   
    
    <table className="table table-bordered table-striped table-hover my-5">
    <caption>Class - {currentClass} Flying Colors</caption>
    <thead>
        
            <tr className="table-success text text-center">
                <td>S.no</td>
                <td>Student Name</td>
                <td>R.no</td>
                <td>Today's Status</td>
                <td>Actions</td>
            </tr>
        
    </thead>

    <tbody>
        <tr>
            <th scope="row" className="text text-center">
                1
            </th>
            <td className="text text-center text-info">Goutham Polapally</td>
            <td className="text text-center text-danger">422</td>
            <td className="text text-center">NA</td>
            <td className="d-flex flex-row justify-content-center">
            <button className="btn btn-sm btn-info" type='submit'>
           <span>
           Upload Attendance &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/upload.png" alt="upload"/>
            </button>
            </td>
        </tr>
        <tr>
            <th scope="row" className="text text-center">
                2
            </th>
            <td className="text text-center text-info">Goutham Polapally</td>
            <td className="text text-center text-danger">423</td>
            <td className="text text-center">NA</td>
            <td className="d-flex flex-row justify-content-center">
            <button className="btn btn-sm btn-info" type='submit'>
           <span>
           Upload Attendance &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/upload.png" alt="upload"/>
            </button>
            </td>
        </tr>
        
       
       
    </tbody>
</table>
    </div>


</> :<>
<div className="btnContainer">
    <button className="btn btn-md btn-warning"
    onClick={(e)=>setOption("Upload")}>
    Upload Attendance &nbsp; <img width="23" height="23" src="https://img.icons8.com/ios/50/upload-to-cloud--v1.png" alt="upload-to-cloud--v1"/>
    </button>
    <button className="btn btn-md btn-success"
    onClick={(e)=>setOption("View")}>
    View Attendance &nbsp; <img width="23" height="23" src="https://img.icons8.com/ios/50/view-file.png" alt="view-file"/>
    </button>
</div>
</>}
    </>}
        
          
    </div>
</div>
  )
}

export default ViewClassAttendance