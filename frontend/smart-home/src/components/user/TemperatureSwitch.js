import React, { useState } from 'react';
import './TemperatureSwitch.css';

function TemperatureSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggleTemperature = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="temperature-switch">
      <h3>Temperature</h3>
      <div className="switch" onClick={toggleTemperature}>
        <input type="checkbox" checked={isOn} readOnly />
        <span className="slider"></span>
      </div>
    </div>
  );
}

export default TemperatureSwitch;