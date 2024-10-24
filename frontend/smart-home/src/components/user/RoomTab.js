import React, { useState } from 'react';
import './RoomTabs.css';
import ControlPanel from './ControlPanel';

function RoomTabs() {
  const [selectedRoom, setSelectedRoom] = useState('Livingroom');

  return (
    <div>
      <div className="room-tabs">
        <button className={selectedRoom === 'Livingroom' ? 'active' : ''} onClick={() => setSelectedRoom('Livingroom')}>Livingroom</button>
        <button className={selectedRoom === 'Bedroom' ? 'active' : ''}>Bedroom</button>
        <button className={selectedRoom === 'Kitchen' ? 'active' : ''}>Kitchen</button>
      </div>
      {selectedRoom === 'Livingroom' && <ControlPanel />}
    </div>
  );
}

export default RoomTabs;