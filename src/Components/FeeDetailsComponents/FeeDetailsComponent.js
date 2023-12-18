import React,{useState,useContext} from 'react'
import { AuthContext } from '../../context/AuthContext';
const FeeDetailsComponent = () => {
    const authContext = useContext(AuthContext)
    const[admissionNumber,setAdmissionNumber] = useState(0);
    const[date,setDate] = useState("");
    const[feeType,setfeeType] = useState("Exam Fee");
    const[amount,setAmount] = useState("");
    
    function handleFormSubmit(e){
        e.preventDefault();
        console.log(admissionNumber,date,feeType,amount);
        authContext.uploadFeeDetails(admissionNumber,date,feeType,amount);
    }

  return (
    <div className='col-lg-7 mt-5'>
        <form className='form' onSubmit = { (e)=>handleFormSubmit(e)}>
            <div className="my-3">
            <label className="text-success">Admission Number</label>
                <input type="text" className='form-control' placeholder='Enter Student Admission Number'
                    onChange={(e)=>setAdmissionNumber(e.target.value)}
                />
            </div>
            <div className="my-4">
            <label className="text-success">Choose Date</label>
                <input type="date" className='form-control' placeholder='Select Date'
                    onChange={(e)=>setDate(e.target.value)}
                />
            </div>
            <div className="my-4">
            <label className="text-success">Select feeType</label>
            <select className='form-control' value={feeType} onChange={(e)=>setfeeType(e.target.value)}>
                <option value="Exam Fee">Exam Fee</option>
                <option value="School Fee">School Fee</option>
                <option value="Hostel Fee">Hostel Fee</option>
                <option value="Bus Fee">Bus Fee</option>
                <option value="Foundation Fee">Foundation Fee</option>
                <option>Other</option>
            </select>
            </div>
            <div className="my-4">
            <label className="text-success">Amount Paid</label>
                <input type="text" className='form-control' placeholder='Enter Amount Paid'
                    onChange={(e)=>setAmount(e.target.value)}
                />
            </div>

            {authContext && authContext.created ? <>
            <button className="btn btn-md btn-success px-5 my-3" type='submit'>
           <span>
           Fee Details Uploaded &nbsp;
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
           Upload Fee Details &nbsp;
           </span> 
           <img width="23" height="23" src="https://img.icons8.com/ultraviolet/40/upload--v1.png" alt="upload--v1"/>
            </button>
           </>}
           </>}
        </form>
    </div>
  )
}

export default FeeDetailsComponent