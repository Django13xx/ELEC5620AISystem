import React from 'react';

const StatusBadge = ({ status }) => {
  const badgeClass = status === 'Active' ? 'badge-active' : 'badge-inactive';
  return <span className={`status-badge ${badgeClass}`}>{status}</span>;
};

export default StatusBadge;
