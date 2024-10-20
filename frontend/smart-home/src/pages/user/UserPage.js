import React from 'react';
import './UserPage.css';
import Header from '../../components/user/Header';
import RoomTabs from '../../components/user/RoomTabs';

function App() {
  return (
    <div className="App">
      <Header />
      <RoomTabs />
    </div>
  );
}

export default App;