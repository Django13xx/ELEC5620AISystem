import React, { useState } from 'react';
import './ControlPanel.css';
import LightSwitch from './LightSwitch';
import TemperatureSwitch from './TemperatureSwitch';

function ControlPanel() {
  const [temperature, setTemperature] = useState(22); // Default temperature
  const [musicType, setMusicType] = useState(1); // Default music type
  const [fragranceType, setFragranceType] = useState(1); // Default fragrance type
  const [lightStatus, setLightStatus] = useState(0); // Default light status
  const [userInput, setUserInput] = useState(''); // State for user input
  const [response, setResponse] = useState(null); // State for API response

  const handleTemperatureChange = (newTemperature) => {
    setTemperature(newTemperature);
  };

  const handleMusicChange = (e) => {
    setMusicType(Number(e.target.value));
  };

  const handleFragranceChange = (e) => {
    setFragranceType(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleProcessText = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/environment/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }), // 如果后端需要一个对象
      });

      console.log('Response status:', res.status); // Log the response status for debugging

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      // 在这里输出从后端拿到的内容
      console.log('Response data:', data); // Log the response data for debugging

      // 从 JSON 对象中提取值
      const newTemperature = data.acTemperature;
      const newMusicType = data.musicType;
      const newFragranceType = data.fragranceType;
      const newLightStatus = data.lightStatus; 

      // 更新状态
      setTemperature(newTemperature);
      setMusicType(newMusicType);
      setFragranceType(newFragranceType);
      setLightStatus(newLightStatus); 

      // 清空用户输入和响应状态
      setUserInput('');
      setResponse(null);

    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred while processing your request.' });
    }
  };

  return (
    <div className="control-panel">
      <h2>Control Panel</h2>

      <div className="dropdown">
        <h4>Temperature</h4>
        <TemperatureSwitch temperature={temperature} onTemperatureChange={handleTemperatureChange} />
      </div>

      <div className="dropdown">
        <h4>Music Type</h4>
        <select value={musicType} onChange={handleMusicChange} className="dropdown-select">
          <option value={1}>Lyrical Song 1</option>
          <option value={2}>Lyrical Song 2</option>
          <option value={3}>Lyrical Song 3</option>
          <option value={4}>Lyrical Song 4</option>
          <option value={5}>Lyrical Song 5</option>
          <option value={6}>Light Music 1</option>
          <option value={7}>Light Music 2</option>
          <option value={8}>Light Music 3</option>
          <option value={9}>Light Music 4</option>
          <option value={10}>Light Music 5</option>
          <option value={11}>Dance Music 1</option>
          <option value={12}>Dance Music 2</option>
          <option value={13}>Dance Music 3</option>
          <option value={14}>Dance Music 4</option>
          <option value={15}>Dance Music 5</option>
          <option value={16}>DJ Music 1</option>
          <option value={17}>DJ Music 2</option>
          <option value={18}>DJ Music 3</option>
          <option value={19}>DJ Music 4</option>
          <option value={20}>DJ Music 5</option>
        </select>
      </div>

      <div className="dropdown">
        <h4>Fragrance Type</h4>
        <select value={fragranceType} onChange={handleFragranceChange} className="dropdown-select">
          <option value={1}>Fragrance 1</option>
          <option value={2}>Fragrance 2</option>
          <option value={3}>Fragrance 3</option>
          <option value={4}>Fragrance 4</option>
        </select>
      </div>

      <LightSwitch lightStatus={lightStatus} onLightStatusChange={setLightStatus} />

      <div className="input-container">
        <h4>User Input</h4>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your text here"
          className="input-field"
        />
      </div>

      <button className="process-button" onClick={handleProcessText}>
        Process Text
      </button>
    </div>
  );
}

export default ControlPanel;
