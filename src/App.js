import React,{useContext} from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import Appointment from './screens/Appointment';
import AttendanceScreen from './screens/AttendanceScreen';
import FeeDetailsScreen from './screens/FeeDetailsScreen';
import ComplaintsScreen from './screens/ComplaintsScreen';
import { AuthContext } from './context/AuthContext';
import StudentProfileScreen from './screens/StudentProfileScreen';
import ViewClassAttendance from './Components/AttendanceComponents/ViewClassAttendance';
import LogoutScreen from './screens/LogoutScreen';
import "./Styles/styles.css";
import LoginScreen from './screens/LoginScreen';
import WatchmenHomePage from './Components/WatchmenComponents/WatchmenHomePage';
import TodaysEntriesScreen from './screens/TodaysEntriesScreen';
import AuthContextProvider from './context/AuthContext';
import WardenHomePageScreen from './screens/WardenHomePageScreen';
import ClassScreen from './screens/ClassScreen';
import ViewSections from './Components/ClassScreenComponents/ViewSections';
import ViewSectionData from './Components/ClassScreenComponents/ViewSectionData';
import WardenInAndOutEntries from './Components/WardenComponents/WardenInAndOutEntries';
import EditStudentProfile from './Components/ClassScreenComponents/EditStudentProfile';
import PastEntriesComponent from './Components/WatchmenComponents/PastEntriesComponent';
import EventNotifications from './screens/EventNotifications';
const App = () => {
  return (
    <AuthContextProvider>
      <NavigationScreen/>
    </AuthContextProvider>
  )
}
function NavigationScreen(){
  const authContext = useContext(AuthContext);
 const currentRole = localStorage.getItem("currentRole");
 const authUser = localStorage.getItem("Auth");
 if(authUser!==null && currentRole!==null){
  authContext.authenticateUser(authUser,currentRole)
 }

  console.log("Authentication Status "+authContext.isAuthenticated);
  
  return(<>
   {authContext.isAuthenticated ? <>
    {authContext.isAuthenticated && (authContext.currentRole === "frontOffice") && (<AuthScreen/>)}
    {authContext.isAuthenticated && (authContext.currentRole === "watchmen") && (<WatchMenComponent/>)}
    {authContext.isAuthenticated && (authContext.currentRole === "warden") && (<WardenComponent/>)}
   </> : <GuestScreen/>}
 </>)
}

function WardenComponent(){
  return(<>
     <Router>
       <Routes>
         <Route exact path="/" Component={WardenHomePageScreen}/>
         <Route exact path="/logout" Component={LogoutScreen}/>
         <Route exact path="/warden/todaysEntries" Component={WardenInAndOutEntries}/>

       </Routes>
     </Router>
  </>)
}

function WatchMenComponent(){

  return(<>
         <>
       <Router>
       <Routes>
         <Route exact path="/" Component={WatchmenHomePage}/>
         <Route exact path="/logout" Component={LogoutScreen}/>
         <Route exact path="/todaysEntries" Component={TodaysEntriesScreen}/>
         <Route exact path = "/pastEntries" Component={PastEntriesComponent}/>
       </Routes>
     </Router>
     </>
  </>)
}
function AuthScreen(){

  return(<>
         <>
       <Router>
       <Routes>
         <Route exact path="/" Component={LandingPage}/>
         <Route exact path="/appointment" Component={Appointment}/>
         <Route exact path="/uploadAttendance" Component={AttendanceScreen}/>
         <Route exact path="/feeDetails" Component={FeeDetailsScreen}/>
         <Route exact path="/complaints" Component={ComplaintsScreen}/>
         <Route exact path="/logout" Component={LogoutScreen}/>
         <Route exact path="/studentProfiles" Component={StudentProfileScreen}/>
         <Route exact path="/class/:currentClass/section" Component={ViewClassAttendance}/>
         <Route exact path="/ViewAllClasses" Component={ClassScreen}/>
         <Route exact path="/View/:className/sections" Component={ViewSections}/>
         <Route exact path="/View/:className/viewDetails" Component={ViewSectionData}/>
         <Route exact path="/editStudentDetails/:studentName/:dob/:AdmissionNumber/:mobileNumber/:aadharNumber/:address/:transportation/:sectionName" Component={EditStudentProfile}/>
         <Route exact path="/eventNotification" Component={EventNotifications}/>
       </Routes>
     </Router>
     </>
  </>)
}
function GuestScreen (){
 

  return(<>
    <LoginScreen/>
  </>)
}

// /class/${currentClass}/section
export default App