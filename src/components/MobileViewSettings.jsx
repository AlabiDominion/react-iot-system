import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileViewSettings = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/MobileSignInPage");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Sign Out Button */}
      <button className="signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default MobileViewSettings;
