import { useState } from "react";

const SwitchLight = () => {
  const [isOn, setIsOn] = useState(false);
  const API_BASE_URL = "https://api.auralinked.online";

  // Function to send light control command
  const handleLightControl = async (message) => {
    try {
      const res = await fetch(`${API_BASE_URL}/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: 1, type: "light", message })
      });
      if (!res.ok) throw new Error(`Failed to send ${message} command`);
      setIsOn(message === "light_on"); // Update UI based on action
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
        <button onClick={() => handleLightControl("light_on")}>Turn ON</button>
        <button onClick={() => handleLightControl("light_off")}>Turn OFF</button>
      </div>
    </div>
  );
};

export default SwitchLight;
