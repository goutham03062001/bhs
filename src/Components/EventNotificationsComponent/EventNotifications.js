import React,{useState,useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios";
const EventNotifications = () => {
    const authContext = useContext(AuthContext);
    const[description,setDescription] = useState("");
  
    const[name,setName] = useState("");
    const[date,setDate] = useState("");
    const[photo,setPhoto] = useState("");
    const[securePhoto,setSecurePhoto] = useState("")
    async function handleFormSubmission(e){
        e.preventDefault();
        // console.log(description,sendTo,name,sendTo);
        // authContext.createComplaint(name,description,sendTo,date);
        console.log("photo",photo[0]);
        const formData = new FormData();
        formData.append("file",photo[0]);
        formData.append("upload_preset","freu3elv");
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/df7u8xpms/image/upload",formData);
            if(response.data.secure_url){
                setSecurePhoto(response.data.secure_url);
                //send event notification here
                console.log("securePhoto",securePhoto);
                authContext.sendEventNotification(name,description,date,response.data.secure_url);

            }
        } catch (error) {
            alert("Something went wrong! while while uploading image");
            return;
        }

    }
    function sendEventNotificationHandler(){

    }
  return (
    <div className="col-lg-8">
    {authContext && authContext.created ? <>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Complaint Sent to {} Successfully!
      </Alert>
      
    </> : <></>}
        <form className="form" onSubmit={(e)=>handleFormSubmission(e)}>

        
        <div className='my-3'>
            <label>Event Name</label>
                <input type="text" className='form-control' placeholder='Enter Admission Number'
                    onChange = {(e)=>setName(e.target.value)}
                />
        </div>

            <div className='my-3'>
            <label>Write Event Description</label>
                <input type="text" className='form-control' placeholder='What is Complaint about?'
                    onChange = {(e)=>setDescription(e.target.value)}
                />
            </div>

            <div className='my-3'>
            <label>Choose Date</label>
                <input type="date" className='form-control' placeholder='Choose Date'
                    onChange = {(e)=>setDate(e.target.value)}
                />
        </div>

        <div className='my-3'>
            <label>Select Event Image</label>
                <input type="file" className='form-control' placeholder='Choose File'
                    onChange = {(e)=>setPhoto(e.target.files)}
                />
        </div>


            <div className='my-3'>
            {/* <label>Send to</label> */}
                {/* <select className="form-control" value={sendTo} onChange = {(e)=>setSendTo(e.target.value)}>
                    <option value="Principal">Principal</option>
                    <option value="Class Teacher">Class Teacher</option>
                    <option value="Parent">Parent</option>
                    <option value="Hostel Warden">Hostel Warden</option>
                </select> */}
                {/* <div className="my-2">
                <input type="checkbox" className='my-2' value="principal"
                    onChange={(e)=>setSendTo((prevDetails)=>({...prevDetails,principal:true}))}
                /> &nbsp; Principal
                </div>
                <div className="my-2">
                <input type="checkbox" className='my-2' value="correspondent"
                    onChange={(e)=>setSendTo((prevDetails)=>({...prevDetails,correspondent:true}))}

                /> &nbsp; Correspondent
                </div>
                <div className="my-2">
                <input type="checkbox" className='my-2' value="classTeacher"
                    onChange={(e)=>setSendTo((prevDetails)=>({...prevDetails,classTeacher:true}))}

                /> &nbsp; Class Teacher
                </div>
                <div className="my-2">
                <input type="checkbox" className='my-2' value="parent"
                    onChange={(e)=>setSendTo((prevDetails)=>({...prevDetails,parent:true}))}

                /> &nbsp; Parent
                </div> */}
            </div>

           {authContext && authContext.created ? <>
            <button className="btn btn-md btn-success px-5 my-3" type='submit'>
           <span>
           Complaint Sent to {} &nbsp;
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
           <button className="btn btn-md btn-dark px-5 my-3" type='submit'
           onClick={sendEventNotificationHandler}>
           <span>
           Send to All &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/office/16/paper-plane.png" alt="paper-plane"/>
            </button>
           </>}
           </>}
        </form>
    </div>
  )
}

export default EventNotifications