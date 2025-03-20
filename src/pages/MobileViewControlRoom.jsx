import { Link } from "react-router-dom";
import { useState } from "react";
import SwitchLight from "../components/SwitchLight";
import MobileViewFan from "../components/MobileViewFan";

const MobileViewControlRoom = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleCardClick = () => {
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = (e) => {
    if (e.target.id === "overlayBackground") {
      setIsOverlayOpen(false);
    }
  };

  return (
    <div className="ControlRoom">
      <div className="ControlRoomContainer">
        <h1>
          <Link className="ControlRoomReturn" to="/MobileDashboard">
            {"<"} <span>Back</span>
          </Link>
        </h1>

        <div className="ControlRoomButtomCard">
          <h2>Living Room</h2>
          <p>Devices</p>
          <div className="ControlRoomButtomMiniCard">
            {/* Light Control */}
            <div className="Mcard">
              <div className="Mcard1">
                <img src="/sun.png" alt="LightLogo" />
                <div className="switchlight">
                  <SwitchLight />
                </div>
                
              </div>
              <p>Lamp</p>
            </div>

            {/* Fan Control */}
            <div className="Mcard" onClick={handleCardClick}>
              <div className="Mcard1">
                <img src="/mingcute_fan-fill.png" alt="FanLogo" />
                <img src="/fan.png" alt="fan" />
              </div>
              <p>Fan</p>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOverlayOpen && (
          <div id="overlayBackground" className="overlay" onClick={handleCloseOverlay}>
            <div className="overlayContent">
              <MobileViewFan />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileViewControlRoom;
