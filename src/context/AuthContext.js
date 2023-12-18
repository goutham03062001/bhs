import { createContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../utils/Util";
import axios from "axios";
export const AuthContext = createContext({
  loading: false,
  created: false,
  isAuthenticated: false,
  studentProfile: [],
  appointments: [],
  currentRole:"",
  watchmenEntries:[], //wardenEntries
  allStudents:[],
  updatedStudentProfile:[],
  uploadFeeDetails: (admissionNumber, feeType, amount, date) => {},
  getStudentDetails: (AdmissionNumber) => {},
  deleteStudentFeeDetails: (AdmissionNumber, feeId) => {},
  deleteAchievements: (AdmissionNumber, id) => {},
  deleteAttendance: (AdmissionNumber, monthId) => {},
  createAppointment: (name, reason, personCount) => {},
  createComplaint: (complaint, sendTo, admissionNumber) => {},
  uploadDailyAttendance: (AdmissionNumber, date, status) => {},
  loginFunctionHandler: (currentRole) => {},
  logoutFun: () => {},
  inAndOutEntry:(name,address,timeStamp,mobile,date,reason)=>{},
  getTodaysEntries:(date)=>{},
 authenticateUser:(authUser,currentRole)=>{},
 getStudentsDataBySectionName : (className,sectionName)=>{},
 uploadStudentDetailsByClassName:(formData,className,sectionName)=>{},
 deleteStudentDetailsByAdmission:(AdmissionNumber)=>{},
 warningsPrompt:"",
 updateWarningPromptFun:()=>{},
 uploadHostelWardenEntries:(name,AdmissionNumber,currentClass,currentSection,passType,reason)=>{},
 getHostelWardenEntries:()=>{},
 uploadExamMarksByStudent:(AdmissionNumber,formData)=>{},
 updateStudentProfile:(formData)=>{},
 uploadExcelSheet : (formData)=>{},
 getCustomDateEntries:(date)=>{},
 sendWhatsAppMessage:()=>{},
 sendEventNotification:(name,description,date,photo)=>{}
});

export default function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [studentProfile, setStudentProfile] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const[currentRole,setCurrentRole] = useState("");
  const[watchmenEntries,setWatchmenEntries] = useState([]);
  const[allStudents,setAllStudents] = useState([]);
  const[warningsPrompt,setWarningPrompt] = useState("");
  const[updatedStudentProfile,setUpdatedStudentProfile] = useState([]);
  useEffect(() => {
    const localToken = localStorage.getItem("Auth");
    console.log("localToken" + localToken);
    if (localToken) {
      setIsAuthenticated(localToken);
      console.log("Local token block");
      
    } else {
      setIsAuthenticated(null);
    }
  }, []);

  async function uploadFeeDetails(
    AdmissionNumber,
    paymentDate,
    feeType,
    amount
  ) {
    console.log("Loading...");

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = { AdmissionNumber, paymentDate, feeType, amount };
      const response = await axios.post(
        BACKEND_URL + "/api/Student/UploadFeeDetails",
        body,
        config
      );
      if (response) {
        console.log(response.data);
        console.log("Upload Fee Details!");
        setLoading(false);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 5000);
        }
        setTimeOutFun();
      } else {
        console.log("Fee Details not Found Uploaded!");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }
  async function getStudentDetails( AdmissionNumber) {
    try {
      setLoading(true);

      console.log("Current Admission Number " + AdmissionNumber);
      const response = await axios.get(
        BACKEND_URL + "/api/Student/getStudentDetails/"+AdmissionNumber
      );
      if (response) {
        console.log(response.data);
        setStudentProfile(response.data);
        setLoading(false);
      } else {
        console.log("Student Details not Found Uploaded!");
        setLoading(false);
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }

  async function deleteStudentFeeDetails(AdmissionNumber, feeItemId) {
    try {
      setLoading(true);
      const response = await axios.delete(
        BACKEND_URL +
          `/api/Student/deleteStudentFeeDetails/admissionNumber/${AdmissionNumber}/id/${feeItemId}`
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        setStudentProfile(response.data);
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }

  async function deleteAchievements(AdmissionNumber, achievementId) {
    try {
      setLoading(true);
      const response = await axios.delete(
        BACKEND_URL +
          `/api/Student/deleteStudentAchievement/admissionNumber/${AdmissionNumber}/id/${achievementId}`
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        setStudentProfile(response.data);
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }
  async function deleteAttendance(AdmissionNumber, monthId) {
    try {
      setLoading(true);
      const response = await axios.delete(
        BACKEND_URL +
          `/api/Student/deleteAttendance/admissionNumber/${AdmissionNumber}/id/${monthId}`
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        setStudentProfile(response.data);
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }
  async function createAppointment(name, reason, personCount) {
    try {
      setLoading(true);
      const body = { name, reason, personCount };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BACKEND_URL + "/api/Appointments/createNewAppointment",
        body,
        config
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        setAppointments(response.data);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 3000);
        }
        setTimeOutFun();
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }
  async function createComplaint(AdmissionNumber, reason, sendTo, date) {
    try {
      // /AddComplaints/admissionNumber/:AdmissionNumber/reason/:reason/send/:sendTo
      setLoading(true);
      const body = { AdmissionNumber, reason, sendTo, date };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BACKEND_URL + "/api/Student/AddComplaints/",
        body,
        config
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 5000);
        }
        setTimeOutFun();
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }
  async function uploadDailyAttendance(AdmissionNumber, status, date) {
    try {
      setLoading(true);
      const body = { AdmissionNumber, status, date };
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        BACKEND_URL + "/api/Student/uploadDailyAttendance/",
        body,
        config
      );
      if (response) {
        setLoading(false);
        console.log(response.data);
        setCreated(true);
        setStudentProfile(response.data);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 5000);
        }
        setTimeOutFun();
      }
    } catch (error) {
      console.log("Error Occurred!" + error.message);
      setLoading(false);
    }
  }

  async function loginFunctionHandler(currentRole) {
    try {
      localStorage.setItem("Auth", true);
      setIsAuthenticated(true);
      console.log("Auth Status : "+isAuthenticated);
      localStorage.setItem("currentRole",currentRole);
      setCurrentRole(currentRole);
    } catch (error) {
      setIsAuthenticated(false);
      console.log("Error Occurred!" + error.message);
    }
  }

  function logoutFun() {
    localStorage.removeItem("Auth");
    setIsAuthenticated(false);
    setCurrentRole(null); 
  }
  async function inAndOutEntry(name, address, timeStamp, mobileNumber, date, reason){
    try {
      setLoading(true);
      const body = {name,address,timeStamp,mobileNumber,date,reason}
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }
      const response = await axios.post(BACKEND_URL+"/api/Watchmen/newEntry",body,config);
      if(response){
        setWatchmenEntries(response.data);
        console.log(response.date);
        setLoading(false);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 5000);
        }
        setTimeOutFun();
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
      setCreated(true);
      
    }
  }
  async function getTodaysEntries(date){
    try {
      const body = {date};
      console.log('Date - '+body.date);
      setLoading(true);
      const response = await axios.get(BACKEND_URL+`/api/Watchmen/getTodaysEntries`);
      if(response){
        console.log(response.data);
        setWatchmenEntries(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
      setCreated(true);
    }
  }
  function authenticateUser(authUser,currentRole){
    setCurrentRole(currentRole)
    setIsAuthenticated(true);
  }
  async function getStudentsDataBySectionName(className,sectionName){
    try {
      setLoading(true);
      const response = await axios.get(BACKEND_URL+"/api/Student/getStudentDetails/class/"+className);
      if(response){
        setLoading(false);
        console.log(response.data);
        setAllStudents(response.data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }

  async function uploadStudentDetailsByClassName(formData,className){
  
    const  {studentName,AdmissionNumber,dob,mobileNumber,admissionDate,aadharNumber,address,transportation} = formData;
    const body = {studentName,AdmissionNumber,dob,mobileNumber,admissionDate,aadharNumber,address,transportation,className};
    const config ={
      headers:{
        "Content-Type":"application/json"
      }
    }
    try {
      setLoading(true);
      console.log("Uploading Student Details By class Name and section name")
      const response = await axios.post(BACKEND_URL+"/api/Student/addStudent",body,config);
      if(response.data==="This admission number is already existed!"){
        setWarningPrompt(response.data);
        setLoading(false);
        setCreated(false);
        return;
      }
      if(response.data.AdmissionNumber!==null){
        console.log(response.data);
        setLoading(false);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 3000);
        }
        setTimeOutFun();
        // setStudentProfile(response.data);
        getStudentsDataBySectionNameHandler(className);

       
      }
      async function getStudentsDataBySectionNameHandler(className,sectionName){
        const response = await axios.get(BACKEND_URL+"/api/Student/getStudentDetails/"+className);
        if(response){
          setLoading(false);
          console.log(response.data);
          setAllStudents(response.data);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }

  async function deleteStudentDetailsByAdmission(AdmissionNumber,className,sectionName){
    try {
      setLoading(true);
      const response = await axios.delete(BACKEND_URL+"/api/Student/deleteStudentProfile/"+AdmissionNumber);
      if(response){
        console.log(response.data);
        setLoading(false);
        setStudentProfile(response.data);
        getStudentsDataBySectionName(className,sectionName)
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }
  function updateWarningPromptFun(){
    return setWarningPrompt("");
  }

  async function uploadHostelWardenEntries(name,AdmissionNumber,currentClass,currentSection,passType,reason){
    try {
      setLoading(true);
      const body = {name,AdmissionNumber,currentClass,currentSection,passType,reason};
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }
      const response = await axios.post(BACKEND_URL+"/api/Warden/uploadNewEntry",body,config);
      if(response){
        console.log(response.data);
        setLoading(false);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 3000);
        }
        setTimeOutFun();
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }

  async function getHostelWardenEntries(){
    try {
      setLoading(true);
      console.log("Loading Todays Entries of Watchmen")
      const response = await axios.get(BACKEND_URL+"/api/Warden/getTodaysEntries");
      if(response){
        setWatchmenEntries(response.data);
        console.log(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }

  async function uploadExamMarksByStudent(AdmissionNumber,formData){
    try {
      console.log("Uploading Exam Marks");
      setLoading(true);
      const   { examName,telugu,hindi,english,maths,physics,biology,social} = formData;
      const body = { examName,telugu,hindi,english,maths,physics,biology,social, AdmissionNumber}
      const config = {
        headers:{
          "Content-Type":"application/json"
        }
      }
      const response = await axios.post(BACKEND_URL+"/api/Student/AddExamMarks",body,config);
      if(response){
        console.log(response.data);
        setLoading(false);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 3000);
        }
        setTimeOutFun();
      }

    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }

  async function updateStudentProfile(formData){
    const { studentName,AdmissionNumber,mobileNumber,aadharNumber,address,transportation,sectionName } = formData;
    const body = {studentName,AdmissionNumber,mobileNumber,aadharNumber,address,transportation,sectionName};
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    try{
      setLoading(true);
      const response = await axios.put(BACKEND_URL+"/api/Student/updateStudentDetails",body,config);
      if(response){
        setLoading(false);
        setCreated(true);
        setUpdatedStudentProfile(response.data);
        console.log(response.data);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 3000);
        }
        setTimeOutFun();
      }
    }catch(error){
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }
  async function uploadExcelSheet(formData){
    
    try {
      setLoading(true);
      const response = await axios.post(BACKEND_URL+"/api/Student/uploadExcelSheet",formData);
      if(response){
        console.log(response.data);
        setLoading(false);
        setCreated(true);
        function setTimeOutFun() {
          setTimeout(() => {
            setCreated(false);
          }, 3000);
        }
        setTimeOutFun();
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }
  async function getCustomDateEntries(inputDate){
    const customDate = inputDate.split("-");
    const year = customDate[0];
    const month = customDate[1];
    const date = customDate[2]
    try {
      setLoading(true);
      const response = await axios.get(BACKEND_URL+`/api/Watchmen/getSelectedDateEntries/${month}/${date}/${year}`);
      if(response){
        console.log(response.data)
        setWatchmenEntries(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
    }
  }
  async function sendWhatsAppMessage(chooseStudents){
    
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    const body = {
      message : "your child is absent today!",
      details:chooseStudents
    }
    try {
      const response = await axios.post(BACKEND_URL+`/api/bot/sendAbsentMessage/ok`,body,config);
      if(response.data==="Message Sent Successfully"){
        console.log("bot response - "+response.data);
        alert("WhatsApp Messages sent successfully");
      }if(response.data === "Error While Getting WhatsApp Number"){
        console.log("no response from bot");
        alert("Error Occurred while Fetching WhatsApp Number");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
      alert("Error Occurred, Try again after 1 minute")
    }
  }
  async function sendEventNotification(name,description,date,photo){
    const body = {name,description,date,photo};
    const config = {
      headers:{
        "Content-Type":"application/json"
      }
    }
    try {
      // setLoading(true);
      // console.log("secure-url",photo);
      const response = await axios.post(BACKEND_URL+"/api/bot/sendEventMessage",body,config);
      if(response.data){
        setLoading(false);
        console.log("response - ",response.data);
        alert("Event Notification sent to all the people")
      }else{
        console.log("No response from event notification");
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Occurred!" + error.message);
      alert("Error While Sending Event Notification");

    }
  }
  const values = {
    loading: loading,
    uploadFeeDetails: uploadFeeDetails,
    getStudentDetails: getStudentDetails,
    studentProfile: studentProfile,
    allStudents:allStudents,
    deleteStudentFeeDetails: deleteStudentFeeDetails,
    deleteAchievements: deleteAchievements,
    deleteAttendance: deleteAttendance,
    createAppointment: createAppointment,
    createComplaint: createComplaint,
    uploadDailyAttendance: uploadDailyAttendance,
    appointments: appointments,
    created: created,
    loginFunctionHandler: loginFunctionHandler,
    isAuthenticated: isAuthenticated,
    logoutFun: logoutFun,
    currentRole:currentRole,
    inAndOutEntry:inAndOutEntry,
    watchmenEntries:watchmenEntries,
    getTodaysEntries:getTodaysEntries,
    authenticateUser:authenticateUser,
    getStudentsDataBySectionName:getStudentsDataBySectionName,
    uploadStudentDetailsByClassName:uploadStudentDetailsByClassName,
    deleteStudentDetailsByAdmission:deleteStudentDetailsByAdmission,
    warningsPrompt:warningsPrompt,
    updateWarningPromptFun:updateWarningPromptFun,
    uploadHostelWardenEntries:uploadHostelWardenEntries,
    getHostelWardenEntries:getHostelWardenEntries,
    uploadExamMarksByStudent:uploadExamMarksByStudent,
    updateStudentProfile:updateStudentProfile,
    updatedStudentProfile:updatedStudentProfile,
    uploadExcelSheet:uploadExcelSheet,
    getCustomDateEntries:getCustomDateEntries,
    sendWhatsAppMessage:sendWhatsAppMessage,
    sendEventNotification:sendEventNotification
  };
  return (
    <>
      <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    </>
  );
}
