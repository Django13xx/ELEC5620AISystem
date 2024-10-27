import React, { useEffect, useState } from 'react';
import './History.css';

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/environment/history');
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>History</h2>
      <ul>
        {historyData.map((item) => (
          <li key={item.environmentId}>
            <p>AC Temperature: {item.acTemperature}°C</p>
            <p>Light Status: {item.lightStatus === 1 ? 'On' : 'Off'}</p>
            <p>Music Track: {item.musicTrack}</p>
            <p>Fragrance Type: {item.fragranceType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
