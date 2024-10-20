import React from 'react';
import '../../index.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="add-btn">+</button>
        <span className="nav-title">Users</span>
        <span className="nav-title">Notification</span>
      </div>
      <div className="nav-right">
        <span>Marvin McKinney</span>
        <img className="user-avatar" src="/avatar.png" alt="User Avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
