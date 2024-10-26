// RoomTabs.js
import React, { useState } from 'react';
import './RoomTabs.css';
import ControlPanel from './ControlPanel';

function RoomTabs() {
  const [temperature, setTemperature] = useState(22); // 初始温度

  const handleTemperatureChange = (newTemperature) => {
    setTemperature(newTemperature);
  };

  const handleLightChange = (newLightMode) => {
    console.log(`Light mode changed to: ${newLightMode}`);
    // 在这里处理灯光模式的变化，比如更新状态或调用相关API
  };

  return (
    <div>
      <ControlPanel 
        temperature={temperature} 
        onTemperatureChange={handleTemperatureChange} 
        onLightChange={handleLightChange} 
      />
    </div>
  );
}

export default RoomTabs;
