import { useState, useEffect } from "react";

const SwitchLight = () => {
  const [isOn, setIsOn] = useState(false);

  // Base URL for API requests (configurable)
  const API_BASE_URL = "https://api.auralinked.online";

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

  const toggleLight = async () => {
    const newStatus = isOn ? 0 : 1;
    setIsOn(newStatus);

    const message = newStatus ? "light_on" : "light_off";

    try {
      const res = await fetch(`${API_BASE_URL}/control-device`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: 1, type: "light", status: newStatus, message })
      });
      if (!res.ok) throw new Error("Failed to update light status");
      setTimeout(fetchLightStatus, 1000);
    } catch (err) {
      console.error("Error toggling light:", err);
      setIsOn(!newStatus);
    }
  };

  return (
    <div>
      <label>
        <input className="l" type="checkbox" checked={isOn} onChange={toggleLight} />
        {isOn ? "Light ON" : "Light OFF"}
      </label>
    </div>
  );
};

export default SwitchLight;
