import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupSuccessModal from "../components/SignupSuccessModal";


const DesktopSignInPage = () => {
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
        const response = await fetch("https://f738-102-88-71-111.ngrok-free.app/login", {
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
            navigate("/DesktopDashboard")
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
    <div className='desktopSignupPage'>
        <div className="desktopSignupPageCard">
            <div className="desktopSignUpinnerCard">
                <h1>Sign-In As</h1>
                <div className="LogInLogo">
                  <img className="LogInLogo" src="./logo192.png" alt="App Logo" />
                </div>
                <form className="desktopSignupForm" onSubmit={handleSubmit}>
                    <label className="" htmlFor="userName">User-Name</label>
                    <input type="text"
                        className=""
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                    
                    <label className="" htmlFor="password">Password</label>
                    <input type="password"
                        className=""
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="btn">
                        Log - In
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}

                <p className="">
                Dont have an account? <Link to="/DesktopSignupPage">Sign-Up here</Link>
                </p>

                

            </div>
        </div>
      {/* Success Modal */}
      <SignupSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  )
}

export default DesktopSignInPage
