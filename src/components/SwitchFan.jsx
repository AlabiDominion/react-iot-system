const SwitchFan = ({ isOn, onToggle }) => {
    return (
      <label className={`switch ${isOn ? "checked" : ""}`} onClick={onToggle}>
        <input className="l" type="checkbox" checked={isOn} readOnly />
      </label>
    );
  };
  
  export default SwitchFan;
  