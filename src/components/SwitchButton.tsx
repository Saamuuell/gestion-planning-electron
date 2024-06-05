import React, { useState } from "react";

interface SwitchButtonProps {
  label: string;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ label }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          name={label}
          id={label}
          checked={isChecked}
          onChange={handleToggle}
        />
        <label className="toggle-switch-label" htmlFor={label}>
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
      <p>{label}</p>
    </div>
  );
};

export default SwitchButton;
