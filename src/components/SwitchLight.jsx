import { useState, useEffect } from "react";

const SwitchLight = () => {
  const [isOn, setIsOn] = useState(false);
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

  // Function to send light control command
  const handleLightControl = async (status, message) => {
    try {
      const res = await fetch(`${API_BASE_URL}/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: 1, type: "light", status, message })
      });
      if (!res.ok) throw new Error(`Failed to send ${message} command`);
      setIsOn(status === 1);
    } catch (err) {
      console.error(`Error sending ${message} command:`, err);
    }
  };

  return (
    <div className="SwitchLight">
      <div>
        <img src="/sun.png" alt="LightLogo" />
        <p>Status: {isOn ? "ON" : "OFF"}</p>
      </div>
      <div>
        <button onClick={() => handleLightControl(1, "light_on")}>Turn ON</button>
        <button onClick={() => handleLightControl(0, "light_off")}>Turn OFF</button>
      </div>
    </div>
  );
};

export default SwitchLight;
