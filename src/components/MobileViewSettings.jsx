import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileViewSettings = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [tempUser, setTempUser] = useState(user);

  const handleInputChange = (e) => {
    setTempUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(tempUser);
    setEditMode(false);
  };

  const handleSignOut = () => {
    navigate("/MobileSignInPage");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* User Info Section */}
      <div className="settings-section">
        <h3>Profile Information</h3>
        {editMode ? (
          <>
            <input
              type="text"
              name="name"
              value={tempUser.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
            />
            <input
              type="email"
              name="email"
              value={tempUser.email}
              onChange={handleInputChange}
              placeholder="Enter Email"
            />
            <input
              type="password"
              name="password"
              value={tempUser.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
      </div>

      {/* Sign Out Button */}
      <button className="signout-button" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default MobileViewSettings;
