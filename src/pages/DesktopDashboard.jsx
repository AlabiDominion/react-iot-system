import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SwitchLight from '../components/SwitchLight';

const DesktopDashboard = () => {
  const [userName, setUserName] = useState(""); 
      const navigate = useNavigate();
  
      useEffect(() => {
        const fill = localStorage.getItem("username")
        const user = document.querySelector(".user")
        user.textContent = "Hi,"+' '+fill
      }, []);

      const [speed, setSpeed] = useState(0);

      // Fetch the current fan speed from the backend
      useEffect(() => {
        fetch("https://fe3d-102-88-43-57.ngrok-free.app/device/2") // Replace '2' with your fan's device ID
          .then((res) => res.json())
          .then((data) => setSpeed(data.status))
          .catch((err) => console.error("Error fetching fan status:", err));
      }, []);
    
  
      const handleSpeedChange = (event) => {
        const newSpeed = parseInt(event.target.value);
    
        fetch("https://fe3d-102-88-43-57.ngrok-free.app/control-device", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ device_id: 2, type: "fan", status: newSpeed }),
        })
          .then((res) => res.json())
          .then(() => setSpeed(newSpeed))
          .catch((err) => console.error("Error setting fan speed:", err));
      };

  return (
    <div>
      <div className='DesktopDashboardHeader'>
        
          <div>
          <Link to="/DesktopSettingsPage" className='Settings'>
            <img src="/settingicon.png" alt="settingsIcon" />
            <p>Settings</p>
          </Link>
          </div>
        
        
      </div>
      <div className='DesktopDashboardBody'>
        <div className="DesktopDashboardBody1">
          <img src="/cuate.png" alt="home" />
          <h1 className='user'>welcome</h1>
          <p>Ready to take smart control over your home?!</p>
        </div>
        <div className="DesktopDashboardBody2">
          <img src="/roompicture.jpg" alt="RoomPicture" />
          <div className="DesktopDashboardBody2Minicard">
            <div className="minicard">
              <img src="/mingcute_fan-fill.png" alt="fan"/>
              <div className="fan-speed-container">
                <h3>Fan</h3>
                <h3>Speed: <span>{speed}</span></h3>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={speed}
                  onChange={handleSpeedChange}
                />
              </div> 
            </div>
            <div className="minicard">
              <div className="minicard2">
                <img src="./sun.png" alt="fan"/>
                <SwitchLight/>
              </div>
              <h2>Lamp</h2>
              
              
            </div>
          
          </div>
        </div>


      </div>
      
    </div>
  )
}

export default DesktopDashboard
