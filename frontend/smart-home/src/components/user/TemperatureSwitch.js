// TemperatureSwitch.js
import React from 'react';

function TemperatureSwitch({ temperature, onTemperatureChange }) {
  const increaseTemperature = () => {
    onTemperatureChange(temperature + 1);
  };

  const decreaseTemperature = () => {
    onTemperatureChange(temperature - 1);
  };

  return (
    <div>
      <h4>Adjust Temperature:</h4>
      <button onClick={decreaseTemperature}>-</button>
      <span>{temperature} °C</span>
      <button onClick={increaseTemperature}>+</button>
    </div>
  );
}

export default TemperatureSwitch;
