import React, { useState } from 'react';
import './TemperatureSwitch.css';

function TemperatureSwitch() {
  const [temperature, setTemperature] = useState(20); // 初始温度设为20
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const increaseTemperature = () => {
    if (temperature < 30) {
      setTemperature((prev) => parseInt(prev) + 1);
    }
  };

  const decreaseTemperature = () => {
    if (temperature > 16) {
      setTemperature((prev) => parseInt(prev) - 1);
    }
  };

  return (
    <div className="temperature-switch">
      <h3>Temperature: {isOn ? `${temperature} °C` : 'Off'}</h3>

      <div className="switch" onClick={toggleSwitch}>
        <input
          type="checkbox"
          checked={isOn}
          readOnly
          id="toggle-switch"
        />
        <span className="slider"></span>
      </div>

      {isOn && (
        <div className="temperature-control">
          <button onClick={decreaseTemperature}>-</button>
          <input
            type="range"
            min="16"  // 设置温度范围的最小值
            max="30"  // 设置温度范围的最大值
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <button onClick={increaseTemperature}>+</button>
          <span>{temperature} °C</span>
        </div>
      )}
    </div>
  );
}

export default TemperatureSwitch;
