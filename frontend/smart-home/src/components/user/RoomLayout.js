import React from 'react';
import './RoomLayout.css';

function RoomLayout({ room, playlist, temperature, fragrance }) {
  // 这里根据房间类型设置不同的背景色
  const roomStyles = {
    Livingroom: { backgroundColor: '#E0F7FA' },
    Bedroom: { backgroundColor: '#FCE4EC' },
    Kitchen: { backgroundColor: '#FFF3E0' },
  };

  return (
    <div className="room-layout" style={roomStyles[room]}>
      <h2>{room} Layout</h2>
      <div className="room-info">
        <p><strong>Current Playlist:</strong> {playlist}</p>
        <p><strong>Current Temperature:</strong> {temperature} °C</p>
        <p><strong>Current Fragrance:</strong> {fragrance}</p>
      </div>
    </div>
  );
}

export default RoomLayout;
