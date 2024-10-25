import React from 'react';
import HomeownerRow from './HomeownerRow';
import AddButton from './AddButton';

const HomeownerTable = ({ homeowners }) => {
  // 样式定义
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const titleStyle = {
    fontSize: '28px',
    margin: 0,
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#888',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const thStyle = {
    backgroundColor: '#f5f5f5',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  };

  return (
    <div style={containerStyle}>
      {/* 头部区域 */}
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>List of Residents</h2>
          <p style={subtitleStyle}>{homeowners.length} homeowners found</p>
        </div>
        <AddButton />
      </div>

      {/* 表格 */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Room</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone Number</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homeowners.map((homeowner) => (
            <HomeownerRow key={homeowner.email} homeowner={homeowner} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeownerTable;