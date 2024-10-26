import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/homeowner/Navbar';
import ManagerTable from '../../components/manager/ManagerTable';


const ManagerPage = () => {
  const userId = useSelector((state) => state.user.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      
      navigate('/login');
    }
  }, [userId, navigate]);

  return (
    <div className="manager-page">
      <Navbar />
      <div className="main-content">
        <ManagerTable userId={userId} />
      </div>
    </div>
  );
};

export default ManagerPage;
