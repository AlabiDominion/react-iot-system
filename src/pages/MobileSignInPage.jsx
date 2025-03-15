import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInPicture from "../components/signInPicture";
import SignupSuccessModal from "../components/SignupSuccessModal";

const MobileSignInPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Success modal state
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.userName || !formData.password) {
      alert("Fields cannot be left empty");
      return;
    }

    try {
      const response = await fetch("https://fe3d-102-88-43-57.ngrok-free.app/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json()
        localStorage.setItem("username",result.username)
        console.log("Success:", result);

        // Show success modal first
        setIsSuccessModalOpen(true);

        // Navigate after 3 seconds
        setTimeout(() => {
          navigate("/MobileDashboard")
        }, 3000);
      } else {
        let errorResponse;
        try {
          errorResponse = await response.json();
          setError(errorResponse.message || "Invalid credentials! Please try again.");
        } catch {
          setError("Invalid credentials! Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Request Failed. Please check your internet connection.");
    }
  };

  return (
    <div>
      <SignInPicture />
      <h1 className="SignupEntryH1">Log In</h1>
      <div className="LogInLogo">
        <img className="LogInLogo" src="./logo192.png" alt="App Logo" />
      </div>
      <div className="Login">
        <h4 className="LoginH4">Smart Automation System</h4>
        <form className="SignupEntry" onSubmit={handleSubmit}>
          <label className="SignupEntryLabels" htmlFor="userName">
            User-Name
          </label>
          <input
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="SignupEntryInput"
            type="text"
            required
          />

          <label className="SignupEntryLabels" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="SignupEntryInput"
            type="password"
            required
          />

          <button type="submit" className="btn">
            Log-in
          </button>
        </form>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <p className="LoginHere">
          Don’t have an account? <Link to="/SignupEntry">Sign-Up here</Link>
        </p>
      </div>

      {/* Success Modal */}
      <SignupSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default MobileSignInPage;
