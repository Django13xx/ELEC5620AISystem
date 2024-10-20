import React from 'react';
import HomeownerRow from './HomeownerRow';
import AddButton from './AddButton';

const HomeownerTable = ({ homeowners }) => {
  return (
    <div className="homeowner-table">
      <h2>List of Homeowners</h2>
      <p>{homeowners.length} available doctors</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Date added</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {homeowners.map((homeowner) => (
            <HomeownerRow key={homeowner.email} homeowner={homeowner} />
          ))}
        </tbody>
      </table>
      <AddButton />
    </div>
  );
};

export default HomeownerTable;
