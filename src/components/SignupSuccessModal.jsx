const SignupSuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // If the modal is not open, return nothing
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Signup Successful!</h2>
          <p>Welcome to the platform</p>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default SignupSuccessModal;