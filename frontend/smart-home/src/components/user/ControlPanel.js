import React from 'react';
import './ControlPanel.css';
import SwitchComponent from './SwitchComponent';
import TemperatureSwitch from './TemperatureSwitch';

function ControlPanel() {
  return (
    <div className="control-panel">
      <SwitchComponent label="Lights" />
      <TemperatureSwitch />
      <SwitchComponent label="Music" />
      <SwitchComponent label="Fragrance" />
    </div>
  );
}

export default ControlPanel;