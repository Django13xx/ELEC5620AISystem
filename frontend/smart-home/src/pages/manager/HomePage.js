import React from 'react';
import Navbar from '../../components/manager/Navbar';
// import Sidebar from '../../components/manager/Sidebar';
import HomeownerTable from '../../components/manager/HomeownerTable';

const homeowners = [
  {
    name: 'Brooklyn Simmons',
    address: '309/10 Galloway St',
    email: 'brooklyns@mail.com',
    phone: '(603) 555-0123',
    dateAdded: '21/12/2022 10:40 PM',
    status: 'Active',
  },
  {
    name: 'Kristin Watson',
    address: '309/10 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  // Repeat for other users...
];

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
