import React from 'react';
import './Header.css'; // 可以为该组件创建单独的CSS文件

const Header = () => {
  return (
    <div className="header">
      <div className="header-icons">
        <button className="add-button">+</button>
        <span>Users</span>
        <span>Notification</span>
      </div>
      <div className="user-info">
        <span>Marvin McKinney</span>
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Header;
