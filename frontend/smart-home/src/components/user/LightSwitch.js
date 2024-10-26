// LightSwitch.js
import React, { useState } from 'react';
import './LightSwitch.css';

function LightSwitch({ onLightChange }) {
  const [lightMode, setLightMode] = useState('Warm Light'); // 初始灯光模式

  const handleChange = (event) => {
    const newMode = event.target.value;
    setLightMode(newMode);
    onLightChange(newMode); // 调用父组件的回调
  };

  return (
    <div className="light-switch">
      <h4>Select Light Mode:</h4>
      <select value={lightMode} onChange={handleChange}>
        <option value="Warm Light">Warm Light</option>
        <option value="Cold Light">Cold Light</option>
        <option value="Off">Off</option>
      </select>
    </div>
  );
}

export default LightSwitch;