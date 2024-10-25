import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li className="active">Homeowner</li>
        <li>Accounts</li>
      </ul>
      <button className="add-homeowner-button">Add new homeowner</button>
    </div>
  );
};

export default Sidebar;
