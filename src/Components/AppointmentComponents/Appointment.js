import React,{useState,useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
const AppointmentComponent = () => {
  const authContext = useContext(AuthContext)
  const[name,setName] = useState('');
  const[reason,setReason] = useState("");
  const[peopleCount,setPeopleCount] = useState(1);
  function handleSubmitForm(e){
    e.preventDefault();
    console.log(name,reason,peopleCount);
    authContext.createAppointment(name,reason,peopleCount);
  }
  return (
    <div className="col-lg-8">
    {authContext && authContext.created ? <>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Appointment Created Successfully!
      </Alert>
    </> : <></>}
      <form className="form" onSubmit={(e)=>handleSubmitForm(e)}>
        <div className="my-3">
        <label>Name</label>
        <input type="text" placeholder='Enter Person Name' className='form-control'
          onChange = { (e)=>setName(e.target.value)}
        />
        </div>

        <div className="my-3">
        <label>Reason</label>
        <input type="text" placeholder='Enter The Reason' className='form-control'
          onChange = { (e)=>setReason(e.target.value)}
        />
        </div>

        <div className="my-3">
        <label>How many people</label>
        <select className="form-control" value={peopleCount} onChange = {(e)=>setPeopleCount(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">More than 4 people</option>
        </select>
        </div>
        
       {authContext && authContext.created ? <>
        <button className='btn btn-md btn-success mt-4'>
        Appointment Created &nbsp; <img width="25" height="25" src="https://img.icons8.com/ultraviolet/40/plus--v1.png" alt="plus--v1"/>
        </button>
       </> : <> <button className='btn btn-md btn-dark mt-4' type="submit">
        {authContext && authContext.loading ? "loading...":"Create Appointment"} &nbsp; <img width="25" height="25" src="https://img.icons8.com/ultraviolet/40/plus--v1.png" alt="plus--v1"/>
        </button></>}
      </form>
    </div>
  )
}

export default AppointmentComponent