import React from 'react';
import Sidebar from '../../components/manager/Sidebar';
import UserList from '../../components/manager/UserList';

const HomePage = () => {
  return (
    <div className="home-page">
      <Sidebar />
      <UserList />
    </div>
  );
};

export default HomePage;
