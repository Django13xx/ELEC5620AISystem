import React, { useState, useEffect, useRef } from 'react';
import './ControlPanel.css';
import TemperatureSwitch from './TemperatureSwitch';

function ControlPanel() {
  const [temperature, setTemperature] = useState(22); // Default temperature
  const [musicType, setMusicType] = useState(1); // Default music type
  const [fragranceType, setFragranceType] = useState(1); // Default fragrance type
  const [lightStatus, setLightStatus] = useState(0); // Default light status
  // eslint-disable-next-line no-unused-vars
  const [userInput, setUserInput] = useState(''); // State for user input
  const [response, setResponse] = useState(null); // State for API response
  const [isRecording, setIsRecording] = useState(false); // Recording status
  const [transcript, setTranscript] = useState(''); // Transcription of the recorded audio
  const [language, setLanguage] = useState('en'); // Default language

  const recognitionRef = useRef(null); // Add recognitionRef to keep track of the recognition instance

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

  const handleProcessText = async (commandText) => {
    console.log('Command text:', commandText);
    try {
      const res = await fetch('http://localhost:8080/api/environment/process-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: commandText }),
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

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // Stop the speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // Start recording
      setTranscript(''); // Clear previous transcript
      setUserInput(''); // Clear user input
      setIsRecording(true); // Set recording status

      // Start speech recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = language === 'en' ? 'en-US' : 'zh-CN'; // Adjust language
        recognition.interimResults = false; // We want final results only
        recognition.maxAlternatives = 1;

        recognitionRef.current = recognition; // Save the recognition instance

        recognition.onresult = (event) => {
          const transcriptText = event.results[0][0].transcript;
          setTranscript(transcriptText);
          handleProcessText(transcriptText); // Process the transcript
          setUserInput(transcriptText); // Display transcript in input box
        };

        recognition.onerror = (error) => {
          console.error('Speech recognition error:', error);
          switch (error.error) {
            case 'no-speech':
              setResponse('No speech detected. Please try again.');
              break;
            case 'audio-capture':
              setResponse('Audio capture error. Please check your microphone.');
              break;
            case 'not-allowed':
              setResponse('Permission to use microphone is denied.');
              break;
            case 'service-not-allowed':
              setResponse('Speech recognition service is not allowed.');
              break;
            default:
              setResponse('Speech recognition error.');
          }
        };

        recognition.onend = () => {
          setIsRecording(false); // Reset recording status when recognition ends
        };

        recognition.start(); // Start the recognition
      } else {
        setResponse('Speech recognition not supported in this browser.');
      }
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

  // Language switch function
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'zh' : 'en'));
  };

  // Texts based on the current language
  const texts = {
    en: {
      title: "Control Panel",
      temperature: "Temperature",
      musicType: "Music Type",
      fragranceType: "Fragrance Type",
      lightStatus: "Light Status",
      userInput: "User Input",
      processText: "Process Text",
      startStopRecording:"Start/Stop Recording",
      responseSuccess: "Settings updated successfully",
      responseError: "An error occurred while processing your request.",
    },
    zh: {
      title: "控制面板",
      temperature: "温度",
      musicType: "音乐类型",
      fragranceType: "香水类型",
      lightStatus: "灯光状态",
      userInput: "用户输入",
      processText: "处理文本",
      startStopRecording:"开始/停止录音",
      responseSuccess: "设置更新成功",
      responseError: "处理请求时发生错误。",
    },
  };

  return (
    <div className="control-panel">
      <h2>{texts[language].title}</h2>

      {/* Language toggle button */}
      <button className="language-button" onClick={toggleLanguage}>
          {language === 'en' ? 'Switch to 中文' : 'Switch to English'}
      </button>

      <div className="dropdown">
        <h4>{texts[language].temperature}</h4>
        <TemperatureSwitch temperature={temperature} onTemperatureChange={handleTemperatureChange} />
      </div>

      <div className="dropdown">
        <h4>{texts[language].musicType}</h4>
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
        <h4>{texts[language].fragranceType}</h4>
        <select value={fragranceType} onChange={handleFragranceChange} className="dropdown-select">
          <option value={1}>Lavender</option>
          <option value={2}>Citrus</option>
          <option value={3}>Jasmine</option>
          <option value={4}>Rose</option>
        </select>
      </div>

      <div className="dropdown">
        <h4>{texts[language].lightStatus}</h4>
        <select value={lightStatus} onChange={handleLightChange} className="dropdown-select">
          <option value={0}>Off</option>
          <option value={1}>Cold Lights</option>
          <option value={2}>Warm Lights</option>
        </select>
      </div>

      <div className="input-container">
        <h4>{texts[language].userInput}</h4>
        <input
          type="text"
          value={transcript}
          onChange={handleInputChange}
          placeholder="Type or say something..."
          className="user-input"
        />
      </div>

      <div className="button-container">
        <button
          onClick={toggleRecording}
          className={`record-button ${isRecording ? 'recording' : ''}`}
        >
          {texts[language].startStopRecording}
        </button>
      </div>
      {/* logout button */}
      <button className="logout-button" onClick={() => window.location.href = 'http://localhost:3000/login'}>Logout</button>
      {/* Display the response message */}
      {response && (
        <div className={`response-message ${response.error ? 'error' : ''}`}>
          {response.error ? (
            <i className="fas fa-exclamation-circle"></i>
          ) : (
            <i className="fas fa-check-circle"></i>
          )}
          <span>{response.error || texts[language].responseSuccess}</span>
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
