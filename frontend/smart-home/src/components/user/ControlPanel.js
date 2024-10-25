import React from 'react';
import './ControlPanel.css';
import SwitchComponent from './SwitchComponent';
import TemperatureSwitch from './TemperatureSwitch';

function ControlPanel() {
  return (
    <div>
      <div className="control-panel">
        <SwitchComponent label="Lights" />
        <SwitchComponent label="Music" />
        <SwitchComponent label="Fragrance" />
      </div>
      <div>
              <TemperatureSwitch />
      </div>
    </div>
  );
}

export default ControlPanel;