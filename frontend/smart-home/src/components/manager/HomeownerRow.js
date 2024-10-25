
// HomeownerRow Component
import React from 'react';
import StatusBadge from './StatusBadge';

const HomeownerRow = ({ homeowner }) => {
  const { name, room, email, phone, status } = homeowner;

  // 样式定义
  const rowStyle = {
    borderBottom: '1px solid #ddd',
  };

  const tdStyle = {
    padding: '12px',
    verticalAlign: 'middle',
    fontSize: '14px',
    color: '#333',
  };

  const actionButtonStyle = {
    padding: '8px 12px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  return (
    <tr style={rowStyle}>
      <td style={tdStyle}>{name}</td>
      <td style={tdStyle}>{room}</td>
      <td style={tdStyle}>{email}</td>
      <td style={tdStyle}>{phone}</td>
      <td style={tdStyle}>
        <StatusBadge status={status} />
      </td>
      <td style={tdStyle}>
        <button style={actionButtonStyle}>→</button>
      </td>
    </tr>
  );
};

export default HomeownerRow;