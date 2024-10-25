import React from 'react';
import ManagerRow from './ManagerRow';
import AddButton from './AddButton';

const ManagerTable = ({ managers }) => {

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

      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>List of Homeowners</h2>
          <p style={subtitleStyle}>{managers.length} managers found</p>
        </div>
        <AddButton />
      </div>


      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Address</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone Number</th>
            <th style={thStyle}>Date Added</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {managers.map((manager) => (
            <ManagerRow key={manager.email} manager={manager} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerTable;
