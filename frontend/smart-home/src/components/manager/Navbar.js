import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = 220; // 侧边栏宽度

  // 侧边栏样式
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: `${sidebarWidth}px`,
    height: '100%',
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box',
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'translateX(0)' : `translateX(-${sidebarWidth}px)`,
    zIndex: 1000,
  };

  // 切换按钮样式（关闭按钮）
  const toggleButtonStyle = {
    position: 'absolute',
    top: '50%',
    left: '100%', // 按钮左边缘与侧边栏右边缘对齐
    transform: 'translate(0, -50%)', // 水平偏移设为 0，垂直居中
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    opacity: 0, // 默认隐藏
    transition: 'opacity 0.3s ease',
  };

  // 悬停区域样式
  const hoverAreaStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '20px', // 悬停区域宽度
    height: '100%',
    zIndex: 999,
  };

  // 打开按钮样式
  const openButtonStyle = {
    position: 'absolute',
    top: '50%',
    left: '0', // 按钮左边缘与屏幕左侧对齐
    transform: 'translate(0, -50%)', // 水平偏移设为 0，垂直居中
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    opacity: 0, // 默认隐藏
    transition: 'opacity 0.3s ease',
  };

  const logoStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '24px',
    display: 'block',
    marginBottom: '40px',
  };

  const menuStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const menuItemStyle = {
    marginBottom: '30px',
  };

  const menuLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
  };

  const userSectionStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
  };

  const userNameStyle = {
    marginBottom: '10px',
  };

  const userAvatarStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  };

  // 悬停状态
  const [isSidebarHovering, setIsSidebarHovering] = useState(false);
  const [isHoverAreaHovering, setIsHoverAreaHovering] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 侧边栏 */}
      <div
        style={sidebarStyle}
        onMouseEnter={() => setIsSidebarHovering(true)}
        onMouseLeave={() => setIsSidebarHovering(false)}
      >
        {/* 当侧边栏展开时，渲染关闭按钮 */}
        {isOpen && (
          <button
            onClick={handleToggle}
            style={{
              ...toggleButtonStyle,
              opacity: isSidebarHovering ? 1 : 0,
            }}
          >
            {'<<'}
          </button>
        )}

        {/* Logo 或品牌名称 */}
        <a href="/" style={logoStyle}>
          MyApp
        </a>

        {/* 导航链接 */}
        <ul style={menuStyle}>
          <li style={menuItemStyle}>
            <a href="/users" style={menuLinkStyle}>
              Users
            </a>
          </li>
          <li style={menuItemStyle}>
            <a href="/notifications" style={menuLinkStyle}>
              Notifications
            </a>
          </li>
        </ul>

        {/* 用户信息 */}
        <div style={userSectionStyle}>
          <span style={userNameStyle}>Marvin McKinney</span>
          <img
            src="/avatar.png"
            alt="User Avatar"
            style={userAvatarStyle}
          />
        </div>
      </div>

      {/* 当侧边栏收起时，渲染悬停区域 */}
      {!isOpen && (
        <div
          style={hoverAreaStyle}
          onMouseEnter={() => setIsHoverAreaHovering(true)}
          onMouseLeave={() => setIsHoverAreaHovering(false)}
        >
          {/* 打开按钮 */}
          <button
            onClick={handleToggle}
            style={{
              ...openButtonStyle,
              opacity: isHoverAreaHovering ? 1 : 0,
            }}
          >
            {'>>'}
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
