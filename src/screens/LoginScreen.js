import React,{useState,useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
const LoginScreen = () => {
    const[role,setRole] = useState("watchmen");
    const authContext = useContext(AuthContext)
    // const {loginWithRedirect} = useAuth0();
    const handleFormSubmit = (e)=>{
     e.preventDefault();
      // loginWithRedirect();
      console.log(role);
      authContext.loginFunctionHandler(role);
    }
  return (
    <div className="mainContainer">
      
    <div className="col-lg-6">
      <form className='form' onSubmit={(e)=>handleFormSubmit(e)}>
        <label className="text text-danger">Choose your role</label>
        <select className='form-control' onChange={(e)=>setRole(e.target.value)}>
            <option value="watchmen">Watchmen</option>
            <option value="warden">Warden</option>
            <option value="frontOffice">Front Office</option>
            <option value="principal">Principal</option>
        </select>
        <input type="password" className='form-control my-3' placeholder='enter your password'/>
        <button className="btn btn-sm btn-dark px-5">
        Login <img width="30" height="30" src="https://img.icons8.com/nolan/64/login-rounded-right.png" alt="login-rounded-right"/>
        </button>
      </form>
    </div>
 
</div>
  )
}

export default LoginScreen