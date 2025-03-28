import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwitchLight from "../components/SwitchLight";

const DesktopDashboard = () => {
  const API_BASE_URL = "https://api.auralinked.online";
  const [speed, setSpeed] = useState(0);

  // Fetch fan speed (message) from the backend
  useEffect(() => {
    const fetchFanSpeed = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/device/1`);
        if (!res.ok) throw new Error(`Error fetching fan data: ${res.statusText}`);

        const data = await res.json();
        if (data?.type === "fan" && data?.message) {
          const match = data.message.match(/fan_speed_(\d+)/); // Extract speed from message
          if (match) {
            setSpeed(parseInt(match[1], 10));
          }
        } else {
          console.warn("No valid fan speed message received.");
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchFanSpeed();
  }, []);

  // Function to update fan speed
  const handleSpeedChange = async (event) => {
    const newSpeed = parseInt(event.target.value);
    const message = `fan_speed_${newSpeed}`;

    try {
      const res = await fetch(`${API_BASE_URL}/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: 1, type: "fan", message }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to send fan speed command: ${errorText}`);
      }

      setSpeed(newSpeed); // Update UI immediately
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="DesktopDashboardHeader">
        <Link to="/DesktopSettingsPage" className="Settings">
          <img src="/settingicon.png" alt="settingsIcon" />
          <p>Settings</p>
        </Link>
      </div>

      <div className="DesktopDashboardBody">
        <div className="DesktopDashboardBody1">
          <img src="/cuate.png" alt="home" />
          <h1 className="user">Welcome</h1>
          <p>Ready to take smart control over your home?!</p>
        </div>

        <div className="DesktopDashboardBody2">
          <img src="/roompicture.jpg" alt="RoomPicture" />
          <div className="DesktopDashboardBody2Minicard">
            <div className="minicard">
              <img src="/mingcute_fan-fill.png" alt="fan" />
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
              <SwitchLight />
              <h2>Lamp</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboard;
