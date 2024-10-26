import React from 'react';
import Navbar from '../../components/manager/Navbar';
import PropertyCards from '../../components/manager/PropertyCards';
import './MHomePage.css';

const HomeownerPage = () => {
  return (
    <div className="homeowner-page">
      <Navbar />
      <div className="main-content">
        {/* <Sidebar /> */}
        <HomeownerTable homeowners={homeowners} />
      </div>
    </div>
  );
};

export default HomeownerPage;

