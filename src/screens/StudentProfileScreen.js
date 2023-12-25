import React,{useState,useEffect} from 'react'
import LeftSideNavigation from '../Components/NavigationComponent/LeftSideNavigation';
import StudentProfileComponent from '../Components/StudentProfileComponent/StudentProfileComponent';
import io from "socket.io-client";
import QRCode from 'react-qr-code';

const QRCodeScanner = ({ qrCodeData }) => {
  return (
    <div>
      <h2>QR Code Scanner</h2>
      {qrCodeData && (
        <div>
          <QRCode value={qrCodeData} />
          <p>Scan this QR code with your WhatsApp app.</p>
        </div>
      )}
    </div>
  );
};
const StudentProfileScreen = () => {
  const [qrCodeData, setQrCodeData] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket
    const socket = io("http://localhost:7000", { path: '/socket.io' });


    // Listen for the "qrCode" event
    socket.on("qrCode", (data) => {
      setQrCodeData(data);
      console.log("qrcode data",data);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className='mainDiv'>
    <div className="left-side-navigation">
           <LeftSideNavigation activeTab = "studentProfiles"/>
    </div>

    <div className='right-part'>
        
        <div className="feeDetailsRightDiv">

       <h3>Search Student Profiles</h3> 
       <small>Enter any of the input fields to begin search</small>
        <StudentProfileComponent/>
        <div>
      <h1>WhatsApp QR Code</h1>
      {qrCodeData && (
        <div>
          <p>QR Code: {qrCodeData.qrCode}</p>
          <img src={qrCodeData.qrCodeUrl} alt="QR Code" />
          <QRCodeScanner qrCodeData={qrCodeData} />
        </div>
      )}
    </div>
        </div>

    </div>
    </div>
  )
}

export default StudentProfileScreen