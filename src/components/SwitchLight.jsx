import { useState, useEffect } from "react";

const SwitchLight = () => {
  const [isOn, setIsOn] = useState(false);

  // Fetch current light status when component mounts
  useEffect(() => {
    fetch("https://244a-102-88-43-57.ngrok-free.app/device/1") // Replace '1' with your light device ID
      .then((res) => res.json())
      .then((data) => setIsOn(data.status === 1))
      .catch((err) => console.error("Error fetching light status:", err));
  }, []);

  // Toggle light function
  const toggleLight = () => {
    const newStatus = isOn ? 0 : 1;

    fetch("https://244a-102-88-43-57.ngrok-free.app/control-device", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: 1, type: "light", status: newStatus }), // Replace '1' with your actual light ID
    })
      .then((res) => res.json())
      .then((data) => setIsOn(data.status === 1))
      .catch((err) => console.error("Error toggling light:", err));
  };

  return (
    <div>
      <input className="l" type="checkbox" checked={isOn} onChange={toggleLight} />
    </div>
  );
};

export default SwitchLight;
