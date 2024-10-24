import React from 'react';
import Navbar from '../../components/manager/Navbar';
// import Sidebar from '../../components/manager/Sidebar';
import ManagerTable from '../../components/manager/ManagerTable';

const managers = [
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
    address: '309/11 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  {
    name: '',
    address: '309/12 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  {
    name: 'Baga',
    address: '309/13 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  {
    name: 'Maga',
    address: '309/14 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  {
    name: 'Duck',
    address: '309/15 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  {
    name: 'Tom',
    address: '309/16 Galloway St',
    email: 'kristinv@mail.com',
    phone: '(219) 555-0114',
    dateAdded: '22/12/2022 05:20 PM',
    status: 'No Active',
  },
  // Repeat for other users...
];

const ManagerPage = () => {
  return (
    <div className="manager-page">
      <Navbar />
      <div className="main-content">
        {/* <Sidebar /> */}
        <ManagerTable managers={managers} />
      </div>
    </div>
  );
};

export default ManagerPage;

