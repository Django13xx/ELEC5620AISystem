import React from 'react';
import Navbar from '../../components/manager/Navbar';
import PropertyCard from '../../components/manager/PropertyCard';
import './MHomePage.css';

const HomeownerPage = () => {
  return (
    <div className="homeowner-page">
      <Navbar />
      <div className="main-content">
        <PropertyCard />
      </div>
    </div>
  );
};

export default HomeownerPage;

