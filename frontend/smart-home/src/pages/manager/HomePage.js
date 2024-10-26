import React from 'react';
import Navbar from '../../components/manager/Navbar';
import PropertyCards from '../../components/manager/PropertyCards';
import './HomePage.css';

const HomeownerPage = () => {
  return (
    <div className="homeowner-page">
      <Navbar />
      <div className="main-content">
        <PropertyCards />
      </div>
    </div>
  );
};

export default HomeownerPage;