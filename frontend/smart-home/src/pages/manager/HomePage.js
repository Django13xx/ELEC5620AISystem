import React, { useEffect, useState } from 'react';
import Navbar from '../../components/manager/Navbar';
import HomeownerTable from '../../components/manager/HomeownerTable';

const HomeownerPage = () => {
  const [homeowners, setHomeowners] = useState([]);

  useEffect(() => {
    // 从后端获取住户数据
    const fetchHomeowners = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch homeowners');
        }
        const data = await response.json();
        setHomeowners(data);
      } catch (error) {
        console.error('Error fetching homeowners:', error);
      }
    };

    fetchHomeowners();
  }, []);

  return (
    <div className="homeowner-page">
      <Navbar />
      <div className="main-content">
        <HomeownerTable homeowners={homeowners} />
      </div>
    </div>
  );
};

export default HomeownerPage;