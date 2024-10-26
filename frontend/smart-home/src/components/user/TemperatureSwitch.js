import React from 'react';
import './TemperatureSwitch.css';

function TemperatureSwitch({ temperature, onTemperatureChange }) {
  const increaseTemperature = () => {
    if (temperature < 30) { // 设置温度上限为30°C
      onTemperatureChange(temperature + 1);
    }
  };

  const decreaseTemperature = () => {
    if (temperature > 16) { // 设置温度下限为16°C
      onTemperatureChange(temperature - 1);
    }
  };

  return (
    <div className="temperature-switch">
      <button 
        onClick={decreaseTemperature} 
        disabled={temperature <= 16} // 当温度<=16时禁用按钮
      >
        -
      </button>
      <span>{temperature} °C</span>
      <button 
        onClick={increaseTemperature} 
        disabled={temperature >= 30} // 当温度>=30时禁用按钮
      >
        +
      </button>
    </div>
  );
}

export default TemperatureSwitch;
