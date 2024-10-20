import React, { useState } from 'react';
import './SwitchComponent.css';

function SwitchComponent({ label }) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="switch-component">
      <h3>{label}</h3>
      <div className="switch" onClick={toggleSwitch}>
        <input type="checkbox" checked={isOn} readOnly />
        <span className="slider"></span>
      </div>
    </div>
  );
}