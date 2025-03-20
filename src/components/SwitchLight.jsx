import { useState, useEffect } from "react";

const SwitchLight = () => {
  const [isOn, setIsOn] = useState(false);

  // Base URL for API requests
  const API_BASE_URL = "https://api.auralinked.online";

  // Fetch current light status from API
  const fetchLightStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/device/1`);
      if (!res.ok) throw new Error("Failed to fetch light status");
      const data = await res.json();
      setIsOn(data.status === 1);
    } catch (err) {
      console.error("Error fetching light status:", err);
    }
  };

  useEffect(() => {
    fetchLightStatus();
    const interval = setInterval(fetchLightStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to turn the light ON
  const handleLightOn = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: 1, type: "light", status: 1, message: "light_on" })
      });
      if (!res.ok) throw new Error("Failed to turn on light");
      setIsOn(true);
      setTimeout(fetchLightStatus, 1000);
    } catch (err) {
      console.error("Error turning on light:", err);
    }
  };

  // Function to turn the light OFF
  const handleLightOff = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: 1, type: "light", status: 0, message: "light_off" })
      });
      if (!res.ok) throw new Error("Failed to turn off light");
      setIsOn(false);
      setTimeout(fetchLightStatus, 1000);
    } catch (err) {
      console.error("Error turning off light:", err);
    }
  };

  return (
    <div>
      <label>
        <input
          className="l"
          type="checkbox"
          checked={isOn}
          onChange={isOn ? handleLightOff : handleLightOn}
        />
        {isOn ? "Light ON" : "Light OFF"}
      </label>
    </div>
  );
};

export default SwitchLight;
