import { useState } from "react";
import SwitchFan from "./SwitchFan";

const MobileViewFan = () => {
  const [speed, setSpeed] = useState(0);
  const API_BASE_URL = "https://api.auralinked.online";

  // Handle speed change
  const handleSpeedChange = (event) => {
    const newSpeed = parseInt(event.target.value);
    const message = `fan_speed_${newSpeed}`;

    fetch(`${API_BASE_URL}/control-device`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: 2, type: "fan", message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send speed change command");
        setSpeed(newSpeed); // Update UI immediately
      })
      .catch((err) => console.error("Error setting fan speed:", err));
  };

  // Turn off fan when switch is clicked
  const handleSwitchClick = () => {
    const message = "fan_speed_0";

    fetch(`${API_BASE_URL}/control-device`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: 2, type: "fan", message }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to send turn-off command");
        setSpeed(0); // Update UI immediately
      })
      .catch((err) => console.error("Error turning off fan:", err));
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
