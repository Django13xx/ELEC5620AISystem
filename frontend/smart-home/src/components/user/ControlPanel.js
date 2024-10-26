import React, { useState, useEffect } from 'react';
import './ControlPanel.css';
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

  const handleLightChange = (e) => {
    setLightStatus(Number(e.target.value));
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
        body: JSON.stringify({ userInput }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();

      setTemperature(data.acTemperature);
      setMusicType(data.musicType);
      setFragranceType(data.fragranceType);
      setLightStatus(data.lightStatus);

      setUserInput('');
      setResponse('Settings updated successfully');
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
    }
  };

  // useEffect to clear the response message after a few seconds
  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse(null);
      }, 3000); // Clear message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [response]);

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
          <option value={1}>Lyrical Song Playlist 1</option>
          <option value={2}>Lyrical Song Playlist 2</option>
          <option value={3}>Lyrical Song Playlist 3</option>
          <option value={4}>Lyrical Song Playlist 4</option>
          <option value={5}>Lyrical Song Playlist 5</option>
          <option value={6}>Light Music Playlist 1</option>
          <option value={7}>Light Music Playlist 2</option>
          <option value={8}>Light Music Playlist 3</option>
          <option value={9}>Light Music Playlist 4</option>
          <option value={10}>Light Music Playlist 5</option>
          <option value={11}>Dance Music Playlist 1</option>
          <option value={12}>Dance Music Playlist 2</option>
          <option value={13}>Dance Music Playlist 3</option>
          <option value={14}>Dance Music Playlist 4</option>
          <option value={15}>Dance Music Playlist 5</option>
          <option value={16}>DJ Music Playlist 1</option>
          <option value={17}>DJ Music Playlist 2</option>
          <option value={18}>DJ Music Playlist 3</option>
          <option value={19}>DJ Music Playlist 4</option>
          <option value={20}>DJ Music Playlist 5</option>
        </select>
      </div>

      <div className="dropdown">
        <h4>Fragrance Type</h4>
        <select value={fragranceType} onChange={handleFragranceChange} className="dropdown-select">
          <option value={1}>Lavender</option>
          <option value={2}>Citrus</option>
          <option value={3}>Jasmine</option>
          <option value={4}>Rose</option>
        </select>
      </div>

      <div className="dropdown">
        <h4>Light Status</h4>
        <select value={lightStatus} onChange={handleLightChange} className="dropdown-select">
          <option value={0}>Off</option>
          <option value={1}>Cold Lights</option>
          <option value={2}>Warm Lights</option>
        </select>
      </div>

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

      {/* Display the response message */}
      {response && (
        <div className={`response-message ${response.error ? 'error' : ''}`}>
          {response.error ? (
            <i className="fas fa-exclamation-circle"></i> // 错误图标
          ) : (
            <i className="fas fa-check-circle"></i> // 成功图标
          )}
          <span>{response.error || "Your changes have been saved!"}</span>
        </div>)}
    </div>
  );
}

export default ControlPanel;
