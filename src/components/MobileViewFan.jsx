import { useState, useEffect } from "react";
import SwitchFan from "./SwitchFan";

const MobileViewFan = () => {
  const [speed, setSpeed] = useState(0);

  // Fetch the current fan speed from the backend
  useEffect(() => {
    fetch("http://localhost:3000/device/2") // Replace '2' with your fan's device ID
      .then((res) => res.json())
      .then((data) => setSpeed(data.status))
      .catch((err) => console.error("Error fetching fan status:", err));
  }, []);

  // Handle speed change
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);

    fetch("http://localhost:3000/control-device", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: 2, type: "fan", status: newSpeed }),
    })
      .then((res) => res.json())
      .then(() => setSpeed(newSpeed))
      .catch((err) => console.error("Error setting fan speed:", err));
  };

  // Turn off fan when switch is clicked
  const handleSwitchClick = () => {
    setSpeed(0);

    fetch("http://localhost:3000/control-device", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: 2, type: "fan", status: 0 }),
    }).catch((err) => console.error("Error turning off fan:", err));
  };

  return (
    <div className="MobileViewfanCard">
      <img src="/fan.png" alt="Fan" />
      <div className="MobileViewfanControl">
        <div className="MobileViewfanControl1">
          <div className="MobileViewfanControl11">
            <h1>Fan</h1>
            <p>1 Device</p>
          </div>
          <SwitchFan isOn={speed > 0} onToggle={handleSwitchClick} />
        </div>

        <div className="MobileViewFanControl2">
          <div className="fan-speed-container">
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
      </div>
    </div>
  );
};

export default MobileViewFan;
