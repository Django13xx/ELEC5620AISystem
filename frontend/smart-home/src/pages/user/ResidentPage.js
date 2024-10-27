// src/pages/user/ResidentPage.js
import React, { useState } from 'react';
import './ResidentPage.css';
import Header from '../../components/user/Header';
import RoomTabs from '../../components/user/RoomTabs';
import History from '../../components/user/History';

function ResidentPage() {
  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms' 或 'history'

  const renderContent = () => {
    if (activeTab === 'history') {
      return <History />;
    }
    return <RoomTabs />;
  };

  return (
    <div className="App">
      <Header />
      <div className="navbar">
        <button  className="nav-button" onClick={() => setActiveTab('rooms')}><h4>Control Tabs</h4></button>
        <button  className="nav-button" onClick={() => setActiveTab('history')}><h4>History List</h4></button>
      </div>
      {renderContent()}
    </div>
  );
}

export default ResidentPage;
