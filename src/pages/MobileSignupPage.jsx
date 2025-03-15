import SignInPicture from "../components/signInPicture";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SignupSuccessModal from "../components/SignupSuccessModal";

const SignupEntry = () => {
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
      const response = await fetch("https://244a-102-88-43-57.ngrok-free.app/signup", {
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
          navigate("/MobileSignInPage");
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
    <div>
      <SignInPicture />
      <h1 className="SignupEntryH1">Sign-Up</h1>
      <form className="SignupEntry" onSubmit={handleSubmit}>
        <label className="SignupEntryLabels" htmlFor="userName">
          User-Name
        </label>
        <input
          className="SignupEntryInput"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          type="text"
          placeholder="Enter Your Username"
          required
        />

        <label className="SignupEntryLabels" htmlFor="emailAddress">
          Email Address
        </label>
        <input
          className="SignupEntryInput"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleChange}
          type="email"
          placeholder="Enter Your Email Address"
          required
        />

        <label className="SignupEntryLabels" htmlFor="password">
          Password
        </label>
        <input
          className="SignupEntryInput"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Enter Your Password"
          required
        />

        <label className="SignupEntryLabels" htmlFor="verifyPassword">
          Verify Password
        </label>
        <input
          className="SignupEntryInput"
          value={formData.verifyPassword}
          onChange={handleChange}
          name="verifyPassword"
          type="password"
          placeholder="Confirm Your Password"
          required
        />

        <button type="submit" className="btn">
          Sign-Up
        </button>
      </form>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}

      <p className="LoginHere">
        Already have an account? <Link to="/MobileSignInPage">Log-in here</Link>
      </p>

      {/* Success Modal */}
      <SignupSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default SignupEntry;
