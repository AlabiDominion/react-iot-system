import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupSuccessModal from "../components/SignupSuccessModal";

const DesktopSignupPage = () => {
    const [formData, setFormData] = useState({
        userName: "",
        emailAddress: "",
        password: "",
        verifyPassword: "",
      });
    
      const [error, setError] = useState(""); // Error state
      const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Success modal state
      const navigate = useNavigate(); // Hook for navigation
    
      // Handle input change
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
    
        // Check if passwords match
        if (formData.password !== formData.verifyPassword) {
          alert("Passwords do not match!");
          return;
        }
    
        // Remove the verifyPassword field before sending data
        const { verifyPassword, ...dataToSend } = formData;
    
        try {
          const response = await fetch("https://api.auralinked.online/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
          });
    
          if (response.ok) {
            const result = await response.json();
            console.log("Success:", result);
    
            // Show success modal first
            setIsSuccessModalOpen(true);
    
            // Navigate after modal closes
            setTimeout(() => {
              navigate("/DesktopSignInPage");
            }, 3000);
          } else {
            let errorResponse;
            try {
              errorResponse = await response.json();
              setError(errorResponse.message || "Error occurred. Please try again.");
            } catch {
              setError("Error occurred. Please try again.");
            }
          }
        } catch (error) {
          console.error("Request Failed:", error);
          setError("Request Failed. Please check your internet connection.");
        }
      };

  return (
    <div className='desktopSignupPage'>
        <div className="desktopSignupPageCard">
            <div className="desktopSignUpinnerCard">
                <h1>Sign-Up</h1>
                <form className="desktopSignupForm" onSubmit={handleSubmit}>
                    <label className="" htmlFor="userName">User-Name</label>
                    <input type="text"
                        className=""
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                    />
                    <label className="" htmlFor="emailAddress">Email-Address</label>
                    <input type="email"
                        className=""
                        name="emailAddress"
                        value={formData.emailAddress}
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
                    <label className="" htmlFor="verifyPassword">Verify Password</label>
                    <input type="password"
                        className=""
                        name="verifyPassword"
                        value={formData.verifyPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="btn">
                        Sign-Up
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}

                <p className="">
                Already have an account? <Link to="/DesktopSignInPage">Log-in here</Link>
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

export default DesktopSignupPage
