import React, { useEffect, useState } from 'react';
import HomeownerRow from './HomeownerRow';
import AddButton from './AddButton';

const HomeownerTable = ({ userId }) => {
  // 居民列表的状态管理
  const [homeowners, setHomeowners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // 获取居民数据
  useEffect(() => {
    const fetchResidents = async () => {
      const userId = 1
      try {
        const response = await fetch(`http://localhost:8080/api/property/getbyuserid?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch residents');
        }
        const data = await response.json();
        
        // 只保留需要的字段
        const filteredData = data.map((homeowner) => ({
          username: homeowner.username,
          email: homeowner.email,
          room: homeowner.room,
          number: homeowner.number,
          status: homeowner.status === 1 ? "Active" : "No Active",
        }));
        
        setHomeowners(filteredData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={containerStyle}>
      {/* 头部区域 */}
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>List of Residents</h2>
          <p style={subtitleStyle}>{homeowners.length} residents found</p>
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
