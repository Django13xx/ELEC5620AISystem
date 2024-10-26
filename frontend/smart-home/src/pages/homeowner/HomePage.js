import React from 'react';
import Navbar from '../../components/homeowner/Navbar';
import PropertyCards from '../../components/homeowner/PropertyCards';


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