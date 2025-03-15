import { useState, useEffect } from "react";

const SwitchLight = () => {
  const [isOn, setIsOn] = useState(false);

  const fetchLightStatus = () => {
    fetch("https://fe3d-102-88-43-57.ngrok-free.app/device/1")
      .then((res) => res.json())
      .then((data) => setIsOn(data.status === 1))
      .catch((err) => console.error("Error fetching light status:", err));
  };

  // Fetch initial status on mount and every 3 seconds
  useEffect(() => {
    fetchLightStatus();
    const interval = setInterval(fetchLightStatus, 3000); // Poll every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Toggle light function
  const toggleLight = () => {
    const newStatus = isOn ? 0 : 1;
    setIsOn(newStatus); // Optimistically update UI

    fetch("https://fe3d-102-88-43-57.ngrok-free.app/control-device", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ device_id: 1, type: "light", status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => setTimeout(fetchLightStatus, 1000)) // Verify actual status
      .catch((err) => {
        console.error("Error toggling light:", err);
        setIsOn(!newStatus); // Revert UI if request fails
      });
  };

  return (
    <div>
      <input className="l" type="checkbox" checked={isOn} onChange={toggleLight} />
    </div>
  );
};

export default SwitchLight;
