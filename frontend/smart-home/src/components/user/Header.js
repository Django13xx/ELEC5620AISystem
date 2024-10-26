import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1>Good Morning!</h1>
      <div className="weather-info">
        <div className="weather-icon">☀️</div>
        <div className="weather-details">
          <h3>28°C</h3>
          <p>Sunny</p>
          <p>Sydney</p>
        </div>
      </div>
    </div>
  );
}

export default Header;